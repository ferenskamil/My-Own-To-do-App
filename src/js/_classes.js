class Task {
	constructor(textValue) {
		this.id = Date.now();
		this.text = textValue;
		this.isDone = false;
	}
}

export default Task