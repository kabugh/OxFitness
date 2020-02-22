import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavOpen: false
  },
  mutations: {
    setNav(state, payload) {
      state.isNavOpen = payload;
    }
  },
  actions: {},
  modules: {},
  getters: {
    isNavOpen(state) {
      return state.isNavOpen;
    }
  }
});
