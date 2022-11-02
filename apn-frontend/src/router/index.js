import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Главная',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: {
      title: 'Авторизация',
    },
  },
  {
    path: '/recommendation',
    name: 'recommendation',
    component: () => import(/* webpackChunkName: "recommendation" */ '../views/RecommendationView.vue'),
    meta: {
      title: 'Рекомендации',
    },
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: () => import(/* webpackChunkName: "analytics" */ '../views/AnalyticsView.vue'),
    meta: {
      title: 'Аналитика',
    },
  },
  {
    path: '/tnved',
    name: 'tnved',
    component: () => import(/* webpackChunkName: "tnveds" */ '../views/TnvedView.vue'),
    meta: {
      title: 'ТН ВЭД',
    },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/UsersView.vue'),
    meta: {
      title: 'Пользователи',
    },
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta?.isExcludedAuth) {
    next();
    return;
  }
  const isAuth = localStorage.getItem('apn_isAuth') === 'true';
  if (to.path !== '/login' && !isAuth) {
    next({ path: '/login' });
  } else if (to.path === '/login' && isAuth) {
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;
