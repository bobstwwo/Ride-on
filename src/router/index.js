import Vue from 'vue';
import VueRouter from 'vue-router';

import FlapMain from '@/views/FlapMain';
import RegList from '@/views/RegList';
import Menu from '@/views/Menu';
import About from '@/views/About';
import DriverReg from '@/views/DriverReg';
import PassengerReg from '@/views/PassengerReg';
import Login from '@/views/Login';
import Account from '@/views/Account';
import Add from '@/views/Add';
import NotFound from '@/views/404';
import Profile from '@/views/Profile';
import Trips from '@/views/Trips';
import Find from '@/views/Find';
import firebase from '@/firebase';

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
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Account,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'adding',
        component: Add
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile
      },
      {
        path: 'trips',
        name: 'trips',
        component: Trips
      },
      {
        path: 'find',
        name: 'find',
        component: Find
      }
    ]
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: NotFound
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.default.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    if ((to.name === "adding" && from.name === "login") || from.name === "driver-reg" || from.name === "passenger-reg") {
      console.log("Autorisations is done");
    }
    next();
  }
  if ((to.name === 'login' || to.name === 'reg-list' || to.name === 'driver-reg') && isAuthenticated) {
    next('/dashboard');
  }
});

export default router;
