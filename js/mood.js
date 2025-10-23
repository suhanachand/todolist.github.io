const moodButtons = document.querySelectorAll('.moodBtn');
const lastMoodSpan = document.getElementById('lastMood');

function loadMood() {
  const mood = localStorage.getItem('mood');
  if(mood) lastMoodSpan.textContent = mood;
}

moodButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const mood = btn.dataset.mood;
    localStorage.setItem('mood', mood);
    loadMood();
  });
});

loadMood();
