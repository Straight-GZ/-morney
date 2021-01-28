import clone from '@/lib/clone';

const key = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(key) || '[]') as RecordItem[];
    return this.data;
  },
  create(record: RecordItem) {
    const newRecord: RecordItem = clone(record);
    newRecord.createdTime = new Date();
    this.data.push(newRecord);
  },
  save() {
    return window.localStorage.setItem(key, JSON.stringify(this.data));
  }
};
export default recordListModel;