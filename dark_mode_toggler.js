const themeLink = document.getElementById('theme-style');

function setTheme(theme) {
    themeLink.href = theme + '.css';
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = themeLink.getAttribute('href').includes('dark') ? 'dark' : 'style';
    const newTheme = currentTheme === 'dark' ? 'style' : 'dark';
    setTheme(newTheme);
}

// Load saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'style';
setTheme(savedTheme);
