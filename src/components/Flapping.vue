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
    <div class="reg hide">
      <div id="title-anim" class="title">
        <div>В качестве кого вы хотите</div>
        <div>
          <div class="title-el"><span>зарегистрироваться ?</span></div>
        </div>
      </div>
      <div class="section">
        <div class="sec-el">
          <div class="sec-el-in">
            <div class="el-icon">
              <img src="@/assets/img/Navigation-amico.svg" alt="" />
            </div>
            <div class="el-text">
              <div class="el-text-title">
                зарегистрироваться в качестве попутчика
              </div>
              <div class="el-text-body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </div>
            </div>
          </div>
        </div>
        <div class="sec-el el2">
          <div class="sec-el-in2">
            <div class="el-icon">
              <img src="@/assets/img/City driver-rafiki.svg" alt="" />
            </div>
            <div class="el-text">
              <div class="el-text-title">
                зарегистрироваться в качестве водителя
              </div>
              <div class="el-text-body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isStart" class="start">
      <div class="start-tl"><span>ПОГНАЛИ!</span></div>
      <div class="start-bt">
        <div @click="change()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 15.317"
            class="picto-arrow-down"
          >
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
import IconCar from "./flapping/Icon.vue";
import IconCar2 from "./flapping/Icon2.vue";
import IconCar3 from "./flapping/Icon3.vue";
import { animateMain } from "@/main/common";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      componentName: "IconCar",
      iconNames: ["IconCar", "IconCar2", "IconCar3"],
      titles: [
        "Комфорт и безопасность",
        "Удобное перемещение по городу",
        "Качественный и недорогой сервис",
      ],
      title: "Комфорт и безопасность",
    };
  },
  components: {
    IconCar,
    IconCar2,
    IconCar3,
  },
  computed: {
    ...mapGetters(["isStart"]),
    currentComponent() {
      return this.componentName;
    },
  },
  methods: {
    ...mapMutations(["changeStart"]),
    change() {
      this.changeStart();
      animateMain();
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
      if (this.isStart) {
        this.componentName = this.iconNames[currId];
        this.title = this.titles[currId];
      }
    }, 4000);
  },
  watch: {
    title: function () {
      let el = document.querySelector(".animated-main-desc");
      el.classList.toggle("turn");
      setTimeout(() => {
        el.classList.toggle("turn");
      }, 400);
    },
  },
};
</script>

<style lang="scss" src="@/assets/scss/flapping.scss" scoped>
</style>