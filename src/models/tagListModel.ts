import createId from '@/lib/createId';
import store from '@/store/index2';

const key = 'tagList';

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(key) || '[]');
    // if (this.data.length === 0) {this.data = [{id: '衣', name: '衣'}];}
    return this.data;
  },

  create(name) {
    const names = this.data.map(d => d.name);
    if (name && names.indexOf(name) >= 0) {
      return 'duplicate';
    } else if (!name) {
      return;
    } else if (name && name.indexOf(" ") >= 0) {
      return 'space';
    } else {
      const id = createId().toString();
      this.data.push({id: id, name: name});
      this.save();
      return 'success';
    }
  },
  update(id: string, name: string) {
    const item = store.findTag(id);
    const names = this.data.map(d => d.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicate';
    } else if (item) {
      item.name = name;
      this.save();
      return 'success';
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },
  save() {
    return window.localStorage.setItem(key, JSON.stringify(this.data));
  }
};
export default tagListModel;