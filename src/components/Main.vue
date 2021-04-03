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
import Flapping from "@/components/Flapping.vue";
import Menu from "@/components/Flapping.vue";
export default {
  data() {
    return {};
  },
  components: {
    "flap-main": Flapping,
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" src="@/assets/scss/main.scss" scoped></style>
