<template>
  <div id="map"></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { makeRequest } from '@/main/utils/api';
import { initPanel, createMap } from '@/main/utils/yandex';

export default {
  data() {
    return {
      allTrips: [],
      requestUrl:
        'https://geocode-maps.yandex.ru/1.x/?apikey=1aef85e8-6fde-49f7-ae9a-209497902ad2&format=json&geocode=',
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
      readAll: 'helper/readAll',
    }),
    getPoints() {
      for (const [key, user] of Object.entries(this.dataFromBD)) {
        let obj = {
          id: key,
        };
        const trips = user.unfinished;
        if (trips && trips.length > 0) {
          return trips.forEach((trip) => {
            obj.active = trip.active;
            obj.departureTime = trip.departureTime;
            obj.peopleNum = trip.peopleNum;

            obj.pointA = trip.pointA;
            obj.textA = trip.textA;
            obj.pointB = trip.pointB;
            obj.textB = trip.textB;
            this.allTrips.push(obj);
            obj = {
              id: key,
            };
          });
        } else {
          continue;
        }
      }
    },
  },
  async mounted() {
    const role = localStorage.getItem('role');
    if (role === 'driver') {
      // Если это драйвер, то счивытваю все его поездки и все поездки всех попутчиков
      this.readAll('passenger')
        .then(() => {
          this.getPoints();
          createMap(this.allTrips, this.user);
        })
        .catch((err) => {
          console.log(err);
          createMap(null);
        });
    } else {
      // Если это попутчик, то счивытваю все его поездки и все поездки всех водителей
      console.log('hi passenger');
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