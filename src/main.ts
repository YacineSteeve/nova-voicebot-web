import {createApp} from 'vue';
import App from './App.vue';
import {OhVueIcon} from 'oh-vue-icons';
import {isMobile} from 'is-mobile';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import {store, key} from '@/store/store';
import router from '@/router/';
import '@/lib/icons-loader';
import toastOptions from '@/lib/toast-config';

createApp(App)
    .provide('isMobile', isMobile())
    .use(router)
    .use(store, key)
    .use(Toast, {...toastOptions, shareAppContext: true})
    .component('v-icon', OhVueIcon)
    .mount('#app');
