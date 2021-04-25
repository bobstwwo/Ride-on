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
.doc-container {
  display: flex;
  justify-content: center;
}

.input-file-container {
  position: relative;
  //   width: 225px;
}
.js .input-file-trigger {
  //   display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 45px;
  background: #39d2b4;
  color: #fff;
  font-size: 1em;
  transition: all 0.4s;
  cursor: pointer;
}
.js .input-file {
  position: absolute;
  top: 0;
  left: 0;
  width: 225px;
  opacity: 0;
  padding: 14px 0;
  cursor: pointer;
}
.js .input-file:hover + .input-file-trigger,
.js .input-file:focus + .input-file-trigger,
.js .input-file-trigger:hover,
.js .input-file-trigger:focus {
  background: #34495e;
  color: #39d2b4;
}

.file-return {
  margin: 0;
}
.file-return:not(:empty) {
  margin: 1em 0;
}
.js .file-return {
  font-style: italic;
  font-size: 0.9em;
  font-weight: bold;
}
.js .file-return:not(:empty):before {
  content: 'Выбранный файл: ';
  font-style: normal;
  font-weight: normal;
}
.title {
  position: absolute;
  top: 60%;
  color: var(--text-color);
}
</style>
