<template>
  <div class="types">
    <button :class="type==='-'&& 'selected'" @click="selectType('-')">支出</button>
    <button :class="type==='+'&& 'selected'" @click="selectType('+')">收入</button>
  </div>

</template>

<script>
export default {
  name: 'Types',
  props:['xxx'],
  mounted() {console.log(this.xxx)},
  data() {
    return {
      type: '-'  //'-'表示支出 '+'表示收入
    }
  },
  methods: {
    selectType(type) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown')
      }
      this.type = type
    }
  }
}
</script>

<style lang="scss" scoped>
.types {
  display: flex;
  font-size: 24px;

  > button {
    background: #c4c4c4;
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border: none;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      width: 100%;
      background: #333
    }
  }
}

</style>