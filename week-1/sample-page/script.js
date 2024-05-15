// script.js
document.addEventListener('DOMContentLoaded', function() {
    const toggleMenuButton = document.getElementById('toggleMenu');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    toggleMenuButton.addEventListener('click', () => {
        if (mainNav.style.display === 'none' || mainNav.style.display === '') {
            mainNav.style.display = 'block';
        } else {
            mainNav.style.display = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sections.forEach(section => section.style.display = 'none');
            const targetSection = document.querySelector(link.getAttribute('href'));
            targetSection.style.display = 'block';
            targetSection.style.opacity = 1;
        });
    });
});
