// quote widget
document.addEventListener('DOMContentLoaded', async ()=>{
  const el = document.getElementById('quoteOfDay');
  try{
    const quotes = [
      "Do the work. — Unknown",
      "Focus beats talent when talent doesn't focus.",
      "Small daily improvements lead to big results."
    ];
    el.innerText = quotes[Math.floor(Math.random()*quotes.length)];
  }catch(e){ el.innerText = 'Keep going.'; }
});
