<template>
  <Layout>
    <div class="tags">
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
      <button class="new">添加标签</button>
    </div>
    <div>
      <label class="notes">
        <span>备注</span>
        <input type="text">
      </label></div>
    <div class="types">
      <button>支出</button>
      <button>收入</button>
    </div>
    <div>
      <div class="number"></div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>+</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>-</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>×</button>
        <button>0</button>
        <button>.</button>
        <button>%</button>
        <button>÷</button>
        <button>OK</button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
export default {
  name: "Money",
};
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

</style>