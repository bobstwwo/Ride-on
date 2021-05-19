<template>
  <div id="map">
    <information v-if="routeInfo" :distance="getDistance" :travelTime="getTime"></information>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { makeRequest } from '@/main/utils/api';
import { initPanel, createMap } from '@/main/utils/yandex';
import Information from '@/components/yandex/Information';

export default {
  components: {
    Information,
  },
  data() {
    return {
      allTrips: [],
      requestUrl:
        'https://geocode-maps.yandex.ru/1.x/?apikey=e44fe465-761b-495e-9e8c-b91042469060&format=json&geocode=',
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      myTrips: 'add/trips',
      allTripsOFDrivers: 'helper/allTripsOFDrivers',
      allTripsOFPassengers: 'helper/allTripsOFPassengers',
      dataFromBD: 'helper/dataFromBD', //Все поездки всех противоположных, с id
      routeInfo: 'helper/routeInfo',
    }),
    getDistance() {
      const distance = this.routeInfo.distance;
      return Math.round((distance / 1000) * 100) / 100 + ' км.';
    },
    getTime() {
      const time = this.routeInfo.travelTime;
      return Math.round((time / 60) * 100) / 100 + ' мин.';
    },
  },
  methods: {
    ...mapActions({
      readAll: 'helper/readAll',
    }),
    getPoints(data) {
      const result = [];
      for (let user_bd of Object.entries(data)) {
        let obj = {
          id: user_bd[0],
        };
        const trips = user_bd[1].unfinished;
        if (trips && trips.length > 0) {
          trips.forEach((trip) => {
            obj.active = trip.active;
            obj.departureTime = trip.departureTime;
            obj.peopleNum = trip.peopleNum;
            obj.pointA = trip.pointA;
            obj.textA = trip.textA;
            obj.pointB = trip.pointB;
            obj.textB = trip.textB;
            obj.name = trip.name;
            result.push(obj);
            obj = {
              // id: key,
              id: user_bd[0],
            };
          });
        } else {
          continue;
        }
      }
      return result;
    },
  },
  async mounted() {
    const role = localStorage.getItem('role');
    if (role === 'driver') {
      // Если это драйвер, то счивытваю все его поездки и все поездки всех попутчиков
      this.readAll('passenger')
        .then((data) => {
          const myObj = data;
          const dataToBeSend = this.getPoints(myObj);
          createMap(dataToBeSend, this.myTrips.unfinished);
        })
        .catch((err) => {
          console.log(err);
          createMap(null); //Строим пустую карту
        });
    } else {
      // Если это попутчик, то счивытваю все его поездки и все поездки всех водителей
      this.readAll('driver')
        .then((data) => {
          const myObj = data;
          const dataToBeSend = this.getPoints(myObj);
          createMap(dataToBeSend, this.myTrips.unfinished);
        })
        .catch((err) => {
          console.log(err);
          createMap(null); //Строим пустую карту
        });
    }
  },
};
</script>

<style lang="scss">
#map {
  // width: 950px;
  max-width: 950px;
  height: 80vh;
  position: relative;
  overflow: hidden;
  & > div::-webkit-scrollbar {
    width: 5.5px !important;
    border-radius: 2px !important;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent !important;
    border-radius: 5px !important;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba($color: grey, $alpha: 0.1) !important;
    border-radius: 5px !important;
  }
  ::-webkit-scrollbar-button {
    display: none !important;
  }
}

.ymap-container {
  height: 99%;
  // width: 950px;
  max-width: 950px;
  position: absolute;
  top: 0;
  left: 0;
}
@media (max-width: 1280px) {
  .ymap-container {
    max-width: 100%;
  }
  #map {
    max-width: 100%;
  }
}
.customControl {
  display: none;
  background-color: red;
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
  overflow-y: auto;
}

.ballon {
  width: 300px;
  height: 150px;
  // background-color: aliceblue;
  font-family: monospace;
  overflow-y: auto;
}

.ballon__title {
  display: flex;
  justify-content: center;
}

.ballon__title span {
  text-transform: uppercase;
  margin-bottom: 8px;
}

.ballon__from,
.ballon__to,
.ballon__when {
  margin-bottom: 5px;
  padding-left: 10px;
}

.flex-block {
  margin-top: 8px;
  display: flex;
  justify-content: space-around;
}

.df__el {
  text-transform: uppercase;
  background-color: green;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 14px;
  color: white;
  &:hover {
    cursor: pointer;
  }
}
</style>