<template>
  <div id="map">
    <yandex-map ref="map" :controls="controls" :coords="coords" :zoom="10">
      <ymap-marker
        v-for="(item, index) in allTrips"
        :key="index"
        :coords="item.pointA"
        :marker-id="index"
        :hint-content="item.textA"
        :icon="them"
        :ref="'marker__' + index"
        @click="markerClicked"
        :hasBalloon="false"
      />
      <!-- :balloon="{ header: 'header', body: 'body', footer: 'footer' }" -->
    </yandex-map>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { init, makeRequest, getPoint, hintLayout } from '@/main/common';

export default {
  data() {
    return {
      coords: [55.76, 37.64],
      controls: [
        'zoomControl', // Ползунок масштаба
        // 'rulerControl', // Линейка
        // 'routeButtonControl', // Панель маршрутизации
        // 'trafficControl', // Пробки
        // 'typeSelector', // Переключатель слоев карты
        'fullscreenControl', // Полноэкранный режим
      ],
      myself: {
        layout: 'default#image',
        imageHref:
          'https://www.flaticon.com/svg/vstatic/svg/1333/1333071.svg?token=exp=1620216995~hmac=5bf9ab0917246770ccc42d5df7b2e83c',
        imageSize: [43, 43],
        imageOffset: [0, 0],
        content: 'content',
        contentOffset: [35, 15],
        contentLayout:
          '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>',
      },
      them: {
        layout: 'default#image',
        imageHref:
          'https://www.flaticon.com/svg/vstatic/svg/1332/1332768.svg?token=exp=1620216965~hmac=23e5b91f5df547edbcde9d6500c68439',
        imageSize: [43, 43],
        imageOffset: [0, 0],
        content: 'content',
        contentOffset: [35, 15],
        contentLayout:
          '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>',
      },
      newCoors: null,
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
    // ${this.coords}
    balloonTemplate() {
      console.log(this);
      return `
        <div class="ballonTmp">
          ${this}
        </div>
      `;
    },
    thirdOffice() {
      '<a href="https://yandex.ru/company/contacts/moscow/">Главный офис Яндекса</a>' +
        '<p><img style="width: 190px;" src="img/office.jpeg"></p>' +
        '<p>В офисе на улице Льва Толстого находится штаб-квартира Яндекса, он самый большой и по размерам, ' +
        'и по численности сотрудников. Сейчас он занимает почти целый квартал между улицами Льва Толстого ' +
        'и Тимура Фрунзе. Общая площадь всех зданий — более 50 тысяч квадратных метров.</p>';
    },
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
    markerClicked(e) {
      // const map = this.$refs.map;
      // // console.log();
      // ymaps.ready(['Panel']).then(function () {
      //   let panel = new ymaps.Panel();
      //   map.controls.add(panel, {
      //     float: 'left',
      //   });
      //   // Получим ссылку на геообъект, по которому кликнул пользователь.
      //   let target = e.originalEvent.target;
      //   // Зададим контент боковой панели.
      //   panel.setContent('HELLO');
      //   // Переместим центр карты по координатам метки с учётом заданных отступов.
      //   map.panTo(target.geometry.getCoordinates(), { useMapMargin: true });
      // });
      // let marker = 'marker__' + index;
      // console.log(this.$refs[marker]);
    },
  },
  mounted() {
    ymaps.ready(() => {
      console.log(12);
    });
    const role = localStorage.getItem('role');
    if (role === 'driver') {
      // Если это драйвер, то счивытваю все его поездки и все поездки всех попутчиков
      this.myTripsRead();
      this.readAll('passenger').then(() => {
        this.getPoints();
      });
    } else {
      // Если это попутчик, то счивытваю все его поездки и все поездки всех водителей
    }
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 99%;
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
}
.customControl {
  display: none;
  background-color: #fff;
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