<template>
  <div class="data-form">
    <form>
      <div class="group">
        <input v-model="name" type="text" required />
        <span class="bar"></span>
        <label>Имя</label>
      </div>
      <div class="group">
        <input type="text" required />
        <span class="bar"></span>
        <label>Фамилия</label>
      </div>
      <div class="group">
        <input type="text" required />
        <span class="bar"></span>
        <label>Отчество</label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      surname: '',
      secondName: '',
    };
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