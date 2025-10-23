// Tasks page logic
document.addEventListener('DOMContentLoaded',()=>{
  const container = document.getElementById('tasksContainer');
  const addBtn = document.getElementById('addTaskBtn');
  const titleIn = document.getElementById('taskTitle');
  const tagIn = document.getElementById('taskTag');
  const dueIn = document.getElementById('taskDue');
  const filter = document.getElementById('filterTag');
  function load(){ return JSON.parse(localStorage.getItem('sol_tasks')||'[]'); }
  function save(arr){ localStorage.setItem('sol_tasks',JSON.stringify(arr)); }
  function render(){
    const arr = load();
    container.innerHTML = '';
    arr.forEach((t,i)=>{
      const el = document.createElement('div'); el.className='todo-item';
      const left = document.createElement('div'); left.className='todo-left';
      const cb = document.createElement('input'); cb.type='checkbox'; cb.checked = !!t.done;
      cb.addEventListener('change',()=>{ t.done = cb.checked; if(t.done){ addXP(5); } save(arr); render(); });
      left.appendChild(cb);
      const title = document.createElement('div'); title.textContent = t.title; title.style.fontWeight='700';
      left.appendChild(title);
      if(t.tag){ const tag = document.createElement('div'); tag.className='tag'; tag.textContent=t.tag; left.appendChild(tag); }
      el.appendChild(left);

      const right = document.createElement('div');
      if(t.due){ const d=document.createElement('div'); d.textContent=t.due; d.className='small'; right.appendChild(d); }
      const del = document.createElement('button'); del.className='icon'; del.textContent='✖';
      del.addEventListener('click',()=>{ arr.splice(i,1); save(arr); render(); });
      right.appendChild(del);
      el.appendChild(right);
      container.appendChild(el);
    });
  }
  addBtn.addEventListener('click',()=>{
    const title = titleIn.value.trim(); if(!title) return alert('Add title');
    const arr = load();
    arr.push({title, tag: tagIn.value.trim(), due: dueIn.value, done:false, created:Date.now()});
    save(arr); titleIn.value=''; tagIn.value=''; dueIn.value=''; render();
  });
  filter?.addEventListener('input', render);
  render();

  function addXP(n){ const cur = parseInt(localStorage.getItem('sol_xp')||'0'); localStorage.setItem('sol_xp',String(cur+n)); document.getElementById('xpVal')?.innerText = localStorage.getItem('sol_xp'); }
  document.getElementById('exportTasks')?.addEventListener('click',()=>{ document.getElementById('importTasksFile').click();});
});
