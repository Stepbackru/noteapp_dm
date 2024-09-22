import { noteManager } from './assets/NoteManager.js';
import { renderNotes } from './assets/renderNotes.js';
import { Storage } from './assets/Storage.js';

// Когда загрузится страница, я добавляю обработчики событий
window.onload = function() {
    // Получаю ссылки на элементы страницы
	let noteInput = document.querySelector('.note__textarea');
    let noteForm = document.querySelector('.note__form');
    let noteList = document.querySelector('.note__list');
    let saveButton = document.querySelector('.note__save');
    let loadInput = document.querySelector('#note__load');

    // Рендерю заметки при загрузке
    renderNotes(noteManager.getNotes());

    // Обработчик на добавление заметки
    noteForm.addEventListener('submit', (event) => {
		event.preventDefault(); // Запрещаю действие формы по умолчанию (чтобы не пыталось отправлять данные)
		let content = noteInput.value.trim(); // убираю пробелы сначала и с конца строки
	
		if (!content) return;
	
		noteManager.addNote(content);
		noteInput.value = '';
		renderNotes(noteManager.getNotes());
	});

    // Обработчик для сохранения в файл
    saveButton.addEventListener('click', function () {
		Storage.saveToFile(noteManager.getNotes());
	});

    // Обработчик для загрузки заметок из файла
    loadInput.addEventListener('change', (event) => {
		let file = event.target.files[0];
		
		if (file) {
			Storage.loadFromFile(file, (loadedNotes) => {
				noteManager.loadNotesFromJson(loadedNotes);
				renderNotes(noteManager.getNotes());
			});
		}
	});

    // Обработчик для удаления заметок
    noteList.addEventListener('click', function (event) {
		if (event.target.classList.contains('note__delete')) { // проверяю есть ли у нажатой кнопки класс note__delete
			let index = event.target.getAttribute('data-index'); // из аттрибута элемента достаю index элемента в массиве
			noteManager.deleteNote(index); // даю команду менеджеру заметок удалить заметку
			renderNotes(noteManager.getNotes()); // снова рисую новый список заметок
		}
	});
};