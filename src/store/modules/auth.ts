/* eslint-disable no-console */
import router from "@/router/index";
import * as firebase from "firebase";
import { User } from "../models";
import { Notify } from "quasar";
import { firebaseAction } from "vuexfire";

const state = {
  isNavOpen: false,
  emailDialog: false,

  user: null,
  loading: false,
  authError: null,
  error: null
};

const mutations = {
  setNav(state: { user: User; isNavOpen: boolean }, payload: boolean) {
    if (state.user) {
      state.isNavOpen = payload;
    }
  },
  setEmailDialog(state: { emailDialog: boolean }, payload: boolean) {
    state.emailDialog = payload;
  },
  setUser(state: { user: User }, payload: User) {
    state.user = payload;
  },
  setUsername(state: { user: User }, payload: string) {
    state.user.name = payload;
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
  bindUser: firebaseAction(({ bindFirebaseRef, getters }) => {
    // return the promise returned by `bindFirebaseRef`
    return bindFirebaseRef(
      "user",
      firebase.database().ref(`/users/${getters.user.id}`)
    );
  }),
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
            name: "",
            premiumAccount: true,
            workouts: []
          };
          commit("setUser", newUser);
          firebase
            .database()
            .ref("/users/" + newUser.id)
            .update(newUser);
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
            name: "",
            premiumAccount: true,
            workouts: []
          };
          firebase
            .database()
            .ref("/users/" + newUser.id)
            .once("value")
            .then(snapshot => {
              let value = snapshot.val();
              // useless check?
              if (newUser.id === (value as User).id) {
                newUser.premiumAccount = (value as User).premiumAccount;
                newUser.name = (value as User).name;
              }
              newUser.workouts = value.workouts;
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
    payload: { uid: string; email: string; name: string; workouts: any }
  ) {
    const cachedUser: User = {
      id: payload.uid,
      email: payload.email,
      name: "",
      premiumAccount: true,
      workouts: payload.workouts
    };
    firebase
      .database()
      .ref("/users/" + payload.uid)
      .once("value")
      .then(snapshot => {
        let value = snapshot.val();
        if (payload.uid === (value as User).id) {
          cachedUser.premiumAccount = (value as User).premiumAccount;
          cachedUser.name = (value as User).name;
        }
        cachedUser.workouts = value.workouts;
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
  updateUser({ commit, getters }: any, payload: string) {
    commit("setLoading", true);
    firebase
      .database()
      .ref(`/users/${getters.user.id}/`)
      .update({ name: payload })
      .catch(e => {
        commit("setLoading", false);
        commit("setError", e);
      });
    commit("setUsername", payload);
    commit("setLoading", false);
  },
  verifyAccount({ commit }: any) {
    commit("setLoading", true);
    let user = firebase.auth().currentUser;
    if (user && !user.emailVerified) {
      user
        .sendEmailVerification()
        .then(() => {
          Notify.create({
            type: "positive",
            message: `Zweryfikuj swoje konto poprzez wiadomość wysłaną na email.`
          });
        })
        .catch(e => {
          commit("setLoading", false);
          commit("setError", e);
        });
    } else if ((user as firebase.User).emailVerified) {
      Notify.create({
        type: "positive",
        message: `Twoje konto jest już zweryfikowane.`
      });
    }
    commit("setLoading", false);
  },
  changeEmail({ commit, dispatch, state }: any, payload: string) {
    commit("setLoading", true);
    let user = firebase.auth().currentUser;
    if (user)
      user
        .updateEmail(payload)
        .then(() => {
          commit("setLoading", false);
          if (state.user) {
            dispatch("signUserOut");
          } else {
            router.push("/");
          }
          Notify.create({
            type: "positive",
            message: `Email zmieniony. Zaloguj się i zweryfikuj swoje konto.`
          });
        })
        .catch(e => {
          commit("setLoading", false);
          commit("setError", e);
        });
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
  emailDialog(state: { emailDialog: boolean }) {
    return state.emailDialog;
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
