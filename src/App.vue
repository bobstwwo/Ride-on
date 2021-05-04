<template>
  <Main></Main>
</template>

<script>
import Main from './components/Main.vue';
import { loadYmap } from 'vue-yandex-maps';
import { read } from '@/main/utils/api';
import store from '@/store/index';

export default {
  name: 'App',
  components: {
    Main,
  },
  async mounted() {
    console.log('mounted App.vue');
    const settings = { lang: 'en_US' };
    await loadYmap(settings);
  },
  beforeCreate() {
    read()
      .then((user) => {
        console.log('setRole called from created App.vue');
        store.commit('add/setRole', user.role.toLowerCase(), { root: true });
        store.commit('user/setStateUser', user, { root: true });
      })
      .catch((er) => {
        console.log(er);
      });
  },
};
</script>

<style lang="scss">
body {
  font-family: var(--body-font);
  overflow: hidden;
  margin: 0;
}
::-webkit-scrollbar {
  width: 5.5px;
  border-radius: 2px;
}
::-webkit-scrollbar-track {
  background-color: rgba($color: #434359, $alpha: 0.1);
  border-radius: 2px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba($color: #717189, $alpha: 0.1);
  border-radius: 2px;
}
::-webkit-scrollbar-button {
  display: none;
}
</style>
