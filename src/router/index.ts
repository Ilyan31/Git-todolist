import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import TodoList from '@/views/TodoList.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/todolist',
    name: 'TodoList',
    component: TodoList,
    meta: { requiresAuth: true },  // Protège l'accès à cette route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Vérifie si l'utilisateur est authentifié avant d'accéder à la route protégée
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;