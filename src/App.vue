<template>
  <div id = "app">
    <router-view/>
  </div>
</template>

<style lang = "scss">
@import '~@/assets/style/reset.scss';
@import "~@/assets/style/helper.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  font-family: $font-hei;
  color: #333;
  font-size: 16px;
  background: #f4f4f4;
  touch-action: pan-x pan-y;
  -webkit-text-size-adjust: none;
}

#app {
  max-width: 500px;
  margin: 0 auto;
}
</style>
