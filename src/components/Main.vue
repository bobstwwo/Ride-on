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
            style="transform: matrix(1, 0, 0, 1, 12, 0)"
          ></rect>
        </svg>
      </div>
    </div>
    <div class="main">
      <div class="main-inner">
        <div class="svg-outer">
          <transition name="fade" mode="out-in">
            <component v-bind:is="currentComponent"></component>
          </transition>
        </div>
        <div class="main-title">Мы часто слышим это..</div>
        <div class="main-desc">
          <div class="back"></div>
          <transition name="title">
            <span>{{ title }}</span>
          </transition>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-el">
        <span>Я говорю по-английски / </span>
        <span>О нас / </span>
        <span>Voice icon</span>
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
        "Эивотные испытывают сильную боль",
        "Говорит о возможностях поставленных .",
        "Господа, частокол на границе починят",
      ],
      title: "Эивотные испытывают сильную боль",
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
      }, 3000);
    },
  },
  mounted() {
    this.todo();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 97vh;
  background: #283445;
  margin: 0 auto;
  color: white;
  position: relative;
}
.header {
  display: flex;
  justify-content: space-between;
  margin: 0 30px;
  padding: 20px 0;
}
.title {
  text-transform: uppercase;
  font-size: 25px;
  cursor: pointer;
  font-weight: 700;
}
.desc {
  margin-top: 8px;
  margin-left: 2px;
  font-family: "EB Garamond";
  font-size: 10px;
  color: #55c8bc;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 0.4px;
}
.burg-menu {
  width: 26px;
  height: 20px;
  cursor: pointer;
  overflow: hidden;
}
.footer {
  color: #ffffff;
  float: right;
  font-size: 12px;
  text-transform: uppercase;
  text-align: right;
  position: absolute;
  right: 30px;
  bottom: 20px;
}
.footer-el {
  word-spacing: 3px;
  & span {
    margin-right: 4px;
    transition: all 0.2s;
    &:hover {
      cursor: pointer;
      border-bottom: 2px solid white;
    }
  }
}
.main {
  display: flex;
  justify-content: center;
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
  margin-top: 50px;
  font-size: 40px;
  position: relative;
  & .back {
    height: 20px;
    width: 100%;
    background: white;
    position: absolute;
    top: 17px;
    opacity: 0.3;
  }
}

.fade-enter-active {
  animation: fadeIn 0.4s;
}
.fade-leave-active {
  animation: fadeOut 0.4s;
}
.title-enter-active {
  animation: titleIn 0.4s;
}
.title-leave-active {
  animation: titleOut 0.4s;
}
@keyframes titleIn {
  from {
    opacity: 0;
    transform: perspective(600px) translate(0px, -100%) rotateX(45deg);
  }
  to {
    opacity: 1;
    transform: perspective(600px) translate(0px, 0%) rotateX(0deg);
  }
}
@keyframes titleOut {
  from {
    opacity: 1;
    transform: perspective(600px) translate(0px, 0%) rotateX(0deg);
  }
  to {
    opacity: 0;
    transform: perspective(600px) translate(0px, -100%) rotateX(45deg);
  }
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
  display: flex;
  justify-content: center;
}
</style>
