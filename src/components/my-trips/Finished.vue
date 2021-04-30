<template>
  <div class="finished">
    <div v-if="getCorrectData && getCorrectData.length > 0">
      <div v-for="(value, name, index) in getCorrectData" v-bind:key="index" class="unfil__el">
        <p>pointA: {{ value.pointA }}</p>
        <p>pointB: {{ value.pointB }}</p>
        <p>departureTime: {{ value.departureTime }}</p>
        <p>----------------------------------------------------------------------------</p>
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
      trips: 'driver/trips',
    }),
    getCorrectData() {
      return this.trips.finished;
    },
  },
};
</script>

<style>
</style>