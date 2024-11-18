import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false

// Import translations
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const messages = { en, ar };

Vue.use(VueI18n)
// Create i18n instance
const i18n = new VueI18n({
  locale: "en", // default locale
  fallbackLocale: "en", // fallback language
  messages,
  silentTranslationWarn: true, // Suppress warnings for missing keys
  missing: (locale, key) => key, // Use the key itself as fallback text
});

// Tailwind
import "@/assets/css/main.css";
new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
