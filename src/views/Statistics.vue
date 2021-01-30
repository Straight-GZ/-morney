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
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs, Types},
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'd';
  typeList = recordTypeList;
  intervalList = intervalList;
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