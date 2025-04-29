document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-theme');

    // Check if user has a saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }

    toggleButton.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');

        // Save the preference
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
});

document.getElementById('toggle-theme').addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    
    // Toggle icon text (🌙 for dark, 🌞 for light)
    if (document.body.classList.contains('light-mode')) {
        this.textContent = '🌞';
    } else {
        this.textContent = '🌙';
    }
});