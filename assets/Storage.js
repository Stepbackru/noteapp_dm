export class Storage {
    static saveToFile(notes) {
        const data = JSON.stringify(notes);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'notes.json';
        link.click();
		
        URL.revokeObjectURL(url);
    }

    static loadFromFile(file, callback) {
        const reader = new FileReader();

        reader.onload = (event) => {
            const notes = JSON.parse(event.target.result);
            callback(notes);
        };

        reader.readAsText(file);
    }
}
