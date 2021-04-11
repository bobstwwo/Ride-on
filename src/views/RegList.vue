<template>
  <div class="reg hide">
    <div id="title-anim" class="title">
      <div>В качестве кого вы хотите</div>
      <div>
        <div class="title-el"><span>зарегистрироваться ?</span></div>
      </div>
    </div>
    <div class="section">
      <div class="sec-el">
        <div @click="changeRoute('driver')" class="sec-el-in">
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
        <div @click="changeRoute('customer')" class="sec-el-in2">
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
</template>

<script>
import { animateRegList } from "@/main/common";
import { animateMain } from "@/main/common";
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    changeRoute(el) {
      if (el === "driver") {
        this.$router.push({ name: "driver-reg" });
      } else {
        this.$router.push({ name: "passenger-reg" });
      }
    },
  },
  async mounted() {
    await animateRegList(".reg", "#title-anim", ".sec-el-in", ".sec-el-in2");
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  async beforeRouteLeave(to, from, next) {
    await animateMain("#title-anim", ".sec-el-in", ".sec-el-in2");
    next();
  },
};
</script>

<style lang="scss" src="@/assets/scss/flapping.scss" scoped>
</style>