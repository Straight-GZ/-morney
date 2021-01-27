<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem name="备注" placeholder="请输入备注" :value.sync="record.notes"/>
    </div>
    <Tags :data-source.sync="tags" :value.sync="record.tags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Types from '@/components/Money/Types.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
@Component({
  components: {NumberPad, Types, FormItem, Tags}
})
export default class Money extends Vue {
  tags = tagList;
  record: RecordItem = {tags: [], type: '-', notes: '', amount: '0'};
  recordList: RecordItem[] = recordList;

  saveRecord() {
    const newRecord: RecordItem = recordListModel.clone(this.record);
    newRecord.createdTime = new Date();
    this.recordList.push(newRecord);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>