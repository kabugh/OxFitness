/* eslint-disable no-console */
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Transaction } from "../models";

const state = {};
const mutations = {};
const actions = {
  async checkout({ commit, dispatch }: any) {
    commit("setLoading", true);
    const headers = {
      headers: {
        "Access-Control-Allow-Headers":
          "Content-Type, Accept, Origin, Authorization",
        "Access-Control-Allow-Origin": "https://oxfitness.pl",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Method": "POST, OPTIONS",
        "Access-Control-Max-Age": 86400,
        "Content-Type": "application/json"
      }
    };
    let sessionId = "";
    await axios
      .post(process.env.VUE_APP_cloudFunctionUrl, headers)
      .then((response: any) => {
        commit("setLoading", false);
        sessionId = response.data.id;
        const transaction: Transaction = {
          payment_intent: response.data.payment_intent,
          amount: response.data.amount_total,
          status: response.data.payment_status
        };
        dispatch("updateUserTransactions", transaction);
      })
      .catch(e => commit("setLoading", false));
    const stripe: any = await loadStripe(process.env.VUE_APP_stripePublicKey);
    stripe.redirectToCheckout({
      sessionId: sessionId
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
