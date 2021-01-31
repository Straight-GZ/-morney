type RootStore = {
	recordList: RecordItem[];
	tagList: Tag[];
	currentTag?: Tag;
}
type RecordItem = {
	tags: Tag[];
	type: string;
	notes: string;
	amount: string;
	createdAt: string;
}
type Tag = {
	id: string;
	name: string;
}

