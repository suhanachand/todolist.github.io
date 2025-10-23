document.addEventListener('DOMContentLoaded', ()=>{
  const el = document.getElementById('quoteOfDay');
  const quotes = [
    "Do the work. — Unknown",
    "Focus beats talent when talent doesn't focus.",
    "Small daily improvements lead to big results."
  ];
  el && (el.innerText = quotes[Math.floor(Math.random()*quotes.length)]);
});
