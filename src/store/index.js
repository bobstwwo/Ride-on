import Vue from 'vue';
import Vuex from 'vuex';

import Registration from './modules/registration';
import User from './modules/user';
import Skeleton from './modules/skeleton';
import Add from './modules/add';
import Helper from './modules/helper';
import Chat from './modules/chat';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    registration: Registration,
    user: User,
    skeleton: Skeleton,
    add: Add,
    helper: Helper,
    chat: Chat,
  },
});
