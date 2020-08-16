/* eslint-disable no-console */
import { Workout } from "../models";

import * as firebase from "firebase";
let contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.VUE_APP_space,
  accessToken: process.env.VUE_APP_accessToken
});

const state = {
  workoutCategories: [] as any[],
  workouts: [],
  currentWorkout: {},
  currentLeaderboard: {}
};

const mutations = {
  setWorkouts(state: { workouts: any }, payload: Workout[]) {
    state.workouts = payload;
  },
  setCurrentWorkout(state: { currentWorkout: any }, payload: Workout) {
    state.currentWorkout = payload;
  },
  setCurrentLeaderboard(state: { currentLeaderboard: any }, payload: any) {
    state.currentLeaderboard = payload;
  }
};

const actions = {
  fetchWorkoutTypes({ commit, state }: any) {
    // if (state.workoutCategories.length <= 0) {
    if (state.workoutCategories.length < 3) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.createdAt",
          content_type: "workoutCategory"
        })
        .then((entries: { items: any[] }) => {
          state.workoutCategories = [];
          entries.items.forEach((element: { fields: any }) => {
            state.workoutCategories.push(element.fields);
          });
          commit("setLoading", false);
        });
    }
  },
  fetchWorkoutType({ commit, state }: any, payload: any) {
    if (state.workoutCategories.length <= 0) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.createdAt",
          content_type: "workoutCategory",
          "fields.category[match]": payload
        })
        .then((entries: { items: any[] }) => {
          entries.items.forEach((element: { fields: any }) => {
            state.workoutCategories.push(element.fields);
            state.workouts.push(...element.fields.workouts);
          });
          commit("setLoading", false);
        });
    } else {
      let foundCategory = state.workoutCategories.find(
        (item: { category: any }) => item.category === payload
      );
      commit("setWorkouts", foundCategory.workouts);
      // state.workouts = [] ?
    }
  },
  // TODO - fetch direct workout page
  fetchWorkout(
    { commit, state }: any,
    payload: { workoutType: any; id: string }
  ) {
    if (state.workoutCategories.length <= 0) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.updatedAt",
          content_type: "workoutCategory",
          include: 2,
          "fields.category[match]": payload.workoutType
        })
        .then((entries: { items: any[] }) => {
          entries.items.forEach((element: { fields: any }) => {
            state.workoutCategories.push(element.fields);
          });
          commit("setLoading", false);
        });
    } else {
      let foundCategory = state.workoutCategories.find(
        (item: { category: any }) => item.category === payload.workoutType
      );
      commit("setWorkouts", foundCategory.workouts);

      let foundWorkout = state.workouts.find(
        (item: Workout) => (item as Workout).sys.id === payload.id
      );

      commit("setCurrentWorkout", foundWorkout);
      state.workouts = [];
      // state.currentWorkout = {};
    }
  },
  uploadWorkoutResults(
    { commit, getters, dispatch }: any,
    payload: { workoutId: string }
  ) {
    commit("setLoading", true);
    commit("clearError");
    // upload to user
    firebase
      .database()
      .ref(`/users/${getters.user.id}/workouts`)
      .push(payload);
    // upload to group of workouts
    firebase
      .database()
      .ref("/workouts/" + payload.workoutId)
      .push({ ...payload, userId: getters.user.id });
    // update user
    let user = getters.user;
    firebase
      .database()
      .ref(`/users/${getters.user.id}/workouts/`)
      .once("value")
      .then(snapshot => {
        user.workouts = snapshot.val();
        commit("setUser", user);
        dispatch("fetchWorkoutLeaderboard", payload.workoutId).then(() => {
          commit("setLoading", false);
        });
      });
  },
  updateWorkoutResults({ commit, getters, dispatch }: any, payload: any) {
    commit("setLoading", true);
    commit("clearError");
    // upload to user
    let user = getters.user;
    let key: any;
    if (user.workouts instanceof Object) {
      let workouts = Object.values(user.workouts);
      let matchedWorkout: any = workouts.find(
        workout => (workout as any).workoutId === payload.workoutId
      );
      key = Object.keys(user.workouts).find(
        k => user.workouts[k] === matchedWorkout
      );
      user.workouts[key as any].workoutResults = payload.workoutResults;
    }
    commit("setUser", user);
    firebase
      .database()
      .ref(`/users/${getters.user.id}/workouts/${key}`)
      .update(payload);
    // upload to group of workouts

    // get current group of workouts
    let workoutResults: Object;
    firebase
      .database()
      .ref("/workouts/" + payload.workoutId)
      .once("value")
      .then(snapshot => {
        workoutResults = snapshot.val();
      })
      .then(() => {
        let convertedResults = Object.values(workoutResults);

        let foundResult = convertedResults.find(
          result => result.userId === user.id
        );

        let resultKey = Object.keys(workoutResults).find(
          k => (workoutResults as any)[k] === foundResult
        );
        firebase
          .database()
          .ref(`/workouts/${payload.workoutId}/${resultKey}`)
          .update({ ...payload, userId: user.id });

        dispatch("fetchWorkoutLeaderboard", payload.workoutId).then(() => {
          commit("setLoading", false);
        });
      });
  },
  removeWorkoutResults({ commit, getters, dispatch }: any, payload: any) {
    commit("setLoading", true);
    commit("clearError");

    let user = getters.user;
    let key: String;

    if (user.workouts) {
      let workouts = Object.values(user.workouts);
      let matchedWorkout: any = workouts.find(
        workout => (workout as any).workoutId === payload.workoutId
      );
      key = Object.keys(user.workouts).find(
        k => user.workouts[k] === matchedWorkout
      ) as String;

      delete user.workouts[key as any];
      commit("setUser", user);

      firebase
        .database()
        .ref(`/users/${getters.user.id}/workouts/${key}`)
        .remove();

      // get current group of workouts
      let workoutResults: Object;
      firebase
        .database()
        .ref("/workouts/" + payload.workoutId)
        .once("value")
        .then(snapshot => {
          workoutResults = snapshot.val();
        })
        .then(() => {
          let convertedResults = Object.values(workoutResults);

          let foundResult = convertedResults.find(
            result => result.userId === user.id
          );

          let resultKey = Object.keys(workoutResults).find(
            k => (workoutResults as any)[k] === foundResult
          );
          firebase
            .database()
            .ref(`/workouts/${payload.workoutId}/${resultKey}`)
            .remove()
            .then(() => {
              dispatch("fetchWorkoutLeaderboard", payload.workoutId).then(
                () => {
                  commit("setLoading", false);
                }
              );
            });
        });
    }
    commit("setLoading", false);
  },
  fetchWorkoutLeaderboard({ commit }: any, payload: string) {
    commit("setLoading", true);
    commit("clearError");

    firebase
      .database()
      .ref("/workouts/" + payload)
      .once("value")
      .then(snapshot => {
        commit("setCurrentLeaderboard", snapshot.val());
        commit("setLoading", false);
      });
  }
};

const getters = {
  workoutCategories(state: { workoutCategories: any }) {
    return state.workoutCategories;
  },
  workouts(state: { workouts: Workout[] }) {
    return state.workouts;
  },
  currentWorkout(state: { currentWorkout: Workout }) {
    return state.currentWorkout;
  },
  currentLeaderboard(state: { currentLeaderboard: any }) {
    return state.currentLeaderboard;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
