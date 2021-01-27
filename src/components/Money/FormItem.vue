<template>
  <div>
    <label class="formItem">

      <span>{{ this.name }}</span>
      <input type="text" v-model="newValue"
             @input="onValueChanged"
             :placeholder=this.placeholder>
    </label>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) readonly name!: string;
  @Prop(String) readonly placeholder!: string;
  newValue = this.value;

  onValueChanged() {
    console.log(this.value)
    this.$emit('update:value', this.newValue);
  }
}

</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  display: flex;
  align-items: center;

  > span {
    padding: 0 16px;
  }

  > input {
    height: 40px;
    background: transparent;
    padding: 16px 0;
    flex-grow: 1;
    border: none;
  }
}

</style>