<template>
  <Main></Main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Main from './components/Main.vue';
import store from '@/store/index';
import { loadYmap } from 'vue-yandex-maps';

export default {
  name: 'App',
  components: {
    Main,
  },
  methods: {
    ...mapActions({
      read: 'user/read',
    }),
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },
  async mounted() {
    console.log('mounted App.vue');

    // ymaps start
    const settings = { lang: 'en_US' };
    await loadYmap(settings);
    // ymaps end
    await this.$store.dispatch('user/read');
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
