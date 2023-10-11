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
Filters based on search bar parameter
Passes output to renderArticles()
*/
if (window.location.href.endsWith('Articles/')) {
    let allArticles = [];

    // Prevent form submission
    const form = document.querySelector('.search-container form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });

    fetch('../data/articles.json')
        .then(response => response.json())
        .then(articles => {
            allArticles = articles;
            renderArticles(allArticles);
        })
        .catch(error => console.error('There was an error!', error));

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        const filteredArticles = allArticles.filter(article => {
            return article.title.toLowerCase().includes(searchString) || article.summary.toLowerCase().includes(searchString);
        });
        renderArticles(filteredArticles);
    });
}

/*
This function is called through loading the articles page.
It loades all articles that have passed through the searchbar filter.
Then renders them to the page
*/
function renderArticles(articles){
    const articlesList = document.querySelector('.articles-list');
    articlesList.innerHTML = ''; // Clear existing articles before rendering

    articles.forEach(article => {
        // Creating Article Element
        const articleElement = document.createElement('article');
        articleElement.setAttribute('data-article-id', article.id);

        // Making Title and Hyperlink
        const titleElement = document.createElement('h2');
        const titleLink = document.createElement('a');
        titleLink.href = '../Article/index.html?id=' + article.id;
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
    })

}

/*
This function loads the article data based on what was clicked in the list
*/
// ... Previous code remains unchanged
function loadArticle() {
    try {
        // Get the ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        // Fetch the articles JSON
        fetch('../data/articles.json')  // Make sure the path is correct
            .then(response => response.json())
            .then(articles => {
                // Find the article with the matching ID
                const article = articles.find(a => a.id == id);

                if(article) {
                    // Fill the page with the article data
                    document.querySelector('.container .article-title').textContent = article.title;
                    document.querySelector('.article-date').textContent = `Published on: ${article.publishingDate}`;
                    document.querySelector('.article-author').textContent = `Author: ${article.author}`;
                    document.querySelector('.article-body').innerHTML = article.mainBody;
                } else {
                    console.log("Article not found");
                }
            })
            .catch(error => console.error('There was an error!', error));
    } catch (error) {
        console.log("An error occurred: ", error);  // Improved error message
    }
}

// On template-article.html
if (window.location.href.includes('Article/')) {
    window.addEventListener('load', function() {
        loadArticle();
    });
}


// On template-article.html
if (window.location.href.includes('Article/')) {
    window.addEventListener('load', function() {
        loadArticle();
    });
}


/*
This function checks to see if we are on books.html
Loads the books.json file
Creates a books-list element and shows it
*/
if (window.location.href.endsWith('Books/')) {
    fetch('../data/books.json')
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