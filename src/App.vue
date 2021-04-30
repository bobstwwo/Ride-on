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
  created() {
    const script = document.createElement('script');
    script.id = 'ymaps';
    script.src = 'https://api-maps.yandex.ru/2.1/?50a0ee88-f1ab-4eca-87ec-9bc01278d33c&lang=ru_RU';
    document.head.append(script);
  },
  destroyed() {
    document.head.querySelector('script#ymaps').remove();
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
