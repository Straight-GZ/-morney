<template>
  <nav>
    <router-link class='item' active-class="selected" to="/money">
      <Icons name="money"/>
      记账
    </router-link>

    <router-link class='item' active-class="selected" to="/labels">
      <Icons name="label"/>
      标签
    </router-link>

    <router-link class="item" active-class="selected" to="/statistics">
      <Icons name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">

export default {
  name: "Nav"
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  box-shadow: 0 0 3px rgb(0, 0, 0, 0.2);
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
  >.item.selected{
    color:red;
  }
}
</style>