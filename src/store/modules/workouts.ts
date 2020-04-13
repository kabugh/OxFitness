import { Workout } from "../models";

import * as firebase from "firebase";
let contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.VUE_APP_space,
  accessToken: process.env.VUE_APP_accessToken
});

const state = {
  features: [] as any[],
  faqItems: [] as any[],

  workoutCategories: [] as any[],
  workouts: [],
  currentWorkout: {},
  currentLeaderboard: {}
};

const mutations = {
  setFeatures(state: { features: any }, payload: any) {
    state.features = payload;
  },
  setFaqs(state: { faqItems: any }, payload: any) {
    state.faqItems = payload;
  },
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
  fetchFeatures({ commit, state }: any, payload: any) {
    if (state.features.length <= 0) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.createdAt",
          content_type: "features"
        })
        .then((entries: { items: any[] }) => {
          entries.items.forEach((element: { fields: any }) => {
            state.features.push(element.fields);
          });
          commit("setLoading", false);
        });
    } else {
      commit("setFeatures", state.features);
    }
  },
  fetchFaq({ commit, state }: any) {
    if (state.faqItems.length <= 0) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.createdAt",
          content_type: "faqsCategory"
        })
        .then((entries: { items: any[] }) => {
          entries.items.forEach((element: { fields: any }) => {
            state.faqItems.push(element.fields);
          });
          commit("setLoading", false);
        });
    } else {
      commit("setFaqs", state.faqItems);
    }
  },
  fetchWorkoutTypes({ commit, state }: any) {
    if (state.workoutCategories.length <= 0) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.createdAt",
          content_type: "workoutCategory"
        })
        .then((entries: { items: any[] }) => {
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
          // order: "-sys.createdAt",
          content_type: "workoutCategory",
          "fields.category[match]": payload
        })
        .then((entries: { items: any[] }) => {
          entries.items.forEach((element: { fields: any }) => {
            state.workoutCategories.push(element.fields);
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
          order: "sys.createdAt",
          content_type: "workoutCategory",
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
    { commit, getters }: any,
    payload: { workoutId: string }
  ) {
    commit("setLoading", true);
    commit("clearError");
    // upload to user
    let user = getters.user;
    if (!(user.workouts instanceof Array)) {
      user.workouts = [];
      user.workouts.push(payload);
    } else {
      user.workouts.push(payload);
    }
    commit("setUser", user);
    firebase
      .database()
      .ref(`/users/${getters.user.id}/workouts/`)
      .push(payload);
    // upload to group of workouts
    firebase
      .database()
      .ref("/workouts/" + payload.workoutId)
      .push({ ...payload, userId: getters.user.id });
    commit("setLoading", false);
  },
  updateWorkoutResults({ commit, getters }: any, payload: any) {
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
      });
    commit("setLoading", false);
  },
  removeWorkoutResults({ commit, getters }: any, payload: any) {
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
            .remove();
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
      });
    commit("setLoading", false);
  }
};

const getters = {
  features(state: { features: any }) {
    return state.features;
  },
  faqItems(state: { faqItems: any }) {
    return state.faqItems;
  },
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
