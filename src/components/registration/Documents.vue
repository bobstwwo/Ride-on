<template>
  <div class="doc-container">
    <form style="position: relative">
      <div class="input-file-container">
        <input @change="setPass($event)" class="input-file" id="my-file" type="file" />
        <label tabindex="0" for="my-file" class="input-file-trigger">
          <span>Выберите файл</span>
        </label>
      </div>
      <p class="file-return"></p>
    </form>
    <div class="title"><span>Загрузите скан или фотографию паспорта</span></div>
  </div>
</template>

<script>
import { jsForDoc } from '@/main/common';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      setDocuments: 'registration/setDocuments',
    }),
    setPass(e) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Add a valid File!');
      }
      this.setDocuments(files[0]);
    },
  },
  mounted() {
    jsForDoc();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/documents.scss';
</style>
