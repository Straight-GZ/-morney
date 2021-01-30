import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入标签名');
    this.$store.commit('createTag', name);
  }
}
