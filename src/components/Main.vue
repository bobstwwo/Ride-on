<template>
  <div class="wrapper">
    <div class="header">
      <div>
        <div class="title">Ride-ON</div>
        <div class="desc">Web-application for carpooling</div>
      </div>
      <div class="burg-menu">
        <svg id="svg-burger">
          <rect
            id="first"
            fill="#FFFFFF"
            x="0"
            y="1"
            width="26"
            height="2"
          ></rect>
          <rect fill="#FFFFFF" x="0" y="9" width="26" height="2"></rect>
          <rect
            id="last"
            fill="#FFFFFF"
            x="0"
            y="18"
            width="26"
            height="2"
            data-svg-origin="0 18"
          ></rect>
        </svg>
      </div>
    </div>
    <flap-main></flap-main>
    <div :class="{ hide: !isStart }" class="start">
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
    <div class="footer">
      <div class="footer-el">
        <span>Войти</span>
        <span>Правила</span>
        <span>О нас</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Flapping from "@/components/Flapping.vue";
import Menu from "@/components/Flapping.vue";
import { animateMain } from "@/main/common";
export default {
  data() {
    return {};
  },
  components: {
    "flap-main": Flapping,
  },
  computed: {
    ...mapGetters(["isStart"]),
  },
  methods: {
    ...mapMutations(["changeStart"]),
    change() {
      this.changeStart();
      animateMain();
    },
  },
  mounted() {
    // console.log(this.isStart);
  },
};
</script>

<style lang="scss" src="@/assets/scss/main.scss" scoped>
</style>
