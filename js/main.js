/*
Smooth Scrolling to Sections
This allows for smooth scrolling when clicking on anchor links.
Used when different sections on your pages users can nav to.
This will come in handy for main page once built up.
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
Responsive Nav Bar
Toggle a responsive nav menu for smaller screen sizes

const menuButton = document.getElementById('menuButton');
const sidebar = document.querySelector('.sidebar');

menuButton.addEventListener('click', function() {
    sidebar.classList.toggle('active');
});
*/

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
        // Error handling
        .catch(error => console.error('There was an error!', error));
}

/*
This function loads the article data based on what was clicked in the list
*/
function loadArticle() {
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
      document.querySelector('.article-title').textContent = {article.title};
      document.querySelector('.article-date').textContent = `Published on: ${article.publishingDate}`;
      document.querySelector('.article-author').textContent = `Author: ${article.author}`;
      document.querySelector('.article-body').innerHTML = article.mainBody; // assuming mainBody contains HTML
    })
    .catch(error => console.error('There was an error!', error));
}

// Call the function when the page loads
window.onload = loadArticle;
