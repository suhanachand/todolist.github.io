// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('mode', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved mode
if (localStorage.getItem('mode') === 'dark') document.body.classList.add('dark');

// Google sign-in stub
const googleSign = document.getElementById('googleSign');
googleSign?.addEventListener('click', () => {
  alert('Google login is not yet implemented. Firebase auth can be added here.');
});
