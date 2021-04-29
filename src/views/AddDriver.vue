<template>
  <div class="append-container">
    <div class="container__inner">
      <div class="append__el">
        <div class="append__header"><span>Пункт отправки</span></div>
        <div class="search">
          <div class="search__icon">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="kirk-icon sc-gqjmRU jANYxY addressField-searchIcon"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <g
                fill="none"
                stroke="#708C91"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
              >
                <line x1="22" y1="22" x2="16.4" y2="16.4"></line>
                <circle cx="10" cy="10" r="9"></circle>
              </g>
            </svg>
          </div>
          <div class="search__input">
            <input id="suggest" :value="pointA" placeholder="Покровский б-р, 11" type="text" />
          </div>
          <div class="search__exit">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="kirk-icon sc-gqjmRU jANYxY"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path
                d="M19 5L5 19M19 19L5 5"
                fill="none"
                stroke="#708C91"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="append__el">
        <div class="append__header"><span>Пункт назначения</span></div>
        <div class="search">
          <div class="search__icon">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="kirk-icon sc-gqjmRU jANYxY addressField-searchIcon"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <g
                fill="none"
                stroke="#708C91"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
              >
                <line x1="22" y1="22" x2="16.4" y2="16.4"></line>
                <circle cx="10" cy="10" r="9"></circle>
              </g>
            </svg>
          </div>
          <div class="search__input">
            <input id="suggest1" :value="pointB" placeholder="Красная площадь" type="text" />
          </div>
          <div class="search__exit">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="kirk-icon sc-gqjmRU jANYxY"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path
                d="M19 5L5 19M19 19L5 5"
                fill="none"
                stroke="#708C91"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="append__el">
        <div class="append__header"><span>Когда состоится поездка?</span></div>
        <div class="time-picker">
          <date-picker
            v-model="departureTime"
            :open.sync="open"
            @change="handleChange"
            type="datetime"
            placeholder="Выберите дату и время"
          ></date-picker>
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
      <!-- <div class="warning-block">NONO</div> -->
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import 'vue2-datepicker/index.css';

import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      departureTime: null,
      open: false,
      peopleNum: 2,
      pointA: null,
      pointB: null,
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
        this.addTrip(data);
      } else {
        Swal.fire({
          title: 'Ошибка!',
          text: 'Поля не заполнены',
          icon: 'error',
          confirmButtonText: 'Ок',
        });
      }
    },
    ...mapMutations({
      addTrip: 'driver/addTrip',
    }),
    ...mapMutations({
      addTrip: 'driver/addTrip',
    }),
  },
  created() {
    const script = document.createElement('script');

    script.id = 'ymaps';
    script.src = 'https://api-maps.yandex.ru/2.1/?50a0ee88-f1ab-4eca-87ec-9bc01278d33c&lang=ru_RU';
    document.head.append(script);
    script.onload = () => {
      ymaps.ready(() => {
        let input = document.getElementById('suggest');
        let suggestView = new ymaps.SuggestView('suggest', {
          offset: [10, 10],
        });

        suggestView.state.events.add('change', function (e) {
          e.preventDefault;
          let activeIndex = suggestView.state.get('activeIndex');
          if (typeof activeIndex == 'number') {
            let activeItem = suggestView.state.get('items')[activeIndex];
            if (activeItem && activeItem.value != input.value) {
              // input.value = activeItem.value;
              // console.log(activeItem.value);
            }
          }
        });

        // __________________________________________________________
        input = document.getElementById('suggest1');
        suggestView = new ymaps.SuggestView('suggest1', {
          offset: [10, 10],
        });

        suggestView.state.events.add('change', function (e) {
          e.preventDefault;
          let activeIndex = suggestView.state.get('activeIndex');
          if (typeof activeIndex == 'number') {
            let activeItem = suggestView.state.get('items')[activeIndex];
            if (activeItem && activeItem.value != input.value) {
              // input.value = activeItem.value;
              // console.log(input);
              // console.log(activeItem.value);
            }
          }
        });
      });
    };
  },
  mounted() {},
  destroyed() {
    document.head.querySelector('script#ymaps').remove();
  },
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
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 30px;
  background-color: #ededed;
  padding: 8px 20px;
  margin: 40px auto;
  border-radius: 8px;
  & .search__icon {
    display: flex;
    align-items: center;
  }
  & .search__input {
    display: flex;
    align-items: center;
    height: 120%;
    & input {
      width: 435px;
      height: 80%;
      font-size: 18px;
      border: none;
      outline: none;
      background-color: transparent;
    }
  }
  & .search__exit {
    display: flex;
    align-items: center;
    transition: all 1s;
    &:hover {
      cursor: pointer;
      & svg {
        transform: rotate(90deg);
      }
    }
  }
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
</style>>