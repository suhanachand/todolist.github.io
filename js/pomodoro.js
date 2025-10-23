document.addEventListener('DOMContentLoaded', ()=>{
  let time = parseInt(localStorage.getItem('sol_pom_time')||'1500'); // 25*60
  let running = false, timer=null;
  const display = document.getElementById('pomDisplay');
  const startBtn = document.getElementById('pomStart');
  const pauseBtn = document.getElementById('pomPause');
  const resetBtn = document.getElementById('pomReset');
  const sessSpan = document.getElementById('pomSessions');

  function fmt(s){ const m=Math.floor(s/60), sec=s%60; return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`; }
  function render(){ display.innerText = fmt(time); sessSpan.innerText = localStorage.getItem('sol_pom_sessions')||'0'; }

  startBtn?.addEventListener('click', ()=>{
    if(running) return;
    running=true;
    timer = setInterval(()=>{
      time--;
      if(time<=0){
        clearInterval(timer);
        running=false;
        time = 25*60;
        const cur = parseInt(localStorage.getItem('sol_pom_sessions')||'0')+1;
        localStorage.setItem('sol_pom_sessions',String(cur));
        const xp = parseInt(localStorage.getItem('sol_xp')||'0')+10;
        localStorage.setItem('sol_xp',String(xp));
        alert('Pomodoro finished — good job!');
      }
      render();
    },1000);
  });

  pauseBtn?.addEventListener('click', ()=>{ if(timer) clearInterval(timer); running=false; });
  resetBtn?.addEventListener('click', ()=>{ if(timer) clearInterval(timer); running=false; time = 25*60; render(); localStorage.setItem('sol_pom_time',String(time)); });

  render();
});
