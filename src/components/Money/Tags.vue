<template>
  <div class = "tags">
    <div class = "new" @click = "createTag">
      <button>添加标签</button>
    </div>
    <ul class = "current">
      <li v-for = "tag in tagList" :class = "{selected:value.indexOf(tag)>=0}" @click = "toggle(tag)"
          :key = "tag.id">{{ tag.name }}
      </li>
    </ul>
  </div>

</template>

<script lang = "ts">
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/mixins';

@Component
export default class Tags extends mixins(TagHelper) {
  @Prop() value!: Tag[];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: Tag) {
    const index = this.value.indexOf(tag);
    if (this.value.indexOf(tag) >= 0) {
      this.value.splice(index, 1);
    } else {
      this.value.push(tag);
    }
    this.$emit('update:value', this.value);
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