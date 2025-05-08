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

const csvUrl = 'https://docs.google.com/spreadsheets/d/1StW1SIvVre2s1GXyEf-xmg6M-X8RCw0U7Zru_DyUHKg/export?format=csv';

    Papa.parse(csvUrl, {
        download: true,
        header: true, // Automatically uses the first row as keys
        complete: function(results) {
            console.log("Parsed CSV Data:", results.data);
            data = results.data.filter(row => row["Kit"] && row["Kit"].trim() !== "");
            console.log("Filtered CVS Data1:", results.data);
            // Example: Display data in a table
            const container = document.getElementById('data-container');
            results.data.forEach(row => {
                const p = document.createElement('p');
                p.textContent = JSON.stringify(row);
                container.appendChild(p);
            });
        }
    });