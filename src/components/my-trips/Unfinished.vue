<template>
  <div class="unfinished">
    <div v-if="getCorrectData && getCorrectData.length > 0">
      <div v-for="(value, index) in getCorrectData" v-bind:key="index" class="unfil__el">
        <p>ОТКУДА: {{ value.pointA }}</p>
        <p>КУДА: {{ value.pointB }}</p>
        <p>ВРЕМЯ: <input id="time" :value="value.departureTime" type="text" /></p>
        <div class="comment">
          <textarea
            :value="value.comment ? value.comment : ''"
            id="comment"
            placeholder="Комментарий"
            data-autoresize
            cols="30"
            rows="10"
          ></textarea>
          <div @click="save($event, { index, value })" class="comment__button">Сохранить</div>
        </div>
        <div @click="deleteTrip(index)" class="exit">
          <svg
            id="Capa"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512.001 512.001"
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
                ></path>
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
    </div>
    <div v-else>
      <p>There is no trips available</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      trips: 'add/trips',
    }),
    getCorrectData() {
      return this.trips.unfinished;
    },
  },
  methods: {
    ...mapActions({
      changeTrip: 'add/changeTrip',
      deleteTrip: 'add/deleteTrip',
    }),
    save(e, { index, value }) {
      const time = document.getElementById('time').value;
      const comment = document.getElementById('comment').value;
      let addedVal = value;
      addedVal.time = time;
      addedVal.comment = comment;
      let obj = {
        index: index,
        value: addedVal,
      };
      this.changeTrip(obj);
    },
  },
};
</script>


<style lang="scss" scoped>
.unfil__el {
  background: var(--text-color);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  position: relative;
  & input {
    border: none;
    outline: none;
    padding: 4px 6px;
    border-radius: 4px;
    background: rgba($color: #e9e9e9, $alpha: 0.4);
    color: white;
  }
}
#Capa {
  fill: white;
  transform: scale(0.7);
  transition: 0.4s;
  &:hover {
    transform: rotate(-90deg);
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
.comment {
  & textarea {
    margin: 0px;
    width: 224px;
    height: 50px !important;

    box-sizing: border-box;
    resize: none;
    padding: 4px;
    background-color: transparent;
    border: 1px solid var(--vgg-color);
    border-radius: 4px;
    outline: none;
    overflow-y: scroll;
    font-size: 16px;
    line-height: 24px;
    color: white;
  }

  display: flex;
  align-items: center;
}
.comment__button {
  padding: 8px 16px;
  text-transform: uppercase;
  color: white;
  background: green;
  border-radius: 4px;
  margin-left: 60px;
  &:hover {
    cursor: pointer;
  }
}
textarea::placeholder {
  color: rgba($color: white, $alpha: 0.5) !important;
}
</style>