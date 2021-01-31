<template>
  <div>
    <Layout>
      <Tabs class-prefix = "types" :data-source = "typeList" :value.sync = "type"/>
      <Tabs class-prefix = "interval" :data-source = "intervalList" :value.sync = "interval"/>
      type:{{ type }}
      <br>
      interval:{{ interval }}
      <ol>
        <li v-for = "(group,index) in result" :key = "index">
          <h3 class = 'title'>{{ beautify(group.title) }}</h3>
          <ol>
            <li class = "record" v-for = "item in group.items" :key = "item.id">
              <span>{{ tagString(item.tags) }}</span>
              <span class = "notes">{{ item.notes }}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
    </Layout>
  </div>
</template>
<style lang = "scss" scoped>
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

<script lang = "ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';


@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'd';
  typeList = recordTypeList;
  intervalList = intervalList;

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    console.log(now);
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
    return tags.length === 0 ? '无' : tags.join(',');
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  get recordList() {
    return (this.$store.state as RootStore).recordList;
  }

  get result() {
    const {recordList} = this;
    // type Items = RecordItem[]
    // type HashTableValue = { title: string; items: Items }
    type HashTable = { title: string; items: RecordItem[] }[]
    const hashTable = [{title: []}];
    const newList = clone(recordList).sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf());
    return [];
  }
}
</script>
<style scoped lang = "scss">
::v-deep {
  .types-tabs-item {
    border: 1px solid red;
    background: white;

    &.selected {
      background: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}
</style>