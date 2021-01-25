<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes :value.sync="record.notes"/>
    <Tags :data-source.sync="tags" :value.sync="record.tags"/>
    {{ record }}
    <hr>
    {{ recordList }}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import {Component, Watch} from 'vue-property-decorator';

type Record = {
  tags: string[];
  type: string;
  notes: string;
  amount: string;
}
@Component({
  components: {NumberPad, Types, Notes, Tags}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  record: Record = {tags: [], type: '-', notes: '', amount: '0'};
  recordList: Record[] = [];

  saveRecord() {
    const newRecord = JSON.parse(JSON.stringify(this.record));
    this.recordList.push(newRecord);
  }

  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>