<template>
  <div id="map">
    <yandex-map :coords="coords" :zoom="10">
      <ymap-marker :coords="coords" marker-id="123" hint-content="some hint" />
      <ymap-marker
        v-if="newCoors"
        :coords="newCoors"
        marker-id="122"
        hint-content="Москва, улица Новый Арбат, дом 24"
      />
    </yandex-map>
  </div>
</template>

<script>
import { init, makeRequest, getPoint } from '@/main/common';

export default {
  data() {
    return {
      coords: [55.76, 37.64],
      datafr: [
        {
          A: 'Одинцово, Дениса давыдова 9',
          B: 'Москва, Панферова 11',
        },
        {
          A: 'Москва Красная площадь',
          B: 'Платформа Мытищи',
        },
        {
          A: 'Москва, Покровский бульвар 11',
          B: 'Москва, Вавилова 60',
        },
      ],
      newCoors: null,
    };
  },
  methods: {},
  async mounted() {
    let data = await makeRequest(
      'https://geocode-maps.yandex.ru/1.x/?format=json&apikey=faba12d9-51bc-4c82-b94d-fe8451d5e50c&geocode=Москва, улица Новый Арбат, дом 24',
    );
    this.newCoors = data.reverse();
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 80vh;
}

.ymap-container {
  height: 99%;
  width: 99%;
}
</style>