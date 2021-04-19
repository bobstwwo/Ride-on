<template>
  <div class="container">
    <div>
      <h1>WELCOME TO YOUR ACCOUNT</h1>
      <div @click="signOut()" class="btn">Log out</div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
export default {
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    signOut() {
      firebase.default
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: 'login' });
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;
  background: green;
}
</style>>
