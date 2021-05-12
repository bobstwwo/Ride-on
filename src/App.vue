<template>
  <Main></Main>
</template>

<script>
import Main from './components/Main.vue';
import { loadYmap } from 'vue-yandex-maps';
import { readUser } from '@/main/utils/api';
import { animatedLine } from '@/main/utils/yandex';
import { roomsRef, usersRef } from '@/firebase';
import store from '@/store/index';

export default {
  name: 'App',
  components: {
    Main,
  },
  data() {
    return {
    };
  },
  methods: {
  },
  async mounted() {
    const settings = { lang: 'en_US' };
    await loadYmap(settings);
    animatedLine();
  },
  beforeCreate() {
    try {
      readUser();
    } catch (err) {
      console.log(err);
    }
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
