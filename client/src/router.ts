import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/nova',
        name: 'Nova',
        component: () => import('@/views/NovaView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
