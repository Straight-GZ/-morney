<template>
  <div class="types">
    <button class="selected">支出</button>
    <button>收入</button>
  </div>

</template>

<script lang="ts">
export default {
name: "Types"
}
</script>

<style lang="scss" scoped>
.types {
  display: flex;
  font-size: 24px;

  > button {
    background: #c4c4c4;
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border: none;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      width: 100%;
      background: #333
    }
  }
}

</style>