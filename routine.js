// Routine mode full logic
document.addEventListener('DOMContentLoaded',()=>{
  const stepName = document.getElementById('stepName');
  const stepDuration = document.getElementById('stepDuration');
  const addStep = document.getElementById('addStep');
  const routineList = document.getElementById('routineList');
  const startRoutine = document.getElementById('startRoutine');
  const stopRoutine = document.getElementById('stopRoutine');
  const player = document.getElementById('routinePlayer');
  const currentStep = document.getElementById('currentStep');
  const routineTimer = document.getElementById('routineTimer');
  const routineProgress = document.getElementById('routineProgress');
  const routineStreak = document.getElementById('routineStreak');

  let routine = JSON.parse(localStorage.getItem('sol_routine')||'[]');
  let index=0, timer=null;
  routineStreak.innerText = localStorage.getItem('sol_routine_streak')||'0';

  function renderList(){
    routineList.innerHTML = '';
    routine.forEach((s,i)=>{
      const li=document.createElement('li'); li.className='routine-item';
      li.innerHTML = `<div>${s.name} — ${s.duration} min</div>`;
      const del=document.createElement('button'); del.className='icon'; del.textContent='✖';
      del.addEventListener('click',()=>{ routine.splice(i,1); save(); renderList(); });
      li.appendChild(del); routineList.appendChild(li);
    });
  }
  function save(){ localStorage.setItem('sol_routine',JSON.stringify(routine)); }

  addStep.addEventListener('click',()=>{
    const name=stepName.value.trim(); const mins=parseInt(stepDuration.value);
    if(!name||!mins) return;
    routine.push({name, duration:mins});
    save(); renderList(); stepName.value=''; stepDuration.value='';
  });

  startRoutine.addEventListener('click', ()=>{
    if(routine.length===0) return alert('Add a step');
    index=0; playStep();
  });
  stopRoutine.addEventListener('click', ()=>{ if(timer) clearInterval(timer); player.style.display='none'; });

  function playStep(){
    if(index>=routine.length){ routineComplete(); return; }
    player.style.display='block';
    const step = routine[index];
    currentStep.innerText = step.name;
    let timeLeft = step.duration*60;
    routineProgress.value = 0;
    routineTimer.innerText = format(timeLeft);
    timer = setInterval(()=>{
      timeLeft--;
      routineTimer.innerText = format(timeLeft);
      routineProgress.value = ((step.duration*60-timeLeft)/(step.duration*60))*100;
      if(timeLeft<=0){ clearInterval(timer); index++; playStep(); }
    },1000);
  }
  function format(s){ const m=Math.floor(s/60), sec=s%60; return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`; }
  function routineComplete(){
    player.innerHTML = '<h3>Routine Complete ✨</h3>';
    const cur = parseInt(localStorage.getItem('sol_routine_streak')||'0')+1;
    localStorage.setItem('sol_routine_streak',String(cur));
    routineStreak.innerText = cur;
    localStorage.setItem('sol_xp',String((parseInt(localStorage.getItem('sol_xp')||'0')+20)));
  }

  renderList();
});
