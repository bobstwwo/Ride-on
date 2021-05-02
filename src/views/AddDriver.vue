<template>
  <div class="append-container">
    <div class="container__inner">
      <div class="append__el">
        <div class="append__header"><span>Пункт отправки</span></div>
        <search-box placeholder="Покровский б-р, 11"></search-box>
      </div>
      <div class="append__el">
        <div class="append__header"><span>Пункт назначения</span></div>
        <search-box2 placeholder="Красная площадь"></search-box2>
      </div>
      <div class="append__el">
        <div class="append__header"><span>Когда состоится поездка?</span></div>
        <div class="time-picker">
          <date-picker
            v-model="departureTime"
            :open.sync="open"
            @change="handleChange"
            type="datetime"
            valueType="format"
            placeholder="Выберите дату и время"
          >
          </date-picker>
        </div>
      </div>
      <div class="append__el">
        <div class="append__header"><span>сколько попутчиков возьмете в дорогу?</span></div>
        <div class="amount-picker">
          <svg
            @click="decrease"
            :class="{ dis: minus }"
            height="38"
            viewBox="0 0 512 512"
            width="38"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"
            />
            <path
              d="m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
          </svg>
          <div class="amount-of-people">{{ peopleNum }}</div>
          <svg
            @click="increase"
            :class="{ dis: plus }"
            height="38"
            viewBox="0 0 512 512"
            width="38"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"
            />
            <path
              d="m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m256 384c-8.832031 0-16-7.167969-16-16v-224c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v224c0 8.832031-7.167969 16-16 16zm0 0"
            />
          </svg>
        </div>
        <div class="submit">
          <div @click="onSubmit" class="submit__btn"><span>Добавить поездку</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/trip-adding/SearchBox';
import SearchBox2 from '@/components/trip-adding/SearchBox2';
import DatePicker from 'vue2-datepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import 'vue2-datepicker/index.css';

import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    DatePicker,
    SearchBox,
    SearchBox2,
  },
  data() {
    return {
      departureTime: null,
      open: false,
      peopleNum: 2,
      showWarn: false,
    };
  },
  computed: {
    minus() {
      return this.peopleNum === 1;
    },
    plus() {
      return this.peopleNum === 4;
    },
    ...mapGetters({
      pointA: 'helper/pointA',
      pointB: 'helper/pointB',
      trips: 'driver/trips',
      firstTime: 'driver/firstTime',
    }),
  },
  methods: {
    handleChange(value, type) {
      if (type === 'minute') {
        this.open = false;
      }
    },
    increase() {
      if (this.peopleNum < 4) this.peopleNum++;
    },
    decrease() {
      if (this.peopleNum > 1) this.peopleNum--;
    },
    onSubmit() {
      if (this.departureTime && this.pointA && this.pointB) {
        const data = {
          departureTime: this.departureTime,
          peopleNum: this.peopleNum,
          pointA: this.pointA,
          pointB: this.pointB,
        };
        data.active = false;
        this.read().then(() => {
          if (this.firstTime) {
            //Если первый раз добавляет
            this.addTrip(data);
            this.create();
          } else {
            //Если там уже что-то есть
            this.addTrip(data);
            this.update();
          }
        });
      } else {
        Swal.fire({
          title: 'Ошибка!',
          text: 'Поля не заполнены',
          icon: 'error',
          confirmButtonText: 'Ок',
        });
      }
    },
    ...mapActions({
      read: 'driver/read',
      create: 'driver/create',
      update: 'driver/update',
    }),
    ...mapMutations({
      addTrip: 'driver/addTrip',
    }),
  },
  // created() {
  //   const script = document.createElement('script');
  //   script.id = 'ymaps';
  //   script.src = 'https://api-maps.yandex.ru/2.1/?50a0ee88-f1ab-4eca-87ec-9bc01278d33c&lang=ru_RU';
  //   document.head.append(script);
  // },
  // destroyed() {
  //   document.head.querySelector('script#ymaps').remove();
  // },
};
</script>

<style lang="scss" scoped>
.append-container {
  width: 100%;
  height: 80vh;
  border-radius: 8px;
  // background: yellow;
}
.container__inner {
  width: 60%;
  max-height: 80%;
  margin: 0 auto;
  overflow: auto;
  padding: 0 20px 0 0;
}
.append__header {
  display: flex;
  width: 100%;
  height: 20px;
  justify-content: center;
  padding-top: 10px;
  text-transform: uppercase;
  color: white;
  font-size: 24px;
}
.time-picker {
  display: flex;
  justify-content: center;
  margin: 40px auto;
  position: relative;
}
.amount-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px auto;
  padding: 0 100px;
  & svg {
    cursor: pointer;
  }
  & path {
    fill: white;
  }
}
.dis {
  & path {
    fill: var(--body-color);
  }
}
.amount-of-people {
  font-size: 37px;
  color: white;
}
.submit {
  display: flex;
  align-items: center;
  justify-content: center;
}
.submit__btn {
  padding: 6px 12px;
  background: green;
  border-radius: 8px;
  font-size: 24px;
  color: white;
  &:hover {
    cursor: pointer;
  }
}
</style>>