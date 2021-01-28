import createId from '@/lib/createId';

const key = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string | null) => 'duplicate' | 'success' | 'space' | undefined;
  update: (id: string, name: string) => 'duplicate' | 'success';
  remove: (id: string) => boolean;
  save: () => void;
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(key) || '[]');
    // if (this.data.length === 0) {this.data = [{id: '衣', name: '衣'}];}
    return this.data;
  },

  create(name) {
    console.log('create');
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
    const item = this.data.filter(d => d.id === id)[0];
    const names = this.data.map(d => d.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicate';
    } else {
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
        break;
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