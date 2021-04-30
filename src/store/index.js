import Vue from 'vue';
import Vuex from 'vuex';

import Registration from './modules/registration';
import User from './modules/user';
import Skeleton from './modules/skeleton';
import Driver from './modules/driver';
import Helper from './modules/helper';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    registration: Registration,
    user: User,
    skeleton: Skeleton,
    driver: Driver,
    helper: Helper,
  },
});
