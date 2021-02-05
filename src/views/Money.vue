<template>
  <Layout class-prefix = "layout">
    <NumberPad :value.sync = "record.amount" @submit = "saveRecord"/>
    <Tabs :data-source = "recordTypeList" :value.sync = "record.type"/>
    <div class = "notes">
      <FormItem name = "备注" placeholder = "请输入备注" :value.sync = "record.notes"/>
    </div>
    <div class = "notes">
      <FormItem name = "日期" type = "date" placeholder = "请输入日期" :value.sync = "record.createdAt"/>
    </div>
    <div class = "tags-wrapper">
      <Tags :value.sync = "record.tags"/>
    </div>
  </Layout>
</template>

<script lang = "ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';


@Component({
  components: {Tabs, NumberPad, FormItem, Tags},
})

export default class Money extends Vue {

  record: RecordItem = {tags: [], type: '-', notes: '', amount: 0, createdAt: new Date().toISOString()};
  recordTypeList = recordTypeList;

  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    this.$store.commit('fetchRecords');
  }


  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    if (this.record.amount === 0) {
      const bool = window.confirm('金额为0，确定?');
      if (!bool) { return; }
    }
    this.$store.commit('createRecord', this.record);
    window.alert('已保存');
    this.record.notes = '';
    this.record.tags = [];
  }
}

</script>
<style scoped lang = "scss">
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}


</style>