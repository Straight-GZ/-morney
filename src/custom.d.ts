type RecordItem = {
  tags: string[];
  type: string;
  notes: string;
  amount: string;
  createdTime?: Date;
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string | null) => 'duplicate' | 'success' | 'space' | undefined;
  update: (id: string, name: string) => 'duplicate' | 'success' | undefined;
  remove: (id: string) => boolean;
  save: () => void;
}


interface Window {
  store: {
    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
    tagList: tag[];
    findTag: (id: string) => Tag | undefined;
    createTag: (name: string) => void;
    removeTag: (id: string) => boolean;
    updateTag: (id: string, name: string) => 'duplicate' | 'success' | undefined;
  };

}