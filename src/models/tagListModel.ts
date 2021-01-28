const key = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string | null) => 'duplicate' | 'success' | 'space' | undefined;
  update: (id: string, name: string) => string;
  remove: (id: string) => string;
  save: () => void;
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(key) || '[]');
    if (this.data.length === 0) {this.data = [{id: '衣', name: '衣'}];}
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
      this.data.push({id: name, name: name});
      this.save();
      return 'success';
    }
  },
  update(id: string, name: string) {
    const item = this.data.filter(d => d.id === id)[0];
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
    const item = this.data.filter(d => d.id === id)[0];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === item.id) {
        console.log(this.data.splice(i, 1))
      }
    }
    return 'success';
  },
  save() {
    return window.localStorage.setItem(key, JSON.stringify(this.data));
  }
};
export default tagListModel;