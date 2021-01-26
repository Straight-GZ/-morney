const key = 'tagList';
type TagListModel = {
  data: string[];
  fetch: () => string[];
  create: (name: string | null) => 'duplicate' | 'success' | 'space' | undefined;
  save: () => void;
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(key) || '[]');
    if (this.data.length === 0) {this.data = ['衣', '食', '住', '行'];}
    console.log(this.data);
    return this.data;
  },

  create(name) {
    if (name && this.data.indexOf(name) >= 0) {
      return 'duplicate';
    } else if (!name) {
      return;
    } else if (name && name.indexOf(" ") >= 0) {
      return 'space';
    } else {
      this.data.push(name);
      this.save();
      return 'success';
    }
  },
  save() {
    return window.localStorage.setItem(key, JSON.stringify(this.data));
  }
};
export default tagListModel;