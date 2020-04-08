/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";
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
            router.push("/dashboard").catch(e => {
              console.log(e);
            });
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
                  if (newUser.id === (value as User).id) {
                    newUser.premiumAccount = (value as User).premiumAccount;
                  }
                });
              });
            commit("setUser", newUser);
            commit("setLoading", false);
            router.push("/dashboard").catch(e => {
              console.log(e);
            });
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
    changePassword({ commit, dispatch, state }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .sendPasswordResetEmail(payload)
        .then(() => {
          commit("setLoading", false);
          console.log("Email has been sent.");
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
            order: "-sys.createdAt",
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

        console.log(state.workouts);
        let foundWorkout = state.workouts.find(
          item => (item as Workout).sys.id === payload.id
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
    }
  }
});
