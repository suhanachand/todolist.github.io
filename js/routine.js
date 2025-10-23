const routineListEl = document.getElementById('routineList');
const addStepBtn = document.getElementById('addStep');
const startRoutineBtn = document.getElementById('startRoutine');
const stopRoutineBtn = document.getElementById('stopRoutine');
const routinePlayer = document.getElementById('routinePlayer');
const currentStepEl = document.getElementById('currentStep');
const routineTimerEl = document.getElementById('routineTimer');
const routineProgress = document.getElementById('routineProgress');
let routineSteps = JSON.parse(localStorage.getItem('routine')||'[]');
let routineIndex=0, routineTime=null, routineInterval=null;

function renderRoutine(){
  routineListEl.innerHTML='';
  routineSteps.forEach((s,i)=>{
    const li=document.createElement('li');
    li.textContent=`${s.name} - ${s.duration} min`;
    routineListEl.appendChild(li);
  });
}
renderRoutine();

addStepBtn.addEventListener('click',()=>{
  const name = document.getElementById('stepName').value.trim();
  const duration = parseInt(document.getElementById('stepDuration').value);
  if(!name || !duration) return alert('Fill step name and duration!');
  routineSteps.push({name,duration});
  localStorage.setItem('routine', JSON.stringify(routineSteps));
  renderRoutine();
});

startRoutineBtn.addEventListener('click',()=>{
  if(!routineSteps.length) return alert('No routine steps!');
  routineIndex=0;
  routinePlayer.style.display='block';
  startStep();
});

function startStep(){
  const step = routineSteps[routineIndex];
  let timeLeft = step.duration*60;
  currentStepEl.textContent=step.name;
  routineTimerEl.textContent=`${Math.floor(timeLeft/60)}:${(timeLeft%60).toString().padStart(2,'0')}`;
  routineProgress.max=timeLeft;
  routineProgress.value=timeLeft;

  routineInterval=setInterval(()=>{
    if(timeLeft>0){
      timeLeft--;
      routineTimerEl.textContent=`${Math.floor(timeLeft/60)}:${(timeLeft%60).toString().padStart(2,'0')}`;
      routineProgress.value=timeLeft;
    } else {
      clearInterval(routineInterval);
      routineIndex++;
      if(routineIndex<routineSteps.length) startStep();
      else alert('Routine complete!');
    }
  },1000);
}

stopRoutineBtn.addEventListener('click',()=>{
  clearInterval(routineInterval);
  routinePlayer.style.display='none';
});
