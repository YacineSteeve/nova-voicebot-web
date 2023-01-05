import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/AboutView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
