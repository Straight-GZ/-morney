import createId from '@/lib/createId';

const key = 'tagList';

const tagStore = {
  //tag store
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(key) || '[]');
    // if (this.data.length === 0) {this.data = [{id: '衣', name: '衣'}];}
    return this.tagList;
  },

  findTag(id: string) {
    return this.tagList.filter(d => d.id === id)[0];
  },
  createTag(name: string) {
    const names = this.tagList.map(d => d.name);
    if (name && names.indexOf(name) >= 0) {
      window.alert('标签名重复');
      return 'duplicate';
    } else if (!name) {
      return;
    } else if (name && name.indexOf(" ") >= 0) {
      window.alert('标签名不能有空格');
      return 'space';
    } else {
      const id = createId().toString();
      this.tagList.push({id: id, name: name});
      this.saveTags();
      window.alert('创建成功');
      return 'success';
    }
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },
  updateTag(id: string, name: string) {
    const item = this.findTag(id);
    const names = this.tagList.map(d => d.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicate';
    } else if (item) {
      item.name = name;
      this.saveTags();
      return 'success';
    }
  },
  saveTags() {
    return window.localStorage.setItem(key, JSON.stringify(this.tagList));
  }
};
tagStore.fetchTags();
export default tagStore;