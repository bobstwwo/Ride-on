<template>
  <Main></Main>
</template>

<script>
import Main from './components/Main.vue';
export default {
  name: 'App',
  components: {
    Main,
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
