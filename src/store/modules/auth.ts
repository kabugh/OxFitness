/* eslint-disable no-console */
import router from "@/router/index";
import * as firebase from "firebase";
import { User, Workout } from "../models";
import { Notify } from "quasar";
import { firebaseAction } from "vuexfire";

const state = {
  isNavOpen: false,
  emailDialog: false,
  usernameDialog: false,

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
  setUsernameDialog(state: { usernameDialog: boolean }, payload: boolean) {
    state.usernameDialog = payload;
  },
  setUser(state: { user: User }, payload: User) {
    state.user = payload;
  },
  setUsername(state: { user: User }, payload: string) {
    state.user.name = payload;
  },
  setSettings(
    state: { user: User },
    payload: { notifications: boolean; displayResults: boolean }
  ) {
    state.user.settings = payload;
  },
  setUserTransactions(state: any, payload: string[]) {
    state.user.transactions = payload;
  },
  setLastWatched(state: { user: { lastWatched: Workout } }, payload: any) {
    state.user.lastWatched = payload;
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
            premiumAccount: {
              isActive: false,
              activationDate: "",
              validUntil: ""
            },
            settings: {
              notifications: true,
              displayResults: true
            },
            transactions: [],
            workouts: [],
            lastWatched: {} as any
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
        if (e.code === "auth/email-already-in-use") {
          Notify.create({
            type: "negative",
            message: "Podany email jest już zajęty."
          });
        } else {
          Notify.create({
            type: "negative",
            message:
              "Wystąpił błąd. Spróbuj ponownie później lub skontaktuj się z Administratorem."
          });
        }
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
            premiumAccount: {
              isActive: false,
              activationDate: "",
              validUntil: ""
            },
            settings: {
              notifications: true,
              displayResults: true
            },
            transactions: [],
            workouts: [],
            lastWatched: {} as any
          };
          firebase
            .database()
            .ref("/users/" + newUser.id)
            .once("value")
            .then(snapshot => {
              let value: User = snapshot.val();
              // useless check?
              if (newUser.id === value.id) {
                newUser.premiumAccount = value.premiumAccount;
                newUser.name = value.name;
                newUser.settings = value.settings;
                newUser.transactions = value.transactions;
                if (value.lastWatched) newUser.lastWatched = value.lastWatched;
              }
              newUser.workouts = value.workouts;
            });
          commit("setUser", newUser);
          commit("setLoading", false);
          router.push("/dashboard").catch(e => {
            console.log(e);
          });

          // account validity cloud function call
          const checkAccess = firebase.functions().httpsCallable("checkAccess");
          checkAccess();
        }
      })
      .catch(e => {
        commit("setLoading", false);
        commit("setError", e);
        if (e.code === "auth/wrong-password") {
          Notify.create({
            type: "negative",
            message: "Podane hasło jest niepoprawne."
          });
        } else {
          Notify.create({
            type: "negative",
            message:
              "Wystąpił błąd. Spróbuj ponownie później lub skontaktuj się z Administratorem."
          });
        }
      });
  },
  autoSignIn({ commit }: any, payload: any) {
    const cachedUser: User = {
      id: payload.uid,
      email: payload.email,
      name: "",
      premiumAccount: {
        isActive: false,
        activationDate: "",
        validUntil: ""
      },
      settings: {
        notifications: true,
        displayResults: true
      },
      transactions: payload.transactions,
      workouts: payload.workouts,
      lastWatched: payload.lastWatched
    };
    firebase
      .database()
      .ref("/users/" + payload.uid)
      .once("value")
      .then(snapshot => {
        let value: User = snapshot.val();
        if (payload.uid === value.id) {
          cachedUser.premiumAccount = value.premiumAccount;
          cachedUser.name = value.name;
          cachedUser.settings = value.settings;
          cachedUser.transactions = value.transactions;
          if (value.lastWatched) cachedUser.lastWatched = value.lastWatched;
        }
        cachedUser.workouts = value.workouts;
      });
    commit("setUser", cachedUser);
    // account validity cloud function call
    const checkAccess = firebase.functions().httpsCallable("checkAccess");
    checkAccess();
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
  updateUsername({ commit, getters }: any, payload: string) {
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
  updateUserSettings({ commit, getters }: any, payload: Object) {
    commit("setLoading", true);
    firebase
      .database()
      .ref(`/users/${getters.user.id}/`)
      .update({ settings: payload })
      .catch(e => {
        commit("setLoading", false);
        commit("setError", e);
      });
    commit("setSettings", payload);
    commit("setLoading", false);
  },
  updateUserTransactions({ commit, getters }: any, payload: string) {
    commit("setLoading", true);
    if (!getters.user.transactions) {
      getters.user.transactions = {};
    }
    const userTransactions = getters.user.transactions;
    userTransactions[payload] = "incomplete";
    commit("setUserTransactions", userTransactions);

    firebase
      .database()
      .ref(`/users/${getters.user.id}/`)
      .update({ transactions: userTransactions })
      .then(() => {
        commit("setLoading", false);
      })
      .catch(e => {
        commit("setLoading", false);
        commit("setError", e);
      });
  },
  updateLastWatched({ commit, getters }: any, payload: Workout) {
    commit("setLoading", true);
    firebase
      .database()
      .ref(`/users/${getters.user.id}/`)
      .update({ lastWatched: payload })
      .catch(e => {
        commit("setLoading", false);
        commit("setError", e);
      });
    commit("setLastWatched", payload);
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
  usernameDialog(state: { usernameDialog: boolean }) {
    return state.usernameDialog;
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
