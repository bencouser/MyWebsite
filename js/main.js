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
Attempting to dynamically generate articles
*/
if (window.location.href.endsWith('articles.html')) {
    fetch('./data/articles.json')
        .then(response => response.json())
        .then(articles => {
            const articlesList = document.querySelector('.articles-list');

            articles.forEach(article => {
                const articleElement = document.createElement('article');

                const titleElement = document.createElement('h2');
                const titleLink = document.createElement('a');
                titleLink.href = 'template-article.html';
                titleLink.textContent = article.title;
                titleElement.appendChild(titleLink);

                const dateElement = document.createElement('p');
                dateElement.className = 'meta-info';
                dateElement.textContent = `Published on: ${article.publishingDate}`;

                const authorElement = document.createElement('p');
                authorElement.className = 'meta-info';
                authorElement.textContent = `Author: ${article.author}`;

                const summaryElement = document.createElement('p');
                summaryElement.textContent = article.summary;

                articleElement.appendChild(titleElement);
                articleElement.appendChild(dateElement);
                articleElement.appendChild(authorElement);
                articleElement.appendChild(summaryElement);

                articlesList.appendChild(articleElement);
            });
        })
        .catch(error => console.error('There was an error!', error));
}
