import Vue from 'vue';
import Component from 'vue-class-component';

const map: { [key: string]: string } = {
  'duplicate': '标签名重复',
  'space': '标签名不能有空格',
  'success': '创建成功'
};
@Component
export default class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {return; }
    this.$store.commit('createTag', name);
    if (this.$store.state.createTagMessage) {
      window.alert(map[this.$store.state.createTagMessage]);
    }
  }


}


