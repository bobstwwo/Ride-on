<template>
  <div class="btn">
    <div @click="$emit('clicked')" class="btn-inner">
      <div class="next">Перейти далее</div>
      <div class="ok"><span>OK!</span></div>
    </div>
    <div v-if="show" class="warning">{{ warningTitle }}</div>
  </div>
</template>

<script>
export default {
  props: ['warningTitle', 'show'],
  data() {
    return {
      showWarn: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0 0 0;
  position: relative; //ДЛЯ WARNING
}
.btn-inner {
  width: 180px;
  height: 40px;
  overflow: hidden;
  &:hover {
    .next {
      top: -40px;
    }
    .ok {
      top: -40px;
    }
  }
}
.next {
  padding: 10px 18px;
  background: white;
  color: #5e6f88;
  text-transform: uppercase;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
  position: relative;
  top: 0;
  transition: top 0.6s;
}
.ok {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  background: #5e6f88;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
  position: relative;
  top: 0;
  transition: top 0.6s;
}

// ЭТА ЧАСТЬ ВТОРОСТИПЕННАЯ, МОЖНО УДАЛИТЬ
.warning {
  position: absolute;
  left: 50%;
  top: 80px;
  transform: translate(-50%, 0);
  color: var(--text-color);
  font-size: 14px;
}
</style>
