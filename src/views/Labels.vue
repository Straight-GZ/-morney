<template>
  <Layout>
    <div class="tags">
      <RouterLink class="tag" :to="`./labels/edit/${tag.id}`"
                  v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icons name="right"/>
      </RouterLink>
    </div>
    <Button @click="createTag">新建标签</Button>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import Button from '@/components/Button.vue';

@Component({
  components: {Button}
})
export default class Labels extends Vue {
  tags = window.tagList;

  createTag() {
    const name = window.prompt('请输入标签名');
    const message = tagListModel.create(name);
    if (message === 'success') {
      window.alert('创建成功');
    } else if (message === 'duplicate') {
      window.alert('标签名重复');
    } else if (message === 'space') {
      window.alert('标签名不能有空格');
    }
  }
}

</script>
<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    min-height: 44px;
    align-items: center;
    padding-right: 16px;
    border-bottom: 1px solid #999999;
    display: flex;
    justify-content: space-between;

    > svg {
      width: 18px;
      height: 18px;
      color: #666;
    }
  }
}

</style>