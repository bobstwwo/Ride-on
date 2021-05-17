<template>
  <div class="chat-dialog">
    <div
      v-for="(value, name, index) in messages"
      v-bind:key="index"
      :class="{ 'from-me': value.senderID === myID, 'from-them': value.senderID !== myID }"
    >
      <div class="msg-text">{{ value.text }}</div>
      <div class="msg-time">{{ formatDate(new Date(value.time)) }}</div>
    </div>
    <!-- <div class="from-them">
      <div class="msg-text">This is my first text</div>
      <div class="msg-time">11/05/21 23:22</div>
    </div> -->
  </div>
</template>

<script>
import { formatDate } from '@/main/common';
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  props: ['messages'],
  computed: {
    ...mapGetters({
      myID: 'chat/myID',
    }),
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.from-me {
  max-width: 50%;
  background-color: #f8f9f9;
  border-radius: 8px;
  padding: 5px;
  margin: 8px;
  transform: translate(90%, 0);
  &:hover {
    cursor: pointer;
  }
}
.from-them {
  max-width: 50%;
  background-color: #f8f9f9;
  border-radius: 8px;
  padding: 5px;
  margin: 8px;
  &:hover {
    cursor: pointer;
  }
}
.msg-text {
  margin-bottom: 4px;
}
.msg-time {
  font-size: 12px;
}
</style>