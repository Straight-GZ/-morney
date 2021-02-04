<template>
  <div id = 'wrapper' ref = "wrapper">
  </div>
</template>

<script lang = "ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts';
import {EChartsOption} from 'echarts';
import {EChartsType} from 'echarts/types/dist/echarts';

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartsOption;
  chart?: EChartsType;

  mounted() {
    if (this.options === undefined) {
      return console.error('options 为空');
    }
    this.chart = echarts.init((this.$refs.wrapper as HTMLDivElement));
    this.chart.setOption(this.options);
  }

  @Watch('options')
  onOptionsChange(newValue: EChartsOption) {
    this.chart && this.chart.setOption(newValue);
  }
}
</script>

<style lang = "scss" scoped>
#wrapper {
  height: 400px;
}
</style>