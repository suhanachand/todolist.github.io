const todoContainer = document.getElementById('todo-container');
const addTodoBtn = document.getElementById('add-todo-btn');

addTodoBtn.addEventListener('click', () => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('todo');
    taskDiv.contentEditable = true;
    taskDiv.innerHTML = "<p>New Task...</p>";
    todoContainer.appendChild(taskDiv);
});
