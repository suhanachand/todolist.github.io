// DOM Elements
const taskInput = document.getElementById('new-task');
const addBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const modeToggle = document.getElementById('mode-toggle');

// Load saved mode
if(localStorage.getItem('mode')) {
    document.body.className = localStorage.getItem('mode');
}

// Toggle light/dark mode
modeToggle.addEventListener('click', () => {
    if(document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('mode', 'light');
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('mode', 'dark');
    }
});

// Add task
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = '✖';
        delBtn.addEventListener('click', () => li.remove());
        li.appendChild(delBtn);

        taskList.appendChild(li);
        taskInput.value = '';
    }
});

// Optional: add task on Enter
taskInput.addEventListener('keypress', e => {
    if(e.key === 'Enter') addBtn.click();
});
