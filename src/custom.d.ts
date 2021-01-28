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
  update: (id: string, name: string) => 'duplicate' | 'success';
  remove: (id: string) => boolean;
  save: () => void;
}

interface Window {
  tagList: tag[];
}