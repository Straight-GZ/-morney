import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const myStore = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: {
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      // if (this.data.length === 0) {this.data = [{id: '衣', name: '衣'}];}
    },
    createTag(state, name: string) {
      const names = state.tagList.map(d => d.name);
      if (name && names.indexOf(name) >= 0) {
        window.alert('标签名重复');
      } else if (!name) {
        window.alert('不存在');
      } else if (name && name.indexOf(" ") >= 0) {
        window.alert('标签名不能有空格');
      } else {
        const id = createId().toString();
        state.tagList.push({id: id, name: name});
        myStore.commit('saveTags');
        window.alert('创建成功');
      }
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const newRecord: RecordItem = clone(record);
      newRecord.createdTime = new Date();
      state.recordList?.push(newRecord);
      myStore.commit('saveRecord');
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    }
  },
});
export default myStore;