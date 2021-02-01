type RootStore = {
  createTagMessage?: string;
  createRecordError?: null | Error;
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}
type RecordItem = {
  tags: Tag[];
  type: string;
  notes: string;
  amount: number;
  createdAt: string;
}
type Tag = {
  id: string;
  name: string;
}

