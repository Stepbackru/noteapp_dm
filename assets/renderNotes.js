export const renderNotes = (notes) => {
    const noteList = document.querySelector('.note__list');
	
	noteList.innerHTML = notes.map((note, index) => `
		<li>
			${note.format()}
			<button class="note__delete" data-index="${index}">Удалить</button>
		</li>
	`).join('');
};
