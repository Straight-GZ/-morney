<template>
  <div>
    <label class = "formItem">
      <template v-if = "type==='date'">
        <span>{{ this.name }}</span>
        <input :type = "type||'text'" :value = "x(value)"
               @input = "onValueChanged($event.target.value)"
        >
      </template>
      <template v-else>
        <span>{{ this.name }}</span>
        <input :type = "type||'text'" :value = "value"
               @input = "onValueChanged($event.target.value)"
               :placeholder = placeholder>
      </template>
    </label>
  </div>

</template>

<script lang = "ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) readonly name!: string;
  @Prop(String) readonly placeholder!: string;
  @Prop() type?: string;

  x(isoString: string) {
    return dayjs(isoString).format('YYYY-MM-DD');
  }

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}

</script>

<style lang = "scss" scoped>
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