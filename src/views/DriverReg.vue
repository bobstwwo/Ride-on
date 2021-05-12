<template>
  <div class="container">
    <div class="title">
      <div class="title-inner"><span>Заполните поля ниже</span></div>
    </div>
    <div class="steps">
      <div class="step-1 df">
        <div :class="{ grey: this.position === 1 ? true : false }" class="step-info numb">01</div>
        <div class="step-line">
          <div class="step-line-circ"></div>
        </div>
        <div :class="{ white: this.position === 1 ? true : false }" class="step-info text">Информация о себе</div>
      </div>
      <div class="step-2 df">
        <div :class="{ grey: this.position === 2 ? true : false }" class="step-info numb">02</div>
        <div class="step-line"><div class="step-line-circ"></div></div>
        <div :class="{ white: this.position === 2 ? true : false }" class="step-info text">Контакт/Дата рождения</div>
      </div>
      <div class="step-3 df">
        <div :class="{ grey: this.position === 3 ? true : false }" class="step-info numb">03</div>
        <div class="step-line"><div class="step-line-circ"></div></div>
        <div :class="{ white: this.position === 3 ? true : false }" class="step-info text">
          Подтверждение личности и документов
        </div>
      </div>
      <div class="step-4 df">
        <div :class="{ grey: this.position === 4 ? true : false }" class="step-info numb">04</div>
        <div class="step-line"><div class="step-line-circ"></div></div>
        <div :class="{ white: this.position === 4 ? true : false }" class="step-info text">Email/Пароль</div>
      </div>
      <div class="step-5 df">
        <div :class="{ grey: this.position === 5 ? true : false }" class="step-info numb">05</div>
        <div class="step-line last-line">
          <div class="step-line-circ"></div>
        </div>
        <div :class="{ white: this.position === 5 ? true : false }" class="step-info text">Правила сервиса</div>
      </div>
    </div>
    <div class="changable-block">
      <transition name="reg-fade" mode="out-in">
        <component v-bind:is="currentComponent"></component>
      </transition>
    </div>
    <my-button :warningTitle="this.warningTitle" :show="this.showWarning" @clicked="nextBtn()"> </my-button>
    <myAudio></myAudio>
  </div>
</template>

<script>
import { firebase } from '@/firebase';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { animateShow, animateHide, animateSteps } from '@/main/common';
import { addNewUserChat } from '@/main/utils/chat/api';
import myAudio from '@/components/general/Audio';
import InfoForm from '@/components/registration/InfoForm';
import PhoneNumber from '@/components/registration/PhoneNumber';
import Documents from '@/components/registration/Documents';
import Button from '@/components/general/Button';
import Rules from '@/components/registration/Rules';
import EmailPassword from '@/components/registration/EmailPassword';
export default {
  components: {
    myButton: Button,
    myAudio,
    InfoForm,
    PhoneNumber,
    Documents,
    Rules,
    EmailPassword,
  },
  data() {
    return {
      position: 1,
      componentName: 'InfoForm',
      warningTitle: 'Поля имени и фамилии - обязательны!',
      showWarning: false,
      role: 'Driver',
    };
  },
  computed: {
    ...mapGetters({
      name: 'registration/name',
      surname: 'registration/surname',
      secondName: 'registration/secondName',
      phone: 'registration/phone',
      birthday: 'registration/birthday',
      documents: 'registration/documents',
      allChecked: 'registration/allChecked',
      email: 'registration/email',
      password: 'registration/password',
      user: 'user/user',
      profileImg: 'registration/profileImg',
    }),
    currentComponent() {
      return this.componentName;
    },
  },
  methods: {
    ...mapMutations({
      setUser: 'user/setUser',
    }),
    ...mapActions({
      create: 'user/create',
      uploadFile: 'user/uploadFile',
    }),
    nextBtn() {
      if (this.componentName === 'InfoForm') {
        if (this.name !== '' && this.surname !== '') {
          this.componentName = 'PhoneNumber';
          this.position = 2;
          this.showWarning = false;
        } else {
          this.showWarning = true;
        }
      } else if (this.componentName === 'PhoneNumber') {
        if (this.phone !== '') {
          this.showWarning = false;
          this.position = 3;
          this.componentName = 'Documents';
        } else {
          this.warningTitle = 'Поля номера телефона - обязательно!';
          this.showWarning = true;
        }
      } else if (this.componentName === 'Documents') {
        this.componentName = 'EmailPassword';
        this.position = 4;
      } else if (this.componentName === 'EmailPassword') {
        if (this.email !== '' && this.password !== '') {
          this.register();
        } else {
          this.warningTitle = 'Email и пароль - обязательны!';
          this.showWarning = true;
        }
      } else if (this.componentName === 'Rules') {
        if (this.allChecked) {
          localStorage.setItem('role', this.role.toLowerCase());
          this.$router.push({ name: 'adding' });
          this.showWarning = false;
        } else {
          this.warningTitle = 'Подтвертите, что согласны с правилами сервиса!';
          this.showWarning = true;
        }
      }
    },
    register() {
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.showWarning = false;
          this.componentName = 'Rules';
          this.position = 5;
          const obj = {
            role: this.role,
            name: this.name,
            surname: this.surname,
            secondName: this.secondName,
            phone: this.phone,
            email: this.email,
            birthday: this.birthday,
            passport: this.documents,
            profileImg: this.profileImg,
          };
          this.setUser(obj);
          if (this.documents !== '') this.uploadFile({ file: this.documents, path: 'passport-url' });
          this.create()
            .then(() => {
              console.log('Created new item successfully!');
              addNewUserChat(this.name + ' ' + this.surname);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((error) => {
          this.warningTitle = error;
          this.showWarning = true;
        });
    },
  },
  async mounted() {
    await animateShow('.container', '.title-inner', '.changable-block', '.btn');
    animateSteps();
  },
  async beforeRouteLeave(to, from, next) {
    await animateHide('.title-inner', '.changable-block', '.btn');
    next();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/steps.scss';
@import '@/assets/scss/styles-animate.scss';

.title {
  height: 17px;
  margin: 30px 0 0 0;
  font-size: 37px;
  display: flex;
  justify-content: center;
  font-size: 40px;
  text-transform: uppercase;
  font-family: 'Roboto';
  & span {
    position: relative;
    bottom: 22px;
    z-index: 10;
  }
}
.title-inner {
  background: #55c8bc;
}
.df {
  display: flex;
}
.white {
  color: white !important;
}
.grey {
  color: #55c8bc !important;
}
@media (max-width: 800px) {
  .steps {
    display: none;
  }
}
@media (max-width: 500px) {
  .title-inner {
    font-size: 27px;
  }
}
.changable-block {
  margin: 70px 0 0 0;
  height: 207px;
}
.reg-fade-enter-active,
.reg-fade-leave-active {
  transition: opacity 0.5s;
}
.reg-fade-enter,
.reg-fade-leave-to {
  opacity: 0;
}
</style>
