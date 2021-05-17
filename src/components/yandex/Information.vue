<template>
  <div v-if="isActive" class="info">
    <div class="exit">
      <svg
        @click="isActive = false"
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
    <div class="title"><span>Информация о поездке</span></div>
    <div class="info__block">
      <div>Расстояние: {{ distance }}</div>
      <div>Время поездки: {{ travelTime }}</div>
    </div>
  </div>
  <div @click="isActive = true" v-else class="info-not-shown">
    <span>Показать информацию</span>
  </div>
</template>

<script>
export default {
  props: ['distance', 'travelTime'],
  data() {
    return {
      isActive: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.info__block {
  margin: 10px 0 0 10px;
  & div {
    margin: 7px 0 0 0;
  }
}
.title {
  display: flex;
  justify-content: center;
  margin: 10px 0 0 0;
}
.info-not-shown {
  width: 160px;
  height: 30px;
  background: white;
  border-radius: 4px;
  position: absolute;
  bottom: 5px;
  right: 180px;
  z-index: 2222222;

  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 12px;
  &:hover {
    cursor: pointer;
  }
}
.info {
  width: 300px;
  height: 120px;
  background: white;
  border-radius: 10px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 2222222;
}
.exit {
  width: 18px;
  height: 18px;
  cursor: pointer;
  overflow: hidden;
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    #first {
      transform: matrix(1, 0, 0, 1, 12, 0);
    }
    #last {
      transform: matrix(1, 0, 0, 1, 0, 0);
    }
  }
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