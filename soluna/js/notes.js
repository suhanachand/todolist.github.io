const notesContainer = document.getElementById('notes-container');
const addPageBtn = document.getElementById('add-page-btn');

addPageBtn.addEventListener('click', () => {
    const pageDiv = document.createElement('div');
    pageDiv.classList.add('page');
    pageDiv.contentEditable = true;
    pageDiv.innerHTML = "<h2>New Page</h2><p>Type your notes here...</p>";
    notesContainer.appendChild(pageDiv);
});
