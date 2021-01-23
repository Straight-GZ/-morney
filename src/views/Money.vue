<template>
  <Layout class-prefix="layout">
    <div class="numberPad">
      <div class="output">100</div>
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
        <button class="ok">OK</button>
        <button>.</button>
        <button>0</button>
        <button>%</button>
        <button>÷</button>
      </div>
    </div>
    <div class="types">
      <button class="selected">支出</button>
      <button>收入</button>
    </div>
    <div>
      <label class="notes">
        <span>备注</span>
        <input type="text" placeholder="在这里输入备注">
      </label>
    </div>
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
  </Layout>
</template>

<script lang="ts">
export default {
  name: "Money",
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

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

.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: flex;
  align-items: center;

  > span {
    padding: 0 16px;
  }

  > input {
    background: transparent;
    padding: 16px 0;
    flex-grow: 1;
    border: none;
  }
}

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

.numberPad {
  > .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    text-align: right;
    padding: 9px 16px;
  }

  > .buttons {
    @extend %clearFix;

    > button {
      width: 20%;
      height: 64px;
      float: left;
      border: none;
      background: transparent;

      &.ok {
        height: 64*2px;
        float: right;
      }

      $bg: #f2f2f2;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(6) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(7), &:nth-child(11) {
        background: darken($bg, 4*2%);
      }

      &:nth-child(4), &:nth-child(8), &:nth-child(12), &:nth-child(16) {
        background: darken($bg, 4*3%);
      }

      &:nth-child(5), &:nth-child(9), &:nth-child(13), &:nth-child(17) {
        background: darken($bg, 4*4%);
      }

      &:nth-child(10), &:nth-child(14), &:nth-child(18) {
        background: darken($bg, 4*5%);
      }

      &:nth-child(19) {
        background: darken($bg, 4*6%);
      }

      &:nth-child(15) {
        background: darken($bg, 4*7%);
      }
    }
  }
}
</style>