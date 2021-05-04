<template>
  <div class="trips-container">
    <div class="left">
      <h3 @click="currentComponent = 'Unfinished'" :class="{ 'cl-white': currentComponent === 'Unfinished' }">
        Активные поездки
      </h3>
      <h3 @click="currentComponent = 'Finished'" :class="{ 'cl-white': currentComponent === 'Finished' }">
        Завершенные поездки
      </h3>
    </div>
    <div class="right">
      <component v-bind:is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Unfinished from '@/components/my-trips/Unfinished';
import Finished from '@/components/my-trips/Finished';
import { mapGetters, mapActions } from 'vuex';
import { read } from '@/main/utils/api';
import store from '@/store/index';

export default {
  components: {
    Unfinished,
    Finished,
  },
  data() {
    return {
      currentComponent: 'Unfinished',
    };
  },
  computed: {
    ...mapGetters({
      trips: 'add/trips',
    }),
  },
  methods: {
    ...mapActions({
      read: 'add/read',
    }),
  },
  mounted() {
    this.read();
  },
};
</script>

<style lang="scss" scoped>
.trips-container {
  height: 80vh;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
}
.left {
  width: 30%;
  height: 200px;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  & h3 {
    text-transform: uppercase;
    margin: 0 0 30px 0;
    &:hover {
      cursor: pointer;
    }
  }
}
.right {
  width: 70%;
  max-height: 74vh;
  overflow: auto;
  border-radius: 8px;
  margin-right: 70px;
  color: white;
}
.cl-white {
  color: white;
}
</style>
