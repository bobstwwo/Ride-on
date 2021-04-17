<template>
  <div class="phone-number">
    <form>
      <div class="group">
        <input
          @change="setPhone($event.target.value.trim())"
          name="phone"
          class="form-control"
          v-mask="'+7(999) 999-9999'"
          type="tel"
          required
        />
        <span class="bar"></span>
        <label>Номер телефона</label>
      </div>
      <div class="group">
        <input
          @change="setBirthday($event.target.value.trim())"
          v-mask="{ mask: '99/99/9999', greedy: true }"
          type="text"
          required
        />
        <span class="bar"></span>
        <label>Дата рождения</label>
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
      setPhone: 'registration/setPhone',
      setBirthday: 'registration/setBirthday',
    }),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/info-form.scss';
.phone-number {
  display: flex;
  justify-content: center;
}
</style>
