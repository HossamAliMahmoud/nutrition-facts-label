<template>
    <div>
        <p>{{ $t('language') }}:</p>
        <div class="flex space-x-4">
            <button v-for="lang in languages" :key="lang" @click="switchLanguage(lang)" :class="[
                'px-4 py-2 rounded-md',
                currentLanguage === lang ? 'bg-blue-500 text-white' : 'bg-gray-200'
            ]">
                {{  $t(lang) }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            languages: ["en", "ar"], // Supported languages
        };
    },
    computed: {
        currentLanguage() {
            return this.$i18n.locale;
        },
    },
    methods: {
        switchLanguage(lang) {
            this.$i18n.locale = lang;// Change language
            localStorage.setItem("language", lang);
            const direction = this.$i18n.messages[lang].direction || "ltr";
            document.documentElement.setAttribute("dir", direction);
            localStorage.setItem("direction", direction);
        },
    },
    created() {
        const savedLang = localStorage.getItem("language");
        const savedDirection = localStorage.getItem("direction");
        if (savedLang) {
            this.$i18n.locale = savedLang;
        }
        if (savedDirection) {
            document.documentElement.setAttribute("dir", savedDirection);
        }
    }

};
</script>