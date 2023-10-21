import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '../stores/user';
const requireAuth = async (to, from, next) => {
  const store = useUserStore();
  store.loadingSession = true;
  const user = store.user;
  if (user !== null) {
    next();
  } else {
    next('/login');
  }
  store.loadingSession = false;
};
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      beforeEnter: requireAuth,
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }
  ]
});

export default router;
