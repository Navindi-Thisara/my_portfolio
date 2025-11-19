// theme.js

const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Function to set theme
function setTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-mode');
    themeIcon.src = 'assets/icons/sun.svg';
  } else {
    body.classList.remove('light-mode');
    themeIcon.src = 'assets/icons/moon.svg';
  }
  localStorage.setItem('theme', theme);
}

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Toggle theme on button click
toggleBtn.addEventListener('click', () => {
  const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
  setTheme(newTheme);
});
