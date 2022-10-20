import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { createI18n } from 'vue-i18n'
import enUS from './locales/en-US.json'
import frFr from './locales/fr-Fr.json'

type MessageSchema = typeof enUS;
const i18n = createI18n<[MessageSchema], 'en' | 'fr'>({
    legacy: false,
    locale: 'en',
    messages: {
    'en': enUS,
    'fr': frFr,
    }
});

const app = createApp(App)

app.use(i18n);
app.use(createPinia())
app.use(router)

app.mount('#app')
