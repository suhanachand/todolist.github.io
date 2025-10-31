// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('mode', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved mode
if (localStorage.getItem('mode') === 'dark') document.body.classList.add('dark');


