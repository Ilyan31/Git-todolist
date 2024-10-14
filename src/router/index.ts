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
    meta: { requiresAuth: true },  // Protéger l'accès à cette route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;