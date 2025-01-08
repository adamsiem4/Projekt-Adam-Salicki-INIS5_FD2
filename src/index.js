import API_KEY from '/src/api';
import './styles.scss';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

document.getElementById('searchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        fetchBooks(query);
    }
});

async function fetchBooks(query) {
    try {
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}`);
        const data = await response.json();
        displayResults(data.items || []);
    } catch (error) {
        console.error('Error fetching books:', error);
        document.getElementById('results').innerHTML = '<p>Error fetching books. Please try again later.</p>';
    }
}

function displayResults(books) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = books.map(book => {
        const { title, authors, description, imageLinks } = book.volumeInfo;
        return `
            <div class="book">
                <img src="${imageLinks?.thumbnail || ''}" alt="${title}">
                <div class="info">
                    <h2>${title}</h2>
                    <p>By: ${authors?.join(', ') || 'Unknown'}</p>
                    <p>${description || 'No description available.'}</p>
                </div>
            </div>
        `;
    }).join('');
}