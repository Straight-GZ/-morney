<template>
  <div>
    <div class = "navBar">
      <Icons @click.native = "goBack" class = "leftIcon" name = "left"/>
      <span class = "title">编辑标签</span>
      <span class = "rightIcon"></span>
    </div>
    <div class = "formContainer">
      <FormItem @update:value = "update"
                :value = "tag.name"
                name = "标签名" placeholder = "请输入新的标签名"/>
    </div>
    <Button @click = "remove">删除标签</Button>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
import store from '@/store/index2';

@Component({
  components: {Button, FormItem}
})
export default class LabelEdit extends Vue {
  tag?: { id: string; name: string } = undefined;

  created() {
    this.tag = store.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      store.updateTag(this.tag.id, name);
    }
  }

  remove() {
    if (this.tag) {
      const bool = store.removeTag(this.tag.id);
      if (bool) {
        window.alert('删除成功');
        this.$router.back();
      }
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang = "scss" scoped>
.navBar {
  background: white;
  padding: 16px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .title {
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.formContainer {
  margin-top: 8px;
  padding: 2px 0;
  background: white;
}
</style>