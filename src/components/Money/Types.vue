<template>
  <div>
    <ol class="types">
      <li :class="{[classPrefix+'-item']:classPrefix,'selected':value==='-'}" @click="selectType('-')">支出</li>
      <li :class="{[classPrefix+'-item']:classPrefix,'selected':value==='+'}" @click="selectType('+')">收入</li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  // type = '-';  //'-'表示支出 '+'表示收入
  @Prop() readonly value!: string;
  @Prop(String) readonly classPrefix?: string

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value', type);
  }
}
</script>

<style lang="scss" scoped>
.types {
  display: flex;
  font-size: 24px;

  > li {
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