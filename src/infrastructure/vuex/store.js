import Vue from 'vue';
import Vuex from 'vuex';
import language from './modules/language';
import i18n from '@/View/translations/i18n';

Vue.use(Vuex);

const store = new Vuex.Store({  
  modules: {
    language,
  },
});

store.watch(
  (state) => state.language.currentLanguage,
  (newLanguage) => {
    i18n.locale = newLanguage;
  }
);

export default store;