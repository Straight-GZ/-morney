<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount"/>
    <Types :value.sync="record.type"/>
    <Notes :value.sync="record.notes"/>
    <Tags :data-source.sync="tags" :value.sync="record.tags"/>
    {{ record }}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import {Component} from 'vue-property-decorator';

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

  record: Record = {tags: [], type: '+', notes: '', amount: '0'};

}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>