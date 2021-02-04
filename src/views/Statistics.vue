<template>
  <div>
    <Layout>
      <div class = "chart-wrapper" ref = "chartWrapper">
        <Chart class = "chart" :options = "chartOptions"/>
      </div>
      <Tabs class-prefix = "types" :data-source = "typeList" :value.sync = "type"/>
      <ol v-if = "groupList.length>0">
        <li v-for = "(group,index) in groupList" :key = "index">
          <h3 class = 'title'>{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
          <ol>
            <li class = "record" v-for = "item in group.items" :key = "item.id">
              <span>{{ tagString(item.tags) }}</span>
              <span class = "notes">{{ item.notes }}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div class = "noResult" v-else>
        目前没有相关记录
      </div>
    </Layout>
  </div>
</template>
<script lang = "ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import _ from 'lodash';


@Component({
  components: {Chart, Tabs},
})
export default class Statistics extends Vue {
  type = '-';
  typeList = recordTypeList;

  get keyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.groupList, {title: dateString});
      array.push({title: dateString.substr(5), total: found ? found.total : 0});
    }
    array.reverse();
    return array;
  }

  get chartOptions() {
    const titles = this.keyValueList.map(item => item.title);
    const totals = this.keyValueList.map(item => item.total);
    return {
      grid: {
        left: 0,
        right: 0
      },
      xAxis: {
        axisTick: {alignWithLabel: true},
        type: 'category',
        data: titles,
        axisLine: {lineStyle: {color: '#666'}}
      },
      yAxis: {
        type: 'value', show: false
      },
      series: [{
        symbol: 'circle',
        itemStyle: {color: '#666', borderColor: '#666'},
        symbolSize: 12,
        data: totals,
        type: 'line'
      }],
      tooltip: {
        show: true, triggerOn: 'click',
        backgroundColor: '#999999',
        textStyle: {color: '#363636'},
        position: 'top',
        formatter: '{c}'
      }
    };
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(i => i.name).join('，');
  }

  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  get recordList() {
    return (this.$store.state as RootStore).recordList;
  }

  get groupList() {
    const {recordList} = this;
    type Result = {
      title: string;
      items: RecordItem[];
      total?: number;
    }[]
    const newList = clone(recordList).filter(item => item.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {return [] as Result;}
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const last = result[result.length - 1];
      const current = newList[i];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(newList[i].createdAt).format('YYYY-MM-DD'), items: [newList[i]]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }
}
</script>
<style scoped lang = "scss">
.chart {
  width: 430%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.noResult {
  padding: 16px;
  text-align: center;
}

::v-deep {
  .types-tabs-item {
    background: #c4c4c4;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item;
}

.record {
  @extend %item;
  background: white;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>
