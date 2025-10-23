document.addEventListener('DOMContentLoaded', ()=>{
  const addHabit = document.getElementById('addHabit');
  const habitName = document.getElementById('habitName');
  const container = document.getElementById('habitsContainer');
  let habits = JSON.parse(localStorage.getItem('sol_habits')||'[]');

  function render(){
    container.innerHTML = '';
    if(habits.length===0) container.innerHTML = '<div class="small-muted">No habits yet.</div>';
    habits.forEach((h, idx)=>{
      const card = document.createElement('div'); card.className='card';
      const head = document.createElement('div'); head.innerHTML = `<strong>${h.name}</strong> <button class="icon-btn">✖</button>`;
      head.querySelector('button').addEventListener('click', ()=>{ habits.splice(idx,1); save(); render(); });
      card.appendChild(head);
      const grid = document.createElement('div'); grid.className='habit-grid';
      for(let i=0;i<7;i++){
        const cell = document.createElement('div'); cell.className='habit-cell'; if(h.log && h.log[i]) cell.classList.add('active');
        cell.textContent = ['S','M','T','W','T','F','S'][i];
        cell.addEventListener('click', ()=>{ h.log = h.log||[]; h.log[i] = !h.log[i]; save(); render(); });
        grid.appendChild(cell);
      }
      card.appendChild(grid);
      container.appendChild(card);
    });
  }
  function save(){ localStorage.setItem('sol_habits', JSON.stringify(habits)); }
  addHabit?.addEventListener('click', ()=>{ const name = habitName.value.trim(); if(!name) return; habits.push({name, log:[]}); habitName.value=''; save(); render(); });
  render();
});
