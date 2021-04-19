<template>
  <div class="reg hide">
    <div id="title-anim" class="title">
      <div>Для авторизации введите</div>
      <div>
        <div class="title-el"><span>email и пороль ниже:</span></div>
      </div>
    </div>
    <div class="section">
      <div class="data-form">
        <div>
          <form id="form">
            <div class="group">
              <input v-model="email" type="text" required />
              <span class="bar"></span>
              <label>Email</label>
            </div>
            <div class="group">
              <input v-model="password" type="text" required />
              <span class="bar"></span>
              <label>Пароль</label>
            </div>
          </form>
          <div @click="login(email, password)" class="submit"><span>Авторизоваться</span></div>
          <div class="err">{{ error }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { animateShow, animateHide } from '@/main/common';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    ...mapMutations({
      setLoading: 'skeleton/setLoading',
    }),
    ...mapActions({
      read: 'user/read',
    }),
    login() {
      this.setLoading(true);
      firebase.default
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.read();
          this.setLoading(false);
          this.$router.push({ name: 'dashboard' });
        })
        .catch((error) => {
          this.setLoading(false);
          this.error = error.message;
        });
    },
  },
  async mounted() {
    await animateShow('.reg', '#title-anim', '#form', '.submit');
  },
  async beforeRouteLeave(to, from, next) {
    await animateHide('#title-anim', '#form', '.submit');
    next();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/info-form.scss';
@import '@/assets/scss/flapping.scss';
.section {
  padding: 40px 0 0 0;
}
.data-form {
  display: flex;
  justify-content: center;
  position: relative;
}
.submit {
  display: flex;
  justify-content: center;
  background: green;
  padding: 10px 0;
  width: 60%;
  margin: 80px auto;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
  }
}
.err {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  color: var(--text-color);
}
</style>