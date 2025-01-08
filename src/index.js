import API_KEY from "/src/api"
import "./styles.scss"
import placeholderImg from "./assets/placeholderImg.png"

const API_URL = "https://www.googleapis.com/books/v1/volumes"

document
	.getElementById("searchInput")
	.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			document.getElementById("searchButton").click()
		}
	})

document.getElementById("searchButton").addEventListener("click", () => {
	const query = document.getElementById("searchInput").value.trim()
	if (query) {
		fetchBooks(query)
	}
})

async function fetchBooks(query) {
	try {
		const response = await fetch(
			`${API_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}`
		)
		const data = await response.json()
		displayResults(data.items || [])
	} catch (error) {
		console.error("Błąd podczas pobierania książek:", error)
		document.getElementById("results").innerHTML =
			"<p>Błąd podczas pobierania książek. Spróbuj ponownie później.</p>"
	}
}

function displayResults(books) {
	const resultsContainer = document.getElementById("results")

	resultsContainer.innerHTML = books
		.map(book => {
			const { title, authors, description, imageLinks } = book.volumeInfo

			const bookImg = imageLinks?.thumbnail || placeholderImg

			const truncatedDescription = description
				? description.length > 280
					? `${description.slice(0, 280)}...`
					: description
				: "No description available."

			return `
            <div class="book">
                <img src="${bookImg}" alt="${title}">
                <div class="info">
                    <h2>${title}</h2>
                    <p><strong>By:</strong> ${
											authors?.join(", ") || "Unknown"
										}</p>
                    <p>${truncatedDescription}</p>
                </div>
            </div>
        `
		})
		.join("")
}
