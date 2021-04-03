<template>
  <div>
    <!-- <transition name="main"> -->
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
    <!-- </transition> -->
    <!-- <transition name="reg"> -->
    <!-- <div v-if="!this.isStart" class="reg">
      <div class="title">
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
    </div> -->
    <!-- </transition> -->
  </div>
</template>

<script>
import IconCar from "./flapping/Icon.vue";
import IconCar2 from "./flapping/Icon2.vue";
import IconCar3 from "./flapping/Icon3.vue";
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