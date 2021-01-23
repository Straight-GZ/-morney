<template>
  <div class="tags">

    <div class="new">
      <button>添加标签</button>
    </div>
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
  </div>

</template>

<script lang="ts">
export default {
name: "Tags"
}
</script>

<style lang="scss" scoped>
.tags {
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
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      background: #d9d9d9;
      margin-right: 12px;
      padding: 0 16px;
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