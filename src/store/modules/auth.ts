/* eslint-disable no-console */
import router from "@/router/index";
import * as firebase from "firebase";
import { User } from "../models";
import { Notify } from "quasar";

const state = {
  isNavOpen: false,

  user: null,
  loading: false,
  authError: null,
  error: null
};

const mutations = {
  setNav(state: { user: User; isNavOpen: boolean }, payload: any) {
    if (state.user) {
      state.isNavOpen = payload;
    }
  },
  setUser(state: { user: User }, payload: User) {
    state.user = payload;
  },
  setLoading(state: { loading: boolean }, payload: boolean) {
    state.loading = payload;
  },
  setError(state: { error: string }, payload: string) {
    state.error = payload;
  },
  clearError(state: { error: null }) {
    state.error = null;
  }
};

const actions = {
  signUserUp({ commit }: any, payload: { email: string; password: string }) {
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
  signUserIn({ commit }: any, payload: { email: string; password: string }) {
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
  autoSignIn(
    { commit }: any,
    payload: { uid: string; email: string; workouts: any }
  ) {
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
  signUserOut({ commit, state }: any) {
    commit("setLoading", true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (state.isNavOpen) {
          commit("setNav", false);
        }
        commit("setUser", null);
        commit("setLoading", false);
        router.push("/");
      })
      .catch(e => console.log(e));
  },
  changePassword({ commit, dispatch, state }: any, payload: string) {
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
  }
};

const getters = {
  isNavOpen(state: { isNavOpen: boolean }) {
    return state.isNavOpen;
  },
  user(state: { user: User }) {
    return state.user;
  },
  loading(state: { loading: boolean }) {
    return state.loading;
  },
  error(state: { error: String }) {
    return state.error;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
