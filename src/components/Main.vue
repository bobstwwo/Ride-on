<template>
  <div :class="{ blur: loading }" class="wrapper">
    <div class="header">
      <div>
        <router-link tag="div" class="title" to="/">Ride-ON</router-link>
        <div class="desc">Web-application for carpooling</div>
      </div>
      <div @click="openMenu()" class="burg-menu">
        <svg v-if="!this.isMenuOpened" id="svg-burger">
          <rect id="first" fill="#FFFFFF" x="0" y="1" width="26" height="2"></rect>
          <rect fill="#FFFFFF" x="0" y="9" width="26" height="2"></rect>
          <rect id="last" fill="#FFFFFF" x="0" y="18" width="26" height="2" data-svg-origin="0 18"></rect>
        </svg>
        <svg
          v-else
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512.001 512.001"
          style="enable-background: new 0 0 512.001 512.001"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
			L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
			c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
			l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
			L284.286,256.002z"
              />
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <div class="footer-el">
        <span @click="$router.push({ name: 'login' })">Войти</span>
        <span>Правила</span>
        <router-link tag="span" to="/about">О нас</router-link>
      </div>
    </div>
    <div v-if="loading" class="preloader">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { animateHide } from '@/main/common';

export default {
  data() {
    return {
      isMenuOpened: false,
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      loading: 'skeleton/loading',
    }),
  },
  methods: {
    openMenu() {
      if (this.isMenuOpened) {
        this.$router.go(-1);
        this.isMenuOpened = !this.isMenuOpened;
      } else {
        this.isMenuOpened = !this.isMenuOpened;
        this.$router.push({ name: 'menu' });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.blur {
  filter: blur(2px);
}
.preloader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
