/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";
import auth from "./modules/auth";
import { User, Workout } from "./models";
import { Notify } from "quasar";

import * as firebase from "firebase";
let contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.VUE_APP_space,
  accessToken: process.env.VUE_APP_accessToken
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  },
  state: {
    isNavOpen: false,

    user: null,
    loading: false,
    authError: null,
    error: null,

    features: [] as any[],
    faqItems: [] as any[],

    workoutCategories: [] as any[],
    workouts: [],
    currentWorkout: {},
    currentLeaderboard: {}
  },
  mutations: {
    setNav(state, payload) {
      if (state.user) {
        state.isNavOpen = payload;
      }
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setFeatures(state, payload) {
      state.features = payload;
    },
    setFaqs(state, payload) {
      state.faqItems = payload;
    },
    setWorkouts(state, payload) {
      state.workouts = payload;
    },
    setCurrentWorkout(state, payload) {
      state.currentWorkout = payload;
    },
    setCurrentLeaderboard(state, payload) {
      state.currentLeaderboard = payload;
    }
  },
  actions: {
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          if (response && response.user) {
            commit("setLoading", false);
            const newUser: User = {
              id: response.user.uid,
              email: payload.email,
              premiumAccount: true,
              workouts: []
            };
            commit("setUser", newUser);
            firebase
              .database()
              .ref("/users/" + newUser.id)
              .push(newUser);
            router.push("/dashboard").catch(e => {
              console.log(e);
            });
          }
        })
        .catch(e => {
          commit("setLoading", false);
          commit("setError", e);
          console.log(e);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          if (response && response.user) {
            const newUser: User = {
              id: response.user.uid,
              email: payload.email,
              premiumAccount: true,
              workouts: []
            };
            firebase
              .database()
              .ref("/users/" + newUser.id)
              .once("value")
              .then(snapshot => {
                Object.entries(snapshot.val()).forEach(([key, value]) => {
                  if (newUser.id === (value as User).id) {
                    newUser.premiumAccount = (value as User).premiumAccount;
                  }
                });
                newUser.workouts = snapshot.val().workouts;
              });
            commit("setUser", newUser);
            commit("setLoading", false);
            router.push("/dashboard").catch(e => {
              console.log(e);
            });
          }
        })
        .catch(e => {
          commit("setLoading", false);
          commit("setError", e);
          console.log(e);
        });
    },
    autoSignIn({ commit }, payload) {
      const cachedUser: User = {
        id: payload.uid,
        email: payload.email,
        premiumAccount: true,
        workouts: payload.workouts
      };
      firebase
        .database()
        .ref("/users/" + payload.uid)
        .once("value")
        .then(snapshot => {
          Object.entries(snapshot.val()).forEach(([key, value]) => {
            if (payload.uid === (value as User).id) {
              cachedUser.premiumAccount = (value as User).premiumAccount;
            }
          });
          cachedUser.workouts = snapshot.val().workouts;
        });
      commit("setUser", cachedUser);
    },
    signUserOut({ commit, state }) {
      commit("setLoading", true);
      firebase
        .auth()
        .signOut()
        .then(response => {
          if (state.isNavOpen) {
            commit("setNav", false);
          }
          commit("setUser", null);
          commit("setLoading", false);
          router.push("/");
        })
        .catch(e => console.log(e));
    },
    changePassword({ commit, dispatch, state }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .sendPasswordResetEmail(payload)
        .then(() => {
          commit("setLoading", false);
          if (state.user) {
            dispatch("signUserOut");
          } else {
            router.push("/");
          }
          Notify.create({
            type: "positive",
            message: `Wiadomość wysłana na email.`
          });
        })
        .catch(e => {
          commit("setLoading", false);
          commit("setError", e);
        });
    },
    fetchFeatures({ commit, state }, payload) {
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
    fetchFaq({ commit, state }) {
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
    fetchWorkoutTypes({ commit, state }) {
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
    fetchWorkoutType({ commit, state }, payload) {
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
          item => item.category === payload
        );
        commit("setWorkouts", foundCategory.workouts);
        // state.workouts = [] ?
      }
    },
    // TODO - fetch direct workout page
    fetchWorkout({ commit, state }, payload) {
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
          item => item.category === payload.workoutType
        );
        commit("setWorkouts", foundCategory.workouts);

        let foundWorkout = state.workouts.find(
          item => (item as Workout).sys.id === payload.id
        );

        commit("setCurrentWorkout", foundWorkout);
        state.workouts = [];
        // state.currentWorkout = {};
      }
    },
    uploadWorkoutResults({ commit, getters }, payload) {
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
    updateWorkoutResults({ commit, getters }, payload) {
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
        user.workouts[key].workoutResults = payload.workoutResults;
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
          console.log(convertedResults[0].userId, user.id);

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
    fetchWorkoutLeaderboard({ commit }, payload) {
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
  },
  getters: {
    isNavOpen(state) {
      return state.isNavOpen;
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    features(state) {
      return state.features;
    },
    faqItems(state) {
      return state.faqItems;
    },
    workoutCategories(state) {
      return state.workoutCategories;
    },
    workouts(state) {
      return state.workouts;
    },
    currentWorkout(state) {
      return state.currentWorkout;
    },
    currentLeaderboard(state) {
      return state.currentLeaderboard;
    }
  }
});
