/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";
import { User } from "./models";

import * as firebase from "firebase";
let contentful = require("contentful");

const client = contentful.createClient({
  space: "biebxe7da1h8",
  accessToken: "4P62X4-zP1xxjkt6LRaRTNYAiueVs4hrg6FLTQy-GYQ"
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavOpen: false,

    user: null,
    loading: false,
    authError: null,
    error: null,

    workoutCategories: [] as any[],
    workouts: [],
    currentWorkout: {}
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
    setWorkouts(state, payload) {
      state.workouts = payload;
    },
    setCurrentWorkout(state, payload) {
      state.currentWorkout = payload;
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
              imageURL: ""
            };
            commit("setUser", newUser);
            firebase
              .database()
              .ref("/users/" + newUser.id)
              .push(newUser);
            router.push("/dashboard").catch(e => {});
            console.log("User created");
          }
        })
        .catch(e => {
          commit("setLoading", false);
          commit("setError", e);
          console.log(e);
        });
    },
    signUserIn({ commit, dispatch }, payload) {
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
              imageURL: ""
            };
            firebase
              .database()
              .ref("/users/" + newUser.id)
              .once("value")
              .then(snapshot => {
                Object.entries(snapshot.val()).forEach(([key, value]) => {
                  if (newUser.id === value.id) {
                    newUser.premiumAccount = value.premiumAccount;
                  }
                });
              });
            commit("setUser", newUser);
            commit("setLoading", false);
            router.push("/dashboard").catch(e => {});
            console.log("Logged in");
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
        imageURL: ""
      };
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
            console.log(entries.items);
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
          item => item.sys.id === payload.id
        );

        commit("setCurrentWorkout", foundWorkout);
        state.workouts = [];
        // state.currentWorkout = {};
      }
    }
  },
  modules: {},
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
    workoutCategories(state) {
      return state.workoutCategories;
    },
    workouts(state) {
      return state.workouts;
    },
    currentWorkout(state) {
      return state.currentWorkout;
    }
  }
});
