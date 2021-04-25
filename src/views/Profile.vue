<template>
  <div class="my-profile">
    <div class="top"><span>Редактирование профиля</span></div>
    <div class="pr-body">
      <div class="pr-body__top">
        <div class="group">
          <input disabled value="NAME" @change="setName($event.target.value.trim())" type="text" required />
          <span class="bar"></span>
          <label>Имя</label>
        </div>
        <div class="group">
          <input disabled value="SURNAME" @change="setName($event.target.value.trim())" type="text" required />
          <span class="bar"></span>
          <label>Фамилия</label>
        </div>
        <div class="group">
          <input disabled value="SECONDNAME" @change="setName($event.target.value.trim())" type="text" required />
          <span class="bar"></span>
          <label>Отчество</label>
        </div>
      </div>
      <div class="pr-body__bottom">
        <div class="input">
          <input @change="onfilePicked($event)" type="file" accept="image/*" />
        </div>
        <div class="img">
          <img :src="this.user.profileImg" alt="" />
        </div>
        <div class="profile-img">text</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      uploadFile: 'user/uploadFile',
    }),
    onfilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Add a valid File!');
      }
      // const fileReader = new FileReader();
      // fileReader.addEventListener('load', () => {
      //   this.imageUrl = fileReader.result;
      // });
      // fileReader.readAsDataURL(files[0]);
      this.uploadFile(files[0]);
    },
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/info-form.scss';
.top {
  text-transform: uppercase;
  font-size: 20px;
  margin-top: 20px;
  color: white;

  display: flex;
  justify-content: center;
}
.pr-body {
  margin: 80px 60px;
}
.pr-body__top input {
  background: transparent;
  width: 200px;
}
.bar {
  width: 200px;
}
.group label {
  top: -15px;
  font-size: 14px;
  color: #5e6f88;
}
.pr-body__top {
  display: flex;
  justify-content: space-around;
}
.pr-body__bottom {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
}
.img {
  width: 120px;
  height: 120px;
  & img {
    width: 100%;
    height: 100%;
  }
}
</style>>