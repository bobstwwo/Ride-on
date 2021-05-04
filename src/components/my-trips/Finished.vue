<template>
  <div class="finished">
    <div v-if="getCorrectData && getCorrectData.length > 0">
      <div v-for="(value, name, index) in getCorrectData" v-bind:key="index" class="unfil__el">
        <p>ОТКУДА: {{ value.pointA }}</p>
        <p>КУДА: {{ value.pointB }}</p>
        <p>ВРЕМЯ: {{ value.departureTime }}</p>
      </div>
    </div>
    <div v-else>
      <p>There is no trips available</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      trips: 'add/trips',
    }),
    getCorrectData() {
      return this.trips.finished;
    },
  },
};
</script>

<style lang="scss" scoped>
.unfil__el {
  background: var(--text-color);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  position: relative;
}
</style>