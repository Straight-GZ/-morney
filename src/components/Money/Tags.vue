<template>
  <div class = "tags">
    <div class = "new" @click = "create">
      <button>添加标签</button>
    </div>
    <ul class = "current">
      <li v-for = "tag in tagList" :class = "{selected:selectedTags.indexOf(tag)>=0}" @click = "toggle(tag)"
          :key = "tag.id">{{ tag.name }}
      </li>
    </ul>
  </div>

</template>

<script lang = "ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import store from '@/store/index2';

@Component
export default class Tags extends Vue {
  @Prop(Array) readonly value!: Tag[];
  selectedTags: Tag[] = this.value;
  tagList = store.fetchTags();

  create() {
    const name = window.prompt('请输入标签');
    if (name) {
      store.createTag(name);
    }
  }


  toggle(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);
    if (this.selectedTags.indexOf(tag) >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }
}
</script>

<style lang = "scss" scoped>
.tags {
  background: white;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      margin-top: 4px;
      $h: 24px;
      $bg: #d9d9d9;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      background: $bg;
      margin-right: 12px;
      padding: 0 16px;

      &.selected {
        background: darken($bg, 50%);
        color: white
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      border: none;
      background: transparent;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 4px;
    }
  }
}

</style>