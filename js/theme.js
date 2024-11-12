const themeToggle = document.getElementById('theme-toggle');

// Check for saved user theme preference
const savedTheme = localStorage.getItem('theme');

// Apply the saved theme if it exists, otherwise set to default (dark theme)
if (savedTheme === 'white-background') {
  document.body.classList.add('white-background');
} else {
  document.body.classList.add('black-background'); // Default to dark theme if no saved theme
}

// Track background mode
let whiteBackgroundMode = document.body.classList.contains('white-background');

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  whiteBackgroundMode = !whiteBackgroundMode;

  // Toggle between themes
  if (whiteBackgroundMode) {
    document.body.classList.add('white-background');
    document.body.classList.remove('black-background');
    localStorage.setItem('theme', 'white-background');
  } else {
    document.body.classList.add('black-background');
    document.body.classList.remove('white-background');
    localStorage.setItem('theme', 'black-background');
  }
});
