/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";
import { User } from "./models";

import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavOpen: false,

    user: null,
    loading: false,
    authError: null,
    error: null
  },
  mutations: {
    setNav(state, payload) {
      state.isNavOpen = payload;
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
    signUserOut({ commit }) {
      commit("setLoading", true);
      firebase
        .auth()
        .signOut()
        .then(response => {
          commit("setUser", null);
          commit("setLoading", false);
          router.push("/");
        })
        .catch(e => console.log(e));
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
    }
  }
});
