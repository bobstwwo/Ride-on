<template>
  <div id="map"></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { makeRequest, getPoint, createMap } from '@/main/common';

export default {
  data() {
    return {
      allTrips: [],
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      myTrips: 'add/trips',
      allTripsOFDrivers: 'helper/allTripsOFDrivers',
      allTripsOFPassengers: 'helper/allTripsOFPassengers',
      dataFromBD: 'helper/dataFromBD', //Все поездки всех противоположных, с id
    }),
  },
  methods: {
    ...mapActions({
      myTripsRead: 'add/read',
      readAll: 'helper/readAll',
    }),
    async getPoints() {
      const requestUrl =
        'https://geocode-maps.yandex.ru/1.x/?format=json&apikey=faba12d9-51bc-4c82-b94d-fe8451d5e50c&geocode=';
      for (const user in this.dataFromBD) {
        let obj = {
          id: user,
        };
        const trips = this.dataFromBD[user].unfinished;
        if (trips && trips.length > 0) {
          trips.forEach(async (trip) => {
            const point = await makeRequest(requestUrl + trip.pointA);
            const point2 = await makeRequest(requestUrl + trip.pointB);

            obj.active = trip.active;
            obj.departureTime = trip.departureTime;
            obj.peopleNum = trip.peopleNum;

            obj.pointA = point.reverse();
            obj.textA = trip.pointA;
            obj.pointB = point2.reverse();
            obj.textB = trip.pointB;
            this.allTrips.push(obj);
            obj = {
              id: user,
            };
          });
        } else {
          continue;
        }
      }
    },
  },
  mounted() {
    createMap();
    // const role = localStorage.getItem('role');
    // if (role === 'driver') {
    //   // Если это драйвер, то счивытваю все его поездки и все поездки всех попутчиков
    //   this.myTripsRead();
    //   this.readAll('passenger').then(() => {
    //     this.getPoints();
    //   });
    // } else {
    //   // Если это попутчик, то счивытваю все его поездки и все поездки всех водителей
    // }
  },
};
</script>

<style lang="scss">
#map {
  width: 950px;
  height: 80vh;
  position: relative;
  overflow: hidden;
}

.ymap-container {
  height: 99%;
  width: 950px;
  position: absolute;
  top: 0;
  left: 0;
}
@media (max-width: 1280px) {
  .ymap-container {
    width: 100%;
  }
  #map {
    width: 100%;
  }
}
.customControl {
  display: none;
  background-color: beige;
  padding: 5px;
  border-radius: 3px;
  max-width: 250px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.closeButton {
  flex-basis: 15px;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 3px;
  height: 15px;
  cursor: pointer;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQgLjdsLS43LS43TDcgNi4zLjcgMCAwIC43IDYuMyA3IDAgMTMuM2wuNy43TDcgNy43bDYuMyA2LjMuNy0uN0w3LjcgN3oiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')
    50% no-repeat;
  opacity: 0.3;
}

.content {
  padding: 5px;
  max-height: 250px;
  overflow: auto;
}

a,
a:visited {
  color: #04b;
  text-decoration: none !important;
}
</style>