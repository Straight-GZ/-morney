<template>
  <div>
    <label class="notes">
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
export default class FormEdit extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) readonly name!: string;
  @Prop(String) readonly placeholder!: string;
  newValue: string = this.value;

  onValueChanged() {
    this.$emit('update:value', this.newValue);
  }
}

</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: flex;
  align-items: center;

  > span {
    padding: 0 16px;
  }

  > input {
    background: transparent;
    padding: 16px 0;
    flex-grow: 1;
    border: none;
  }
}

</style>