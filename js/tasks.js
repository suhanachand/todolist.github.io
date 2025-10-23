const tasksContainer = document.getElementById('tasksContainer');
const addTaskBtn = document.getElementById('addTaskBtn');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasksContainer.innerHTML = '';
  tasks.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `
      <input type="checkbox" ${t.done ? 'checked' : ''} data-id="${i}">
      <span>${t.title} [${t.tag}] - ${t.due || ''}</span>
      <button class="delTask" data-id="${i}">❌</button>
    `;
    tasksContainer.appendChild(div);
  });
  document.querySelectorAll('.task input[type="checkbox"]').forEach(cb=>{
    cb.addEventListener('change', e=>{
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks[cb.dataset.id].done = cb.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  });
  document.querySelectorAll('.delTask').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.splice(btn.dataset.id,1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
    });
  });
}

addTaskBtn?.addEventListener('click', () => {
  const title = document.getElementById('taskTitle').value.trim();
  const tag = document.getElementById('taskTag').value.trim();
  const due = document.getElementById('taskDue').value;
  if(!title) return alert('Add a title!');
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push({title, tag, due, done:false});
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
  document.getElementById('taskTitle').value='';
  document.getElementById('taskTag').value='';
  document.getElementById('taskDue').value='';
});

loadTasks();
