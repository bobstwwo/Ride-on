<template>
  <Main></Main>
</template>

<script>
import Main from "./components/Main.vue";
export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style lang="scss">
body {
  font-family: "Lato";
  overflow: hidden;
}

@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  src: url("~@/assets/fonts/Roboto-Medium.ttf") format("truetype");
}

@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap");
</style>
