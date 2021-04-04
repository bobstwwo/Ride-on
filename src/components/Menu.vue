<template>
  <div class="conteiner">
    <div class="menu">
      <ul>
        <li>
          <p class="item-idx">01</p>
          <p class="item-title"><span>Авторизация</span></p>
        </li>
        <li>
          <p class="item-idx">02</p>
          <p class="item-title"><span>О проекте</span></p>
        </li>
        <li>
          <p class="item-idx">03</p>
          <p class="item-title"><span>Правила пользования сервисом</span></p>
        </li>
        <li>
          <p class="item-idx">04</p>
          <p class="item-title"><span>Регистрация для водителей</span></p>
        </li>
        <li>
          <p class="item-idx">05</p>
          <p class="item-title"><span>Регистация для пассажиров</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { animateMenu } from "@/main/common";
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
  mounted() {
    animateMenu();
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.menu {
  margin-left: 180px;
  & ul {
    & li {
      list-style: none;
      display: flex;
      font-size: 50px;
      margin: 15px auto;
      overflow: hidden;
      height: 60px;
      opacity: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.item-idx {
  color: #8399b7;
  font-size: 26px;
  position: relative;
  top: 20px;
  &::after {
    content: " ";
    width: 18px;
    margin: 0px 13px;
    border-bottom: 1px solid #8399b7;
    display: block;
    float: right;
    margin-top: 20px;
  }
}
.item-title {
  color: #8399b7;
  z-index: 2;
  &:hover {
    &::after {
      width: 100%;
    }
    color: white;
  }
  &::after {
    content: "";
    height: 20px;
    background: #55c8bc;
    position: relative;
    width: 100%;
    top: -23px;
    display: block;
    z-index: -1;
    transition: width 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    width: 0%;
  }
  & span {
    z-index: 1;
  }
}
.animDown {
  animation-name: fadeOutDown2;
  animation-duration: 0.5s;
}
.opac {
  opacity: 1 !important;
}
</style>