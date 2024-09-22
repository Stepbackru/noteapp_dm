export class Note {
    constructor(content, timestamp) {
        this.content = content;

		// при создании экземпляра класса заметки если ей в конструктор передали время создания, то высчитываем его, если нет, то текущая дата
		if (timestamp) {
			this.timestamp = new Date(timestamp);
		} else {
			this.timestamp = new Date();
		}
    }

	// метод формат возвращает заметку в том виде, в котором я хочу ее отобразить
    format() {
        return `${this.timestamp.toLocaleString()}: ${this.content}`;
    }
}
