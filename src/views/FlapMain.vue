<template>
  <div>
    <div class="main">
      <div class="main-inner">
        <div class="svg-outer">
          <transition name="fade" mode="out-in">
            <component v-bind:is="currentComponent"></component>
          </transition>
        </div>
        <div class="main-title">Мы часто слышим это..</div>
        <div class="main-desc">
          <transition name="title">
            <div class="animated-main-desc">
              <div class="main-desc-text">
                <span>{{ title }}</span>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="start">
      <div class="start-tl"><span>ПОГНАЛИ!</span></div>
      <div class="start-bt">
        <div @click="change()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15.317" class="picto-arrow-down">
            <path
              d="M15.76 7.35c-.36-.42-.99-.468-1.41-.11L9 11.826V0H7v11.825L1.65 7.24C1.233 6.883.6 6.93.24 7.35c-.36.42-.31 1.05.11 1.41L8 15.316l7.65-6.558c.42-.36.47-.99.11-1.41z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconCar from '@/components/flapping/Icon.vue';
import IconCar2 from '@/components/flapping/Icon2.vue';
import IconCar3 from '@/components/flapping/Icon3.vue';
import { animateHide } from '@/main/common';
export default {
  data() {
    return {
      componentName: 'IconCar',
      iconNames: ['IconCar', 'IconCar2', 'IconCar3'],
      titles: [
        'Комфорт и безопасность',
        'Удобное перемещение по городу',
        'Качественный и недорогой сервис',
      ],
      title: 'Комфорт и безопасность',
    };
  },
  components: {
    IconCar,
    IconCar2,
    IconCar3,
  },
  computed: {
    currentComponent() {
      return this.componentName;
    },
  },
  methods: {
    change() {
      animateHide('.svg-outer', '.main-title', '.main-desc').then(() => {
        this.$router.push({ name: 'reg-list' });
      });
    },
  },
  mounted() {
    setInterval(() => {
      let currId = this.iconNames.indexOf(this.componentName);
      switch (currId) {
        case 0:
          currId = 1;
          break;
        case 1:
          currId = 2;
          break;
        case 2:
          currId = 0;
          break;
      }
      this.componentName = this.iconNames[currId];
      this.title = this.titles[currId];
    }, 4000);
  },
  watch: {
    title: function () {
      let el = document.querySelector('.animated-main-desc');
      el.classList.toggle('turn');
      setTimeout(() => {
        el.classList.toggle('turn');
      }, 400);
    },
  },
};
</script>

<style lang="scss" src="@/assets/scss/flapping.scss" scoped>
</style>