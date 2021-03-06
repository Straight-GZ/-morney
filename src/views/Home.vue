<template>
  <div class = "home">
    <div class = "text">
      <label>
        <select v-model = "year">
          <option v-for = "i in yearMonth.year" :key = "i">{{ i }}</option>
        </select>年
        <select v-model = "month">
          <option v-for = "j in yearMonth.month" :key = "j">{{ j }}</option>
        </select>月
      </label>
      <div>
        <strong style = "color:blue">收入:{{ total.x }}</strong> |
        <strong style = "color:red">支出:{{ total.y }}</strong>
      </div>
    </div>
    <Tabs class-prefix = "map" :data-source = "kindList" :value.sync = "kind"/>
    <div v-if = "kind==='line'" class = "chart-wrapper" ref = "chartWrapper">
      <Chart class = "chart" :options = "chartOptions"/>
    </div>
    <div v-else>
      <label>
        <select v-model = "type">
          <option value = "-">支出</option>
          <option value = "+">收入</option>
        </select>
      </label>
      <Chart :options = "y"/>

    </div>
    <Button @click = "x">记一笔</Button>
  </div>
</template>

<script lang = "ts">
// @ is an alias to /src
import {Component, Mixins} from 'vue-property-decorator';

import Button from '@/components/Button.vue';
import RecordHelper from '@/mixins/RecordHelper';
import clone from '@/lib/clone';
import dayjs from 'dayjs';
import Chart from '@/components/Chart.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs, FormItem, Chart, Button}
})
export default class Home extends Mixins(RecordHelper) {
  type = '-';
  typeList = recordTypeList;
  kind = 'line';
  kindList = [{text: '走势图', value: 'line'}, {text: '饼图', value: 'pie'}];
  date = dayjs(new Date()).format('YYYY-MM');
  year = dayjs(this.date).format('YYYY');
  month = dayjs(this.date).format('M');

  get yearMonth() {
    const year = [];
    const month = [];
    for (let i = new Date().getFullYear(); i > 2000; i--) {
      year.push(i);
    }
    for (let i = 12; i >= 1; i--) {
      month.push(i);
    }
    return {year, month};
  }

  get total() {
    const records = this.cloneRecords.filter(i => dayjs(i.createdAt).isSame(dayjs(this.year + this.month), 'month'));
    let x = 0;
    let y = 0;
    for (let i = 0; i < records.length; i++) {
      if (records[i].type === '+') {
        x += records[i].amount;
      } else {
        y += records[i].amount;
      }
    }
    return {x, y};
  }

  get cloneRecords() {
    return (clone(this.recordList) as RecordItem[]);
  }

  x() {
    this.$router.push('/money');
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  get recordList() {
    return this.$store.state.recordList;
  }


  get y() {
    this.$store.commit('fetchTags');
    const newList = (clone(this.recordList) as RecordItem[]).filter(i => i.type === this.type)
      .filter(i => dayjs(i.createdAt).isSame(dayjs(new Date()), 'month'))
      .sort((b, a) => {return a.tags[0].name.charCodeAt(0) - b.tags[0].name.charCodeAt(0);});
    let result = [{value: 0, name: ''}];
    if (newList[0]) {
      result = [{value: newList[0].amount, name: newList[0].tags[0].name}];
    }
    for (let i = 1; i < newList.length; i++) {
      const last = result[result.length - 1];
      const current = newList[i];
      if (current.tags[0].name === last.name) {
        last.value += current.amount;
      } else {
        result.push({value: newList[i].amount, name: newList[i].tags[0].name});
      }
    }
    return {
      title: {
        text: `各项${this.type === '-' ? '支出' : '收入'}占比`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '支出',
          type: 'pie',
          radius: '50%',
          data: result,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  get chartOptions() {

    const {totals: totalsS} = this.keyValueList(this.recordList, '-', 29);
    const {titles: titlesA, totals: totalsA} = this.keyValueList(this.recordList, '+', 29);

    return {
      grid: {left: '1%', right: '1%'},
      title: {
        text: '30日收支趋势对比',
        right: 30
      },
      tooltip: {
        trigger: 'axis',
        show: true,
        position: 'top',
      },
      legend: {
        data: ['收入', '支出'],
        right: 240,
        top: 40
      },
      toolbox: {
        show: false
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: titlesA,
      },
      yAxis: {show: false},
      series: [
        {
          symbol: 'circle',
          itemStyle: {color: 'blue', borderColor: 'blue'},
          symbolSize: 12,
          name: '收入',
          type: 'line',
          data: totalsA
        },
        {
          symbol: 'rect',
          itemStyle: {color: 'red', borderColor: 'red'},
          symbolSize: 12,
          name: '支出',
          type: 'line',
          data: totalsS
        },

      ],
    };
  }
}


</script>
<style scoped lang = "scss">
.home {
  > .text {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fad956;
    > label {
      > select {
        background: black;
        color: white;
        font-size: 20px
      }
    }
  }
  > .notes {
    background: #ff4;
    padding: 16px 200px 16px 0;
  }
  .chart {
    width: 430%;
    &-wrapper {
      direction: rtl;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
.chart {
  width: 430%;
  &-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}


</style>