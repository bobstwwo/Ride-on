<template>
  <div class="search">
    <div class="search__icon">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="kirk-icon sc-gqjmRU jANYxY addressField-searchIcon"
        width="18"
        height="18"
        aria-hidden="true"
      >
        <g
          fill="none"
          stroke="#708C91"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
        >
          <line x1="22" y1="22" x2="16.4" y2="16.4"></line>
          <circle cx="10" cy="10" r="9"></circle>
        </g>
      </svg>
    </div>
    <div class="search__input">
      <input id="suggest1" :placeholder="placeholder" type="text" />
    </div>
    <div class="search__exit">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="kirk-icon sc-gqjmRU jANYxY"
        width="18"
        height="18"
        aria-hidden="true"
      >
        <path
          d="M19 5L5 19M19 19L5 5"
          fill="none"
          stroke="#708C91"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  props: ['placeholder'],
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapMutations({
      setB: 'helper/setB',
    }),
  },
  mounted() {
    let input = document.getElementById('suggest1');
    let suggestView = new ymaps.SuggestView('suggest1', {
      offset: [10, 10],
    });
    const result = new Promise((resolve, reject) => {
      suggestView.events.add('select', function (e) {
        resolve(e.get('item').value);
      });
    });
    result.then((data) => {
      this.setB(data);
    });
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 30px;
  background-color: #ededed;
  padding: 8px 20px;
  margin: 40px auto;
  border-radius: 8px;
  & .search__icon {
    display: flex;
    align-items: center;
  }
  & .search__input {
    display: flex;
    align-items: center;
    height: 120%;
    & input {
      width: 435px;
      height: 80%;
      font-size: 18px;
      border: none;
      outline: none;
      background-color: transparent;
    }
  }
  & .search__exit {
    display: flex;
    align-items: center;
    transition: all 1s;
    &:hover {
      cursor: pointer;
      & svg {
        transform: rotate(90deg);
      }
    }
  }
}
</style>