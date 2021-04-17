import Vue from 'vue';
import VueRouter from 'vue-router';

import FlapMain from '@/views/FlapMain';
import RegList from '@/views/RegList';
import Menu from '@/views/Menu';
import About from '@/views/About';
import DriverReg from '@/views/DriverReg';
import PassengerReg from '@/views/PassengerReg';
import Login from '@/views/Login';
import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter);

let routes = [
  {
    name: 'flap-main',
    path: '/',
    component: FlapMain,
  },
  {
    name: 'reg-list',
    path: '/reg-list',
    component: RegList,
  },
  {
    name: 'menu',
    path: '/menu',
    component: Menu,
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'driver-reg',
    path: '/driver-reg',
    component: DriverReg,
  },
  {
    name: 'passenger-reg',
    path: '/passenger-reg',
    component: PassengerReg,
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase
    .default.auth().currentUser;
  console.log("isauthenticated", isAuthenticated);
  console.log("requiresAuth", requiresAuth);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
