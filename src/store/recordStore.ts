import clone from '@/lib/clone';

const key = 'recordList';
const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(key) || '[]') as RecordItem[];
    return this.recordList;
  },
  createRecord(record: RecordItem) {
    const newRecord: RecordItem = clone(record);
    newRecord.createdTime = new Date();
    this.recordList?.push(newRecord);
    this.saveRecord();
  },
  saveRecord() {
    return window.localStorage.setItem(key, JSON.stringify(this.recordList));
  }
};
recordStore.fetchRecords();
export default recordStore;