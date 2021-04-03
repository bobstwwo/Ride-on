<template>
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
</template>

<script>
import IconCar from "./flapping/Icon.vue";
import IconCar2 from "./flapping/Icon2.vue";
import IconCar3 from "./flapping/Icon3.vue";
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
    currentComponent() {
      return this.componentName;
    },
  },
  methods: {
    todo() {
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
  },
  mounted() {
    this.todo();
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

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56%;
}
.main-inner {
  position: relative;
  text-align: center;
  & svg {
    width: 200px;
    height: 136px;
  }
}
.main-title,
.main-desc {
  font-family: "EB Garamond";
  text-transform: uppercase;
  font-size: 20px;
  margin: 25px 0;
  text-align: center;
}
.main-desc {
  margin-top: 58px;
  font-size: 40px;
}
.main-desc-text {
  height: 14px;
  background: #55c8bc;
  & span {
    position: relative;
    bottom: 22px;
    z-index: 10;
  }
}
.fade-enter-active {
  animation: fadeIn 0.4s;
}
.fade-leave-active {
  animation: fadeOut 0.4s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    width: 0;
    height: 0;
    margin-top: 10%;
  }
  to {
    opacity: 1;
    width: 200px;
    height: 136px;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
    width: 200px;
    height: 136px;
  }
  to {
    opacity: 0;
    width: 0;
    height: 0;
    margin-top: 10%;
  }
}
.svg-outer {
  height: 136px;
}
.animated-main-desc {
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s;
}
.turn {
  opacity: 0;
  transform: perspective(600px) translate(0px, -100%) rotateX(45deg);
}
@media (max-width: 979px) {
  .main-desc-text {
    background: transparent;
  }
}
</style>