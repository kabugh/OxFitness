/* eslint-disable no-console */
import * as firebase from "firebase";
import axios from "axios";

const state = {};
const mutations = {};
const actions = {
  getMessagingToken({ dispatch }: any) {
    const messaging = firebase.messaging();
    messaging
      .getToken()
      .then(async token => {
        if (token) {
          const currentMessageToken = window.localStorage.getItem(
            "messagingToken"
          );
          console.log("Token will be updated", currentMessageToken != token);
          if (currentMessageToken != token) {
            await dispatch("saveToken", token);
          }
        } else {
          console.log(
            "No Instance ID token available. Request permission to generate one."
          );
          dispatch("notificationsPermisionRequest");
        }
      })
      .catch(err => {
        console.log("An error occurred while retrieving token. ", err);
      });
  },

  notificationsPermisionRequest({ dispatch }: any) {
    const messaging = firebase.messaging();

    messaging
      .requestPermission()
      .then(() => {
        dispatch("getMessagingToken");
      })
      .catch(err => {
        console.log("Unable to get permission to notify.", err);
      });
  },

  monitorTokenRefresh({ dispatch }: any) {
    const messaging = firebase.messaging();

    const currentMessageToken = window.localStorage.getItem("messagingToken");
    console.log("currentMessageToken", currentMessageToken);
    if (currentMessageToken) {
      messaging.onTokenRefresh(() => {
        messaging
          .getToken()
          .then(token => {
            dispatch("saveToken", token);
          })
          .catch(err => {
            console.log("Unable to retrieve refreshed token ", err);
          });
      });
    }
  },

  saveToken(token: any) {
    const headers = {
      headers: {
        "Access-Control-Allow-Origin": "https://oxfitness.pl",
        "Access-Control-Allow-Credentials": "true"
      }
    };
    axios
      .post(
        "https://us-central1-oxfit-0001.cloudfunctions.net/generalSubscription",
        { token },
        headers
      )
      .then(response => {
        window.localStorage.setItem("messagingToken", token);
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
