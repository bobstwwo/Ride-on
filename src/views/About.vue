<template>
  <div class="conteiner">
    <div class="block">
      <div @click="close()" data-v-54d3a52e="" class="exit">
        <svg
          data-v-54d3a52e=""
          id="Capa"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512.001 512.001"
          xml:space="preserve"
        >
          <g data-v-54d3a52e="">
            <g data-v-54d3a52e="">
              <path
                data-v-54d3a52e=""
                d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
			L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
			c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
			l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
			L284.286,256.002z"
              ></path>
            </g>
          </g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
          <g data-v-54d3a52e=""></g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    close() {
      this.$router.go(-1);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.conteiner {
  width: 500px;
  height: 300px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-name: Anim;
  animation-duration: 1s;
}
.block {
  position: relative;
}
@keyframes Anim {
  0% {
    width: 0;
    height: 0;
  }
  100% {
    width: 500px;
    height: 300px;
  }
}
.exit {
  width: 18px;
  height: 18px;
  cursor: pointer;
  overflow: hidden;
  position: absolute;
  top: 4px;
  right: 4px;
  &:hover {
    #first {
      transform: matrix(1, 0, 0, 1, 12, 0);
    }
    #last {
      transform: matrix(1, 0, 0, 1, 0, 0);
    }
  }
}
#last {
  transform: matrix(1, 0, 0, 1, 12, 0);
  transition: all 0.5s;
}
#first {
  transition: all 0.5s;
}
#Capa {
  fill: black;
  transform: scale(0.7);
  transition: 0.4s;
  &:hover {
    transform: rotate(-90deg);
  }
}
</style>