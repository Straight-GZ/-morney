<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="Arithmetic">+</button>
      <button @click="output=output.slice(0,-1)||'0'">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="Arithmetic">-</button>
      <button @click="output='0'">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="Arithmetic">×</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent">.</button>
      <button @click="inputContent">0</button>
      <button @click="equal">=</button>
      <button @click="Arithmetic">÷</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop() readonly value!: string;
  output = this.value;
  result = '0';
  type = '';

  inputContent(event: MouseEvent) {
    const input = ((event.target as HTMLButtonElement).textContent as string);
    if (this.type === '=') {
      this.output = '0';
      this.type = '';
    }
    if (this.output.length === 10) {return; }
    if (this.output === '0' && '0123456789'.indexOf(input) >= 0) {
      this.output = input;
    } else if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    } else {
      this.output += input;
    }
  }

  Arithmetic(e: MouseEvent) {
    this.type = ((e.target as HTMLButtonElement).textContent as string);
    this.result = this.output;
    this.output = '0';
  }

  equal() {

    const resultNum = Number(this.result);
    const outputNum = Number(this.output);
    // const yyy = (x: string) => {
    //   let n = 0;
    //   if (x === '+') { n = resultNum + outputNum;}
    //   if (x === '-') { n = resultNum - outputNum;}
    //   if (x === '×') { n = resultNum * outputNum;}
    //   if (x === '÷') { n = resultNum / outputNum;}
    //   return n.toString();
    // };
    if (this.type === '+') {
      this.output = (resultNum + outputNum).toString();
    } else if (this.type === '-') {
      this.output = (resultNum - outputNum).toString();
    } else if (this.type === '×') {
      this.output = (resultNum * outputNum).toString();
    } else if (this.type === '÷') {
      this.output = (resultNum / outputNum).toString();
    }
    this.type = '=';
    this.result = '0';
  }

  ok() {
    this.equal();
    this.$emit('update:value', this.output);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  > .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    text-align: right;
    padding: 9px 16px;
  }

  > .buttons {
    @extend %clearFix;

    > button {
      width: 20%;
      height: 64px;
      float: left;
      border: none;
      background: transparent;

      &.ok {
        height: 64*2px;
        float: right;
      }

      $bg: #f2f2f2;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(6) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(7), &:nth-child(11) {
        background: darken($bg, 4*2%);
      }

      &:nth-child(4), &:nth-child(8), &:nth-child(12), &:nth-child(16) {
        background: darken($bg, 4*3%);
      }

      &:nth-child(5), &:nth-child(9), &:nth-child(13), &:nth-child(17) {
        background: darken($bg, 4*4%);
      }

      &:nth-child(10), &:nth-child(14), &:nth-child(18) {
        background: darken($bg, 4*5%);
      }

      &:nth-child(19) {
        background: darken($bg, 4*6%);
      }

      &:nth-child(15) {
        background: darken($bg, 4*7%);
      }
    }
  }
}

</style>