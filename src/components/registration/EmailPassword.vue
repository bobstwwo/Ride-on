<template>
  <div class="data-form">
    <form>
      <div class="group">
        <input @change="setEmail($event.target.value.trim())" type="text" required />
        <span class="bar"></span>
        <label>Email</label>
      </div>
      <div class="group">
        <input @change="setPassword($event.target.value.trim())" type="password" required />
        <span class="bar"></span>
        <label>Пароль</label>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      setEmail: 'registration/setEmail',
      setPassword: 'registration/setPassword',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/info-form.scss';
.data-form {
  display: flex;
  justify-content: center;
}
</style>
