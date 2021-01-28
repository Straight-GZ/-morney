import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),

  //tag store
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter(d => d.id === id)[0];
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'success') {
      window.alert('创建成功');
    } else if (message === 'duplicate') {
      window.alert('标签名重复');
    } else if (message === 'space') {
      window.alert('标签名不能有空格');
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  }
};
export default store;