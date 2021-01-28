import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icons from '@/components/Icons.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icons', Icons);

window.tagList = tagListModel.fetch();
window.createTag = () => {

  const message = tagListModel.create(name);
  if (message === 'success') {
    window.alert('创建成功');
  } else if (message === 'duplicate') {
    window.alert('标签名重复');
  } else if (message === 'space') {
    window.alert('标签名不能有空格');
  }
};


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
