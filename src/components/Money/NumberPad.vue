<template>
  <div class = "numberPad">
    <div class = "output">{{ output }}</div>
    <div class = "buttons">
      <button @click = "inputContent">1</button>
      <button @click = "inputContent">2</button>
      <button @click = "inputContent">3</button>
      <button @click = "Arithmetic">+</button>
      <button @click = "output=output.slice(0,-1)||'0'">删除</button>
      <button @click = "inputContent">4</button>
      <button @click = "inputContent">5</button>
      <button @click = "inputContent">6</button>
      <button @click = "Arithmetic">-</button>
      <button @click = "output='0'">清空</button>
      <button @click = "inputContent">7</button>
      <button @click = "inputContent">8</button>
      <button @click = "inputContent">9</button>
      <button @click = "Arithmetic">×</button>
      <button @click = "ok" class = "ok">OK</button>
      <button @click = "inputContent">.</button>
      <button @click = "inputContent">0</button>
      <button @click = "equal">=</button>
      <button @click = "Arithmetic">÷</button>
    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop() readonly value!: string;
  output = this.value.toString();
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
    this.result = this.output;
  }

  ok() {
    this.equal();
    this.$emit('update:value', parseFloat(this.output));
    this.$emit('submit', parseFloat(this.output));
    this.output = this.result;
  }
}
</script>

<style lang = "scss" scoped>
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
    $bg: #f2f2f2;

    > button {
      width: 20%;
      height: 40px;
      float: left;
      border: none;
      background: $bg;

      &.ok {
        height: 40*2px;
        float: right;
      }

      &:active {
        background: darken($bg, 4*7%);
        color: white;
      }
    }
  }
}

</style>