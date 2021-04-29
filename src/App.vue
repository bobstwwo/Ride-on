<template>
  <Main></Main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Main from './components/Main.vue';
import store from '@/store/index';

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
</style>
