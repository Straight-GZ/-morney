<template>
  <div class="x">
    <Layout>
      <Tabs class-prefix="types" :data-source="typeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    </Layout>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Types from '@/components/Money/Types.vue';
import {Component} from 'vue-property-decorator';
import Tabs from "@/components/Tabs.vue";

@Component({
  components: {Tabs, Types},
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'd'
  typeList = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'}
  ]
  intervalList = [
    {text: '按天', value: 'd'},
    {text: '按周', value: 'w'},
    {text: '按月', value: 'm'},
  ]
}
</script>
<style scoped lang="scss">
.x ::v-deep .types-tabs-item {
  border: 1px solid red;
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }
}
</style>