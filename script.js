document.addEventListener('DOMContentLoaded', function () {
    const darkModeButton = document.getElementById('dark-mode-button');

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeButton.textContent = 'Modo claro';
        } else {
            darkModeButton.textContent = 'Modo oscuro';
        }
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        darkModeButton.textContent = 'Modo claro';
    }

    darkModeButton.addEventListener('click', toggleDarkMode);

    // Cargar tarjetas desde archivo CSV
    fetch('./data.csv')
        .then(response => response.text())
        .then(data => {
            const cardsContainer = document.getElementById('cards-container');
            const rows = data.split('\n');
            rows.forEach(row => {
                const [title, description, languages, repoLink] = row.split(',');
                if (title && description && languages && repoLink) {
                    const card = createCard(title, description, languages, repoLink);
                    cardsContainer.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo CSV:', error);
        });

    function createCard(title, description, languages, repoLink) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.onclick = function () {
            window.open(repoLink, '_blank');
        };

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        card.appendChild(titleElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;
        card.appendChild(descriptionElement);

        const languagesElement = document.createElement('p');
        languagesElement.textContent = 'Lenguajes utilizados: ' + languages;
        card.appendChild(languagesElement);

        return card;
    }
});
