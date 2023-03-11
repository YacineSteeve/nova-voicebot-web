import type { RouteRecordRaw } from 'vue-router';
import cookies from '@/lib/cookies';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home/HomeView.vue'),
        children: [
            {
                path: '',
                name: 'Landing',
                component: () => import('@/views/Home/Subviews/LandingPage.vue')
            },
            {
                path: 'contact',
                name: 'Contact',
                component: () => import('@/views/Home/Subviews/ContactForm.vue')
            }
        ]
    },
    {
        path: '/nova',
        name: 'Nova',
        component: () => import('@/views/NovaView.vue'),
        beforeEnter: (to, from, next) => {
            if (!cookies.get('nova-auth-token')) {
                next('/user/login');
                return;
            }
            next();
        }
    },
    {
        path: '/user',
        name: 'Authentication',
        component: () => import('@/views/Auth/AuthView.vue'),
        children: [
            {
                path: 'signup',
                name: 'Signup',
                component: () => import('@/views/Auth/Subviews/SignupForm.vue')
            },
            {
                path: 'login',
                name: 'Login',
                component: () => import('@/views/Auth/Subviews/LoginForm.vue'),
            }
        ]
    }
];

export default routes;
