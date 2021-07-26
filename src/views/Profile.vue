<template>
  <div class="my-profile">
    <div class="top"><span>Редактирование профиля</span></div>
    <div class="pr-body">
      <div class="pr-body__top">
        <div @click="warning = !warning" class="group">
          <input disabled :value="this.user.name" type="text" required />
          <span class="bar"></span>
          <label>Имя</label>
        </div>
        <div @click="warning = !warning" class="group">
          <input disabled :value="this.user.surname" type="text" required />
          <span class="bar"></span>
          <label>Фамилия</label>
        </div>
        <div @click="warning = !warning" v-if="this.user.secondName" class="group">
          <input disabled :value="this.user.secondName" type="text" required />
          <span class="bar"></span>
          <label>Отчество</label>
        </div>
      </div>
      <div class="pr-body__top">
        <div @click="warning = !warning" class="group">
          <input disabled :value="this.user.phone" type="text" required />
          <span class="bar"></span>
          <label>Номер телефона</label>
        </div>
        <div @click="warning = !warning" class="group">
          <input disabled :value="this.user.email" type="text" required />
          <span class="bar"></span>
          <label>Email</label>
        </div>
        <div @click="warning = !warning" v-if="this.user.birthday" class="group">
          <input disabled :value="this.user.birthday" type="text" required />
          <span class="bar"></span>
          <label>Дата рождения</label>
        </div>
      </div>
      <div class="pr-body__bottom">
        <div>Выберите фотографию профиля:</div>
        <ButtonWithoutWarn file="profile"></ButtonWithoutWarn>
      </div>
      <!-- <div v-if="docText" id="zxc">{{ docText }}</div> -->
      <div v-if="warning" class="warn">
        <div>
          <span>Примечание:</span>
          Для изменения свяжитесь с оператором!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ButtonWithoutWarn from '@/components/general/ButtonWithoutWarn';
export default {
  components: {
    ButtonWithoutWarn,
  },
  data() {
    return {
      warning: false,
    };
  },
  methods: {
    ...mapActions({
      uploadFile: 'user/uploadFile',
    }),
    onfilePicked(event) {
      try {
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
      } catch (ex) {
        console.info(ex.message);
      }
    },
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
    docText() {
      switch (this.user.passport) {
        case '':
          return 'Документы не загружены, свяжитесь с модератором!';
          break;
        case 'true':
          return 'Документы подтверждены модератором!';
        case 'false':
          return 'Документы не соответствуют требованиям!';
          break;
        default:
          return 'Документы проверяются модератором!';
          break;
      }
    },
  },
  watch: {
    warning: function (val) {
      if (val) {
        setTimeout(() => {
          this.warning = false;
        }, 6000);
      }
    },
  },
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
.group input {
  &:hover {
    cursor: pointer;
  }
}
.pr-body__top {
  display: flex;
  justify-content: space-around;
}
.pr-body__bottom {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.img {
  width: 120px;
  height: 120px;
  & img {
    width: 100%;
    height: 100%;
  }
}
.warn {
  position: absolute;
  z-index: 999;
  left: 0;
  bottom: -160px;
  display: flex;
  align-content: center;
  justify-content: center;
  background: rgba($color: #283445, $alpha: 0.4);
  padding: 12px 16px;
  color: white;
  & span {
    color: yellowgreen;
  }
  animation-name: warnOnNameClick;
  animation-duration: 0.8s;
}
.my-profile {
  // background: rebeccapurple;
  position: relative;
}
#zxc {
  position: absolute;
  left: 50%;
  bottom: -110px;
  transform: translate(-50%, 0);
  padding: 16px 20px;
  background: rgba($color: #283445, $alpha: 0.4);
  color: white;
}
</style>>

