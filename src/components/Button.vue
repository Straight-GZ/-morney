<template>
  <div class="createTag-wrapper">
    <button class="createTag" @click="$emit('click',$event)">
      <slot/>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';


@Component
export default class Button extends Vue {
}
</script>

<style lang="scss" scoped>

.createTag {
  color: white;
  border: none;
  background: #767676;
  border-radius: 4px;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    margin-top: 44-16px;
    padding: 16px;
    text-align: center;
  }
}
</style>