import Vue from 'vue';
import Vuex from 'vuex';

import Registration from './modules/registration';
import User from './modules/user';
import Skeleton from './modules/skeleton';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    registration: Registration,
    user: User,
    skeleton: Skeleton,
  },
});
