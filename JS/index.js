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

const csvUrl = 'https://docs.google.com/spreadsheets/d/1StW1SIvVre2s1GXyEf-xmg6M-X8RCw0U7Zru_DyUHKg/gviz/tq?tqx=out:csv&sheet=$RG';
//const csvUrl = "Gunpla Checklist - HG.csv"
Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: function(results) {
        console.log("Headers:", results.meta.fields);

        const filtered = results.data.filter(row => {
            return row["Kit"]?.trim();
        });

        console.log("Filtered CSV Data:", filtered);

        const tableBody = document.querySelector("#data-table tbody");

        // Loop through the filtered rows and add them to the table
        filtered.forEach(row => {
            const tr = document.createElement("tr");

            // Loop through the first 8 keys in the row (columns)
            const keys = Object.keys(row).slice(0, 8);  // Ensure we only take the first 8 columns
            keys.forEach(key => {
                const td = document.createElement("td");

                let cellValue = row[key];

                if (cellValue === "TRUE"){
                    td.innerHTML = "✔";
                } else if (cellValue === "FALSE") {
                    td.innerHTML = "❌";
                } else {
                    td.textContent = cellValue;  // Display other values as they are
                }
                tr.appendChild(td);
            });

            // Add the row to the table body
            tableBody.appendChild(tr);
        });
    }
});