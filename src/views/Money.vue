<template>
  <Layout class-prefix = "layout">
    <NumberPad :value.sync = "record.amount" @submit = "saveRecord"/>
    <Types :value.sync = "record.type"/>
    <div class = "notes">
      <FormItem name = "备注" placeholder = "请输入备注" :value.sync = "record.notes"/>
    </div>
    <Tags :data-source.sync = "tags" :value.sync = "record.tags"/>
  </Layout>
</template>

<script lang = "ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Types from '@/components/Money/Types.vue';
import {Component} from 'vue-property-decorator';
import store from '@/store/index2.ts';

@Component({
  components: {NumberPad, Types, FormItem, Tags}
})
export default class Money extends Vue {
  tags = store.tagList;
  record: RecordItem = {tags: [], type: '-', notes: '', amount: '0'};
  recordList: RecordItem[] = store.recordList;

  saveRecord() {
    store.createRecord(this.record);
  }
}

</script>
<style lang = "scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>