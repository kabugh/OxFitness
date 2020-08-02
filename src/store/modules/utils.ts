const state = {
  lastWatched: {}
};

const mutations = {
  setLastWatched(state: { lastWatched: {} }, payload: any) {
    state.lastWatched = payload;
  }
};

const getters = {
  lastWatched(state: { lastWatched: {} }) {
    return state.lastWatched;
  }
};

export default {
  state,
  mutations,
  getters
};
