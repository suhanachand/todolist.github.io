const habitsContainer = document.getElementById('habitsContainer');
const addHabitBtn = document.getElementById('addHabit');

function loadHabits() {
  const habits = JSON.parse(localStorage.getItem('habits')||'[]');
  habitsContainer.innerHTML='';
  habits.forEach((h,i)=>{
    const div = document.createElement('div');
    div.className='habit';
    div.innerHTML = `<input type="checkbox" ${h.done?'checked':''}> ${h.name} <button class="delHabit" data-id="${i}">❌</button>`;
    habitsContainer.appendChild(div);
  });
  document.querySelectorAll('.habit input[type="checkbox"]').forEach(cb=>{
    cb.addEventListener('change', ()=>{
      const habits = JSON.parse(localStorage.getItem('habits')||'[]');
      habits[cb.parentElement.querySelector('.delHabit').dataset.id].done = cb.checked;
      localStorage.setItem('habits', JSON.stringify(habits));
    });
  });
  document.querySelectorAll('.delHabit').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const habits = JSON.parse(localStorage.getItem('habits')||'[]');
      habits.splice(btn.dataset.id,1);
      localStorage.setItem('habits', JSON.stringify(habits));
      loadHabits();
    });
  });
}

addHabitBtn?.addEventListener('click', ()=>{
  const name = document.getElementById('habitName').value.trim();
  if(!name) return alert('Add a habit name!');
  const habits = JSON.parse(localStorage.getItem('habits')||'[]');
  habits.push({name, done:false});
  localStorage.setItem('habits', JSON.stringify(habits));
  document.getElementById('habitName').value='';
  loadHabits();
});

loadHabits();
