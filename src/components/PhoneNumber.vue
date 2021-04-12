<template>
  <div class="phone-number">
    <form>
      <div class="group">
        <input name="phone" class="form-control" v-mask="'+7(999) 999-9999'" type="tel" required />
        <span class="bar"></span>
        <label>Номер телефона</label>
      </div>
      <div class="group">
        <input v-mask="{mask: '99/99/9999', greedy: true}" type="text" required />
        <span class="bar"></span>
        <label>Дата рождения</label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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