const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.navbar-links');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navLinks.classList.toggle('active');
    if (menuIcon.classList.contains('active')) {
        menuIcon.src = 'Assets/close.svg';
    } else {
        menuIcon.src = 'Assets/menu.svg';
    }
})