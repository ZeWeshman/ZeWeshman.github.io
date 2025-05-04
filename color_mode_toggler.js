const themes = ["grey", "light", "dark"];
let currentThemeIndex = 0;

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateButtonColor();
}

function toggleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[currentThemeIndex]);
}

function updateButtonColor() {
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    const nextTheme = themes[nextThemeIndex];
    const button = document.querySelector(".mode-button");
    const tempTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", nextTheme);
    button.style.backgroundColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--button-bg")
        .trim();
    document.documentElement.setAttribute("data-theme", tempTheme);
}

// Load saved theme on page load
const savedTheme = localStorage.getItem("theme") || "grey";
currentThemeIndex = themes.indexOf(savedTheme);
setTheme(savedTheme);
