<template>
  <div>编辑标签</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

@Component
export default class LabelEdit extends Vue {
  created() {
    const {id} = this.$route.params;
    tagListModel.fetch();
    const tag = tagListModel.data.filter(t => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/404');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>