import Vue from 'vue'
import App from './App.vue'
import i18n from './View/translations/i18n';
import store from './infrastructure/vuex/store';

// Bootstrap Setup
import 'bootstrap/dist/css/bootstrap.css';  // Bootstrap CSS
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';  // BootstrapVue
import './assets/styles/custom-bootstrap.css'; // Global theme styles
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

store.watch(
  (state) => state.language.currentLanguage, // Watch the language state
  (newLanguage) => {
    i18n.locale = newLanguage; // Update vue-i18n's locale
  }
);

Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
