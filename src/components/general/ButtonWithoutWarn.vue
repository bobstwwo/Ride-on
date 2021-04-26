<template>
  <div class="doc-container">
    <form style="position: relative">
      <div class="input-file-container">
        <input @change="onfilePicked($event)" class="input-file" id="my-file" type="file" />
        <label tabindex="0" for="my-file" class="input-file-trigger">
          <span>Выберите файл</span>
        </label>
      </div>
    </form>
    <p class="file-return"></p>
  </div>
</template>

<script>
import { jsForDoc } from '@/main/common';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {};
  },
  props: ['file'],
  methods: {
    ...mapActions({
      uploadFile: 'user/uploadFile',
      read: 'user/read',
    }),
    onfilePicked(event) {
      try {
        if (this.file === 'profile') {
          const files = event.target.files;
          let filename = files[0].name;
          if (filename.lastIndexOf('.') <= 0) {
            return alert('Add a valid File!');
          }
          const fileReader = new FileReader();
          fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result;
          });
          fileReader.readAsDataURL(files[0]);
          this.uploadFile({ file: files[0], path: 'profile-url' });
        } else if (this.file === 'doc') {
        }
      } catch (ex) {
        console.info(ex.message);
      }
    },
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },
  mounted() {
    jsForDoc();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/documents.scss';
.doc-container {
  position: relative;
}
.file-return {
  position: absolute;
  top: 40px;
}
</style>
