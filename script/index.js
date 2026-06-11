const menuIcon = document.getElementById('menu-icon');
const sideBar = document.querySelector('.side-bar');
const closeIcon = document.querySelector('.close-icon');

closeIcon.addEventListener('click', () => {
  sideBar.style.display = 'none';
});

menuIcon.addEventListener('click', () => {
  sideBar.style.display = 'flex';
});
