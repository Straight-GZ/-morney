<template>
  <nav>
    <router-link to="/money">
      <Icons name="money"/>
      记账
    </router-link>
    |
    <router-link to="/labels">
      <Icons name="label"/>
      标签
    </router-link>
    |
    <router-link to="/statistics">
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

</style>