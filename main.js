document.addEventListener("DOMContentLoaded", () => {
    const navControls = document.querySelector('.nav-controls');
    
    if (navControls) {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.classList.add('theme-button');
        navControls.appendChild(themeToggle);

        const body = document.body;

        // Function to set the theme
        function setTheme(theme) {
            if (theme === "dark") {
                body.classList.add("dark-mode");
                themeToggle.innerText = "☀️ Light Mode";
            } else {
                body.classList.remove("dark-mode");
                themeToggle.innerText = "🌙 Dark Mode";
            }
            localStorage.setItem("theme", theme);
        }

        // Load theme preference from localStorage or detect system preference
        function loadTheme() {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                setTheme(savedTheme);
            } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
        }

        // Toggle theme on button click
        themeToggle.addEventListener("click", () => {
            if (body.classList.contains("dark-mode")) {
                setTheme("light");
            } else {
                setTheme("dark");
            }
        });

        // Apply theme on page load
        loadTheme();
    }
});