import { Note } from './Note.js';

class NoteManager {
    constructor() {
        let savedNotes = localStorage.getItem('notes_dm');

        // Если в localStorage есть сохранённые заметки
        if (savedNotes !== null) {
            // Превращаю их из JSON обратно в массив
            let parsedNotes = JSON.parse(savedNotes);
            this.notes = [];

            // Использую цикл for для перебора каждой заметки
            for (let i = 0; i < parsedNotes.length; i++) {
                let noteData = parsedNotes[i];
                // Создаю новый объект Note для каждой заметки и добавляю его в массив
                let note = new Note(noteData.content, noteData.timestamp);
                this.notes.push(note);
            }
        } else {
            // Если в localStorage ничего нет, просто создаю пустой массив
            this.notes = [];
        }
    }

    addNote(content) {
        const note = new Note(content);
        this.notes.push(note);
        this.saveNotes();
    }

    deleteNote(index) {
		// Новый массив, в который будем добавлять все заметки, кроме той, которую нужно удалить
		let newNotes = [];
	
		// Прохожу через все заметки с помощью цикла for
		for (let i = 0; i < this.notes.length; i++) {
			// Если индекс текущей заметки не равен тому, что нужно удалить, добавляю в новый массив
			if (i !== index) {
				newNotes.push(this.notes[i]);
			}
		}
	
		// Присваиваю новый массив старому
		this.notes = newNotes;
	
		// Сохраняю изменения
		this.saveNotes();
    }

    getNotes() {
        return this.notes;
    }

    saveNotes() {
        localStorage.setItem('notes_dm', JSON.stringify(this.notes));
    }

    loadNotesFromJson(notesArray) {
		this.notes = [];

		// Использую цикл for для перебора массива заметок
		for (let i = 0; i < notesArray.length; i++) {
			let noteData = notesArray[i];
	
			// Создаю новый объект Note для каждой заметки
			let note = new Note(noteData.content);
	
			// Присваиваю объекту Note дату из noteData
			note.timestamp = new Date(noteData.timestamp);
	
			// Добавляю заметку в массив
			this.notes.push(note);
		}

        this.saveNotes();
    }
}

export const noteManager = new NoteManager();
