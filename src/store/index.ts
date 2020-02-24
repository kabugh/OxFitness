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

    workoutCategories: [] as any[]
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
              imageURL: ""
            };
            commit("setUser", newUser);
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
            commit("setLoading", false);
            const newUser: User = {
              id: response.user.uid,
              email: payload.email,
              imageURL: ""
            };
            commit("setUser", newUser);
            // dispatch("loadOrders");
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
    fetchWorkouts({ commit, state }) {
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
    }
  }
});
