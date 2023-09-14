/*
Smooth Scrolling to Sections
This allows for smooth scrolling when clicking on anchor links.
Used when different sections on your pages users can nav to.
*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/*
This function checked if we are on the articles page.
Reads the articles json file.
Makes Title, publish date, author name and summary appear on the articles-list for each article.
*/
if (window.location.href.endsWith('articles.html')) {
    fetch('./data/articles.json')
        .then(response => response.json())
        .then(articles => {
            // Creating Article List
            const articlesList = document.querySelector('.articles-list');

            articles.forEach(article => {
                // Creating Article Element
                const articleElement = document.createElement('article');

                // Making Title and Hyperlink
                const titleElement = document.createElement('h2');
                const titleLink = document.createElement('a');
                titleLink.href = 'template-article.html?id=' + article.id;
                titleLink.textContent = article.title;
                titleElement.appendChild(titleLink);

                // Making Published Date
                const dateElement = document.createElement('p');
                dateElement.className = 'meta-info';
                dateElement.textContent = `Published on: ${article.publishingDate}`;

                // Making Author
                const authorElement = document.createElement('p');
                authorElement.className = 'meta-info';
                authorElement.textContent = `Author: ${article.author}`;

                // Making Summary
                const summaryElement = document.createElement('p');
                summaryElement.textContent = article.summary;

                // Appending to Article Element
                articleElement.appendChild(titleElement);
                articleElement.appendChild(dateElement);
                articleElement.appendChild(authorElement);
                articleElement.appendChild(summaryElement);

                // Add to Article List
                articlesList.appendChild(articleElement);
            });
        })
        // Error Handling
        .catch(error => console.error('There was an error!', error));
}

/*
This function loads the article data based on what was clicked in the list
*/
function loadArticle() {
    try {
        // Get the ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        // Fetch the articles JSON
        fetch('./data/articles.json')
            .then(response => response.json())
            .then(articles => {
                // Find the article with the matching ID
                const article = articles.find(a => a.id == id);

                // Fill the page with the article data
                document.querySelector('.article-title').textContent = article.title;
                document.querySelector('.article-date').textContent = `Published on: ${article.publishingDate}`;
                document.querySelector('.article-author').textContent = `Author: ${article.author}`;
                document.querySelector('.article-body').innerHTML = article.mainBody; // assuming mainBody contains HTML
            })
            .catch(error => console.error('There was an error!', error));
    } catch (error) {
        console.log("bad coding")
    }
}

// Call the function when the page loads
window.addEventListener('load', loadArticle);


/*
This function checks to see if we are on books.html
Loads the books.json file
Creates a books-list element and shows it
*/
if (window.location.href.endsWith('books.html')) {
    fetch('./data/books.json')
        .then(response => response.json())
        .then(books => {
            // Creating Book List
            const booksList = document.querySelector('.books-list');

            books.forEach(book => {
                // Create Book Element
                const bookElement = document.createElement('div');

                // Making Title
                const titleElement = document.createElement('h2');
                titleElement.textContent = book.title;

                // Making Author
                const authorElement = document.createElement('p');
                authorElement.textContent = `Author: ${book.author}`;

                // Making Book Summary
                const summaryElement = document.createElement('p');
                summaryElement.textContent = book.summary;

                // Appending to Book Element 
                bookElement.appendChild(titleElement);
                bookElement.appendChild(authorElement);
                bookElement.appendChild(summaryElement);

                // Add to Book List
                booksList.appendChild(bookElement);
            });
        })
        // Error Handling
        .catch(error => console.error('There was an error!', error));
    }

// Bit of fun
window.onload = console.log("Easter Egg")