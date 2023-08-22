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
Responsive Nav Bar
Toggle a responsive nav menu for smaller screen sizes
*/
const menuButton = document.getElementById('menuButton');
const sidebar = document.querySelector('.sidebar');

menuButton.addEventListener('click', function() {
    sidebar.classList.toggle('active');
});
