const themes = ["grey", "light", "dark"];
let currentThemeIndex = 0;

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

function toggleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[currentThemeIndex]);
}


// Load saved theme on page load
const savedTheme = localStorage.getItem("theme") || "grey";
currentThemeIndex = themes.indexOf(savedTheme);
setTheme(savedTheme);
