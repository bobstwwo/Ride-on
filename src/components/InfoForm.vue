<template>
  <div class="data-form">
    <form>
      <div class="group">
        <input @change="setName($event.target.value.trim())" type="text" required />
        <span class="bar"></span>
        <label>Имя</label>
      </div>
      <div class="group">
        <input @change="setSurname($event.target.value.trim())" type="text" required />
        <span class="bar"></span>
        <label>Фамилия</label>
      </div>
      <div class="group">
        <input @change="setSecondName($event.target.value.trim())" type="text" required />
        <span class="bar"></span>
        <label>Отчество</label>
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
      setName: 'registration/setName',
      setSurname: 'registration/setSurname',
      setSecondName: 'registration/setSecondName',
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