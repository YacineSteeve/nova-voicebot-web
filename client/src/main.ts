import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { OhVueIcon } from 'oh-vue-icons';
import { isMobile } from 'is-mobile';
import '@/lib/icons-loader';

createApp(App)
    .use(router)
    .provide('isMobile', isMobile())
    .component('v-icon', OhVueIcon)
    .mount('#app');
