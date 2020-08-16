let contentful = require("contentful");
const client = contentful.createClient({
  space: process.env.VUE_APP_space,
  accessToken: process.env.VUE_APP_accessToken
});

const state = {
  features: [] as any[],
  faqItems: [] as any[]
};

const mutations = {
  setFeatures(state: { features: any }, payload: any) {
    state.features = payload;
  },
  setFaqs(state: { faqItems: any }, payload: any) {
    state.faqItems = payload;
  }
};

const getters = {
  features(state: { features: any }) {
    return state.features;
  },
  faqItems(state: { faqItems: any }) {
    return state.faqItems;
  }
};

const actions = {
  fetchFeatures({ commit, state }: any, payload: any) {
    if (state.features.length <= 0) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.createdAt",
          content_type: "features"
        })
        .then((entries: { items: any[] }) => {
          entries.items.forEach((element: { fields: any }) => {
            state.features.push(element.fields);
          });
          commit("setLoading", false);
        });
    } else {
      commit("setFeatures", state.features);
    }
  },
  fetchFaq({ commit, state }: any) {
    if (state.faqItems.length <= 0) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.createdAt",
          content_type: "faqsCategory"
        })
        .then((entries: { items: any[] }) => {
          entries.items.forEach((element: { fields: any }) => {
            state.faqItems.push(element.fields);
          });
          commit("setLoading", false);
        });
    } else {
      commit("setFaqs", state.faqItems);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
