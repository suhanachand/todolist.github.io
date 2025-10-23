document.addEventListener('DOMContentLoaded', ()=>{
  const container = document.getElementById('tasksContainer');
  const addBtn = document.getElementById('addTaskBtn');
  const titleIn = document.getElementById('taskTitle');
  const tagIn = document.getElementById('taskTag');
  const dueIn = document.getElementById('taskDue');
  const importFile = document.getElementById('importTasksFile');

  function load(){ return JSON.parse(localStorage.getItem('sol_tasks')||'[]'); }
  function save(arr){ localStorage.setItem('sol_tasks', JSON.stringify(arr)); }
  function render(){
    const arr = load();
    container.innerHTML = '';
    if(arr.length===0){ container.innerHTML = '<div class="small-muted">No tasks yet.</div>'; return; }
    arr.forEach((t,i)=>{
      const el = document.createElement('div'); el.className='todo-item';
      const left = document.createElement('div'); left.className='todo-left';
      const cb = document.createElement('input'); cb.type='checkbox'; cb.checked = !!t.done;
      cb.addEventListener('change', ()=>{ t.done = cb.checked; save(arr); if(cb.checked) addXP(5); render(); });
      left.appendChild(cb);
      const title = document.createElement('div'); title.textContent = t.title; title.style.fontWeight='700';
      left.appendChild(title);
      if(t.tag){ const tag = document.createElement('div'); tag.className='tag'; tag.textContent = t.tag; left.appendChild(tag); }
      el.appendChild(left);

      const right = document.createElement('div');
      if(t.due){ const d = document.createElement('div'); d.className='small'; d.textContent = t.due; right.appendChild(d); }
      const del = document.createElement('button'); del.className='icon-btn'; del.textContent='✖';
      del.addEventListener('click', ()=>{ if(confirm('Delete task?')){ arr.splice(i,1); save(arr); render(); } });
      right.appendChild(del);
      el.appendChild(right);
      container.appendChild(el);
    });
  }

  addBtn.addEventListener('click', ()=>{
    const title = titleIn.value.trim(); if(!title) return alert('Add a title');
    const arr = load();
    arr.push({title, tag: tagIn.value.trim(), due: dueIn.value, done:false, created: Date.now()});
    save(arr);
    titleIn.value=''; tagIn.value=''; dueIn.value='';
    render();
  });

  document.getElementById('exportTasksBtn')?.addEventListener('click', ()=> {
    const arr = load();
    const blob = new Blob([JSON.stringify(arr,null,2)],{type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='soluna-tasks.json'; a.click(); URL.revokeObjectURL(url);
  });

  document.getElementById('importTasksFile')?.addEventListener('change', e => {
    const f = e.target.files[0]; if(!f) return;
    const r = new FileReader();
    r.onload = evt => {
      try{
        const parsed = JSON.parse(evt.target.result);
        if(Array.isArray(parsed)){ localStorage.setItem('sol_tasks', JSON.stringify(parsed)); render(); alert('Imported tasks'); }
        else alert('Invalid format');
      }catch(err){ alert('Invalid file'); }
    };
    r.readAsText(f);
  });

  function addXP(n){ const cur = parseInt(localStorage.getItem('sol_xp')||'0'); localStorage.setItem('sol_xp',String(cur+n)); document.getElementById('xpVal')?.innerText = localStorage.getItem('sol_xp'); }
  render();
});
