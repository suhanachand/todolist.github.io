document.addEventListener('DOMContentLoaded', ()=>{
  const moodBtns = document.querySelectorAll('.moodBtn');
  const lastMood = document.getElementById('lastMood');
  lastMood.innerText = localStorage.getItem('sol_mood') || '—';
  moodBtns.forEach(b=>{
    b.addEventListener('click', ()=> {
      const m = b.dataset.mood;
      localStorage.setItem('sol_mood', m);
      lastMood.innerText = m;
    });
  });
});
