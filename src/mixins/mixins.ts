// mixins.js
import Vue from 'vue';
import Component from 'vue-class-component';

// You can declare mixins as the same style as components.
@Component
export default class CreateTag extends Vue {
  createTag() {
    console.log('mixins');
    const name = window.prompt('请输入标签名');
    this.$store.commit('createTag', name);
  }
}
