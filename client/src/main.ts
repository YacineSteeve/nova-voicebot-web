import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store/store';
import { OhVueIcon } from 'oh-vue-icons';
import { isMobile } from 'is-mobile';
import '@/lib/icons-loader';

function getMediaPreference() {
    const hasDarkPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;
    if (hasDarkPreference) {
        return 'dark';
    } else {
        return 'light';
    }
}

createApp(App)
    .use(router)
    .use(store, key)
    .provide('isMobile', isMobile())
    .provide('preferredTheme', getMediaPreference())
    .component('v-icon', OhVueIcon)
    .mount('#app');
