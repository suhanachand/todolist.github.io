const quoteEl = document.getElementById('quoteOfDay');

async function loadQuote() {
  try {
    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();
    quoteEl.textContent = `"${data.content}" — ${data.author}`;
  } catch(e){
    quoteEl.textContent = 'Unable to load quote.';
  }
}

loadQuote();
