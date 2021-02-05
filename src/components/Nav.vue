<template>
  <nav>
    <router-link class = 'item' active-class = "selected" to = "/money">
      <Icons name = "money"/>
      记账
    </router-link>

    <router-link class = 'item' active-class = "selected" to = "/labels">
      <Icons name = "label"/>
      标签
    </router-link>

    <router-link class = "item" active-class = "selected" to = "/home">
      <Icons name = "statistics"/>
      图表
    </router-link>
    <router-link class = "item" active-class = "selected" to = "/Statistics">
      <Icons name = "detail"/>
      明细
    </router-link>
  </nav>
</template>

<script lang = "ts">

export default {
  name: "Nav"
};
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  @extend %outerShadow;
  display: flex;
  font-size: 12px;
  flex-direction: row;

  > .item {
    padding: 2px;
    width: 33.33333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon {
      width: 32px;
      height: 32px;
    }
  }

  > .item.selected {
    color: $color-highlight;
  }
}
</style>