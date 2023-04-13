const textEdit = (text: string) => text.replace(/\"/g, "").split("\\n");

export default textEdit;
