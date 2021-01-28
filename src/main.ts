import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icons from '@/components/Icons.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icons', Icons);

window.recordList = recordListModel.fetch();
window.createRecord = (record) => recordListModel.create(record);
//tag store
window.tagList = tagListModel.fetch();
window.findTag = (id: string) => {
  return window.tagList.filter(d => d.id === id)[0];
};
window.createTag = (name) => {
  const message = tagListModel.create(name);
  if (message === 'success') {
    window.alert('创建成功');
  } else if (message === 'duplicate') {
    window.alert('标签名重复');
  } else if (message === 'space') {
    window.alert('标签名不能有空格');
  }
};
window.removeTag = (id: string) => {
  return tagListModel.remove(id);
};
window.updateTag = (id: string, name: string) => {
  return tagListModel.update(id, name);
};


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
