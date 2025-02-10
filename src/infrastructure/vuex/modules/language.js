export default {
  state: {
    currentLanguage: 'en', // default language
  },
  mutations: {
    SET_LANGUAGE(state, language) {
      state.currentLanguage = language;
    },
  },
  actions: {
    changeLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    },
  },
  getters: {
    currentLanguage: (state) => state.currentLanguage,
  },
};
