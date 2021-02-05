import clone from '@/lib/clone';
import dayjs from 'dayjs';
import Component from 'vue-class-component';
import Vue from 'vue';
import _ from 'lodash';

@Component
export default class RecordHelper extends Vue {
  groupList(recordList: RecordItem[], string: string) {
    type Result = {
      title: string;
      items: RecordItem[];
      total?: number;
    }[]
    const newList = clone(recordList).filter(item => item.type === string).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

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

  keyValueList(recordList: RecordItem[], string: string, number: number) {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= number; i++) {
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.groupList(recordList, string), {title: dateString});
      array.push({title: dateString.substr(5), total: found ? found.total : 0});
    }
    array.reverse();
    const titles = array.map(item => item.title);
    const totals = array.map(item => item.total);
    return {titles, totals};
  }


}