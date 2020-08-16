/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import workouts from "./modules/workouts";
import features from "./modules/features";

import { vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    workouts,
    features
  },
  mutations: {
    ...vuexfireMutations
  }
});
