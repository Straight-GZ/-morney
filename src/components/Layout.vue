<template>
  <div class = "layout-wrapper">
    <div class = "content" :class = "classPrefix&&`${classPrefix}-content`">
      <slot/>
    </div>
    <Nav class = "nav"/>
  </div>
</template>

<script lang = "ts">
export default {
  name: "Layout",
  props: ['classPrefix']
};
</script>

<style lang = "scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  overflow-y: scroll;
}

</style>