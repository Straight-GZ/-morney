const key = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  clone(data: RecordItem | RecordItem[]) { return JSON.parse(JSON.stringify(data));},
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(key) || '[]') as RecordItem[];
    return this.data;
  },

  save() {
    return window.localStorage.setItem(key, JSON.stringify(this.data));
  }
};
export default recordListModel;