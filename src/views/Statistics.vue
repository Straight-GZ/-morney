<template>
  <div>
    <Layout>
      <!--      <div class = "chart-wrapper" ref = "chartWrapper">-->
      <!--        <Chart class = "chart" :options = "chartOptions"/>-->
      <!--      </div>-->
      <Tabs class-prefix = "types" :data-source = "typeList" :value.sync = "type"/>
      <ol v-if = "groupList(recordList,type).length>0">
        <li v-for = "(group,index) in groupList(recordList,type)" :key = "index">
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
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import Chart from '@/components/Chart.vue';
import {mixins} from 'vue-class-component';
import RecordHelper from '@/mixins/RecordHelper';


@Component({
  components: {Chart, Tabs},
})
export default class Statistics extends mixins(RecordHelper) {
  type = '-';
  typeList = recordTypeList;

  // get keyValueList() {
  //   const today = new Date();
  //   const array = [];
  //   for (let i = 0; i <= 29; i++) {
  //     const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
  //     const found = _.find(this.groupList, {title: dateString});
  //     array.push({title: dateString.substr(5), total: found ? found.total : 0});
  //   }
  //   array.reverse();
  //   return array;
  // }

  // get chartOptions() {
  //   const {titles} = this.keyValueList(this.recordList, this.type, 6);
  //   const {totals} = this.keyValueList(this.recordList, this.type, 6);
  //   console.log(titles, totals);
  //   return {
  //     title: {
  //       text: `近7日${this.type === '-' ? '支出' : '收入'}趋势`,
  //       right: 30
  //     },
  //     grid: {
  //       left: 0,
  //       right: 0
  //     },
  //     xAxis: {
  //       axisTick: {alignWithLabel: true},
  //       type: 'category',
  //       data: titles,
  //       axisLine: {lineStyle: {color: '#666'}}
  //     },
  //     yAxis: {
  //       type: 'value', show: false
  //     },
  //     series: [{
  //       symbol: 'circle',
  //       itemStyle: {color: '#666', borderColor: '#666'},
  //       symbolSize: 12,
  //       data: totals,
  //       type: 'line'
  //     }],
  //     tooltip: {
  //       show: true, triggerOn: 'click',
  //       backgroundColor: '#999999',
  //       textStyle: {color: '#363636'},
  //       position: 'top',
  //       formatter: '{c}'
  //     }
  //   };
  // }

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


  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  get recordList() {
    return (this.$store.state as RootStore).recordList;
  }
}
</script>
<style scoped lang = "scss">

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
