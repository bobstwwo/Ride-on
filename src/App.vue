<template>
  <Main></Main>
</template>

<script>
import { mapActions } from 'vuex';
import Main from './components/Main.vue';
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
  created() {
    this.read();
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
