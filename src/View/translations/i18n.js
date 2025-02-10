import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ar from './ar.json';
import en from './en.json';

Vue.use(VueI18n);

const messages = {
  en: en,
  ar: ar,
};

const i18n = new VueI18n({
  locale: 'en', // Default language
  messages,
});

export default i18n;
