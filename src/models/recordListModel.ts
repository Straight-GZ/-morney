const key = 'recordList';
const recordListModel = {
  clone(data: RecordItem | RecordItem[]) { return JSON.parse(JSON.stringify(data));},
  fetch() {return JSON.parse(window.localStorage.getItem(key) || '[]') as RecordItem[]; },

  save(data: RecordItem[]) {
    return window.localStorage.setItem(key, JSON.stringify(data));
  }
};
export default recordListModel;