<template>
  <div>
    <label class="notes">
      {{ value }}
      <span>备注</span>
      <input type="text" v-model="value"
             placeholder="在这里输入备注">
    </label>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';
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