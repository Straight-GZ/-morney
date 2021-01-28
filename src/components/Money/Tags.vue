<template>
  <div class="tags">
    <div class="new" @click="addTag">
      <button>添加标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :class="{selected:selectedTags.indexOf(tag)>=0}" @click="toggle(tag)"
          :key="tag.id">{{ tag.name }}
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop(Array) readonly dataSource: string[] | undefined;
  @Prop(Array) readonly value!: string[];
  selectedTags: string[] = this.value;

  addTag() {
    const name = window.prompt('请输入标签');
    if (name) {
      window.createTag(name);
    }
  }


  toggle(item: string) {
    const index = this.selectedTags.indexOf(item);
    if (this.selectedTags.indexOf(item) >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(item);
    }
    this.$emit('update:value', this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
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