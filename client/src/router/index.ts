import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
    // Always scroll to top when navigating to a new route
    return { top: 0 }
  },
});

export default router;
