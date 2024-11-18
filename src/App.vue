<template>
  <div id="app">
    <div class="bg-slate-50" :class="[direction === 'rtl' ? 'rtl' : 'ltr']">
      <div class="container mx-auto p-4">
        <LanguageSwitcher />
      </div>
      <NutritionFactsLabel />
    </div>
  </div>
</template>

<script>
import NutritionFactsLabel from './components/NutritionFactsLabel.vue'
import LanguageSwitcher from "./components/LanguageSwitcher.vue";

export default {
  name: 'App',
  components: {
    LanguageSwitcher,
    NutritionFactsLabel
  },
  data() {
    return {
      currentLanguage: "en",
    };
  },
  computed: {
    direction() {
      return this.$i18n.messages[this.$i18n.locale].direction || "ltr";
    },
  },
  watch: {
    direction(newDirection) {
      // Update the direction on the <html> tag
      document.documentElement.setAttribute("dir", newDirection);
    },
  },
  methods: {},
  created() { },
}
</script>