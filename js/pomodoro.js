const pomDisplay = document.getElementById('pomDisplay');
const pomStart = document.getElementById('pomStart');
const pomPause = document.getElementById('pomPause');
const pomReset = document.getElementById('pomReset');
const pomSessions = document.getElementById('pomSessions');

let pomTime = 25*60, interval=null, sessions=0;

function updateDisplay(){
  const m=Math.floor(pomTime/60).toString().padStart(2,'0');
  const s=(pomTime%60).toString().padStart(2,'0');
  pomDisplay.textContent=`${m}:${s}`;
}

pomStart.addEventListener('click', ()=>{
  if(interval) return;
  interval = setInterval(()=>{
    if(pomTime>0){
      pomTime--;
      updateDisplay();
    } else {
      clearInterval(interval); interval=null;
      sessions++;
      pomSessions.textContent=sessions;
      pomTime=25*60;
      updateDisplay();
      alert('Pomodoro complete!');
    }
  },1000);
});

pomPause.addEventListener('click', ()=>{
  clearInterval(interval);
  interval=null;
});

pomReset.addEventListener('click', ()=>{
  clearInterval(interval);
  interval=null;
  pomTime=25*60;
  updateDisplay();
});
updateDisplay();
