// Global UI: theme toggle, export/import, sign-in placeholders
document.addEventListener('DOMContentLoaded',()=>{
  const themeToggle=document.getElementById('themeToggle');
  const exportBtn=document.getElementById('exportBtn');
  const importBtn=document.getElementById('importBtn');
  const googleSign=document.getElementById('googleSign');
  const saved = localStorage.getItem('sol_mode')||'light';
  applyMode(saved);

  function applyMode(mode){
    document.body.classList.toggle('dark', mode==='dark');
    localStorage.setItem('sol_mode',mode);
    document.getElementById('modeLabel')?.innerText = mode;
  }
  themeToggle?.addEventListener('click',()=> applyMode(document.body.classList.contains('dark')?'light':'dark'));

  exportBtn?.addEventListener('click', ()=>{
    const data = {
      tasks: JSON.parse(localStorage.getItem('sol_tasks')||'[]'),
      pages: JSON.parse(localStorage.getItem('sol_pages')||'[]'),
      routine: JSON.parse(localStorage.getItem('sol_routine')||'[]'),
      habits: JSON.parse(localStorage.getItem('sol_habits')||'[]'),
      mood: localStorage.getItem('sol_mood')||''
    };
    const blob = new Blob([JSON.stringify(data, null,2)],{type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download='soluna-export.json'; a.click(); URL.revokeObjectURL(url);
  });

  importBtn?.addEventListener('click', ()=>{
    const fileInput=document.getElementById('importTasksFile')||document.createElement('input');
    fileInput.type='file'; fileInput.accept='application/json';
    fileInput.onchange = e=>{
      const f=e.target.files[0];
      if(!f) return;
      const r=new FileReader();
      r.onload = evt=>{
        try{
          const d=JSON.parse(evt.target.result);
          if(d.tasks) localStorage.setItem('sol_tasks',JSON.stringify(d.tasks));
          if(d.pages) localStorage.setItem('sol_pages',JSON.stringify(d.pages));
          if(d.routine) localStorage.setItem('sol_routine',JSON.stringify(d.routine));
          if(d.habits) localStorage.setItem('sol_habits',JSON.stringify(d.habits));
          if(d.mood) localStorage.setItem('sol_mood',d.mood);
          alert('Imported!');
          location.reload();
        }catch(err){ alert('Invalid file'); }
      };
      r.readAsText(f);
    };
    fileInput.click();
  });

  googleSign?.addEventListener('click', async ()=>{
    // Client-side Firebase Google Sign In logic in firebase-config.js
    if(window.solunaSignIn) window.solunaSignIn();
    else alert('Firebase not configured. Paste your config in /public/js/firebase-config.js');
  });
});
