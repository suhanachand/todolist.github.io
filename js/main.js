// main UI: theme, export/import, sign-in wiring
document.addEventListener('DOMContentLoaded', ()=> {
  // theme
  const saved = localStorage.getItem('sol_mode') || 'light';
  applyMode(saved);
  function applyMode(m){
    document.body.classList.toggle('dark', m==='dark');
    document.getElementById('modeLabel')?.innerText = m;
    localStorage.setItem('sol_mode', m);
  }

  // hook all theme buttons
  document.querySelectorAll('[id^=themeToggle]').forEach(btn=>btn.addEventListener('click', ()=>{
    applyMode(document.body.classList.contains('dark') ? 'light' : 'dark');
  }));

  // export/import (global)
  document.querySelectorAll('[id^=exportBtn]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const data = {
        tasks: JSON.parse(localStorage.getItem('sol_tasks')||'[]'),
        pages: JSON.parse(localStorage.getItem('sol_pages')||'[]'),
        routine: JSON.parse(localStorage.getItem('sol_routine')||'[]'),
        habits: JSON.parse(localStorage.getItem('sol_habits')||'[]'),
        mood: localStorage.getItem('sol_mood')||'',
        xp: localStorage.getItem('sol_xp')||0
      };
      const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a=document.createElement('a'); a.href=url; a.download='soluna-export.json'; a.click(); URL.revokeObjectURL(url);
    });
  });
  document.querySelectorAll('[id^=importBtn]').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const input = document.createElement('input'); input.type='file'; input.accept='application/json';
      input.onchange = e => {
        const f = e.target.files[0]; if(!f) return;
        const r = new FileReader();
        r.onload = evt => {
          try{
            const d = JSON.parse(evt.target.result);
            if(d.tasks) localStorage.setItem('sol_tasks', JSON.stringify(d.tasks));
            if(d.pages) localStorage.setItem('sol_pages', JSON.stringify(d.pages));
            if(d.routine) localStorage.setItem('sol_routine', JSON.stringify(d.routine));
            if(d.habits) localStorage.setItem('sol_habits', JSON.stringify(d.habits));
            if(d.mood) localStorage.setItem('sol_mood', d.mood);
            if(d.xp) localStorage.setItem('sol_xp', String(d.xp));
            alert('Imported data. Reloading page.');
            location.reload();
          }catch(err){ alert('Invalid file'); }
        };
        r.readAsText(f);
      };
      input.click();
    });
  });

  // Google sign in wiring (calls window.solunaSignIn if available)
  document.querySelectorAll('[id^=googleSignBtn]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(window.solunaSignIn) return window.solunaSignIn();
      alert('Firebase not configured. See js/firebase-config.js to enable Google Sign-In.');
    });
  });

  // show signed-in user if any
  const user = JSON.parse(localStorage.getItem('sol_user')||'null');
  if(user) {
    document.querySelectorAll('[id^=userEmail]').forEach(el=>el.innerText = user.email || user.name || 'user');
  }
});
