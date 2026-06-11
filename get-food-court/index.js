const menuIcon = document.getElementById('menu-icon');
const sideBar = document.querySelector('.side-bar');
const closeIcon = document.querySelector('.close-icon');
const navBar = document.querySelector('.nav-bar');

closeIcon.addEventListener('click', () => {
  sideBar.style.display = 'none';
  menuIcon.style.display = 'block';
  closeIcon.style.display = 'none';
  navBar.style.background = 'linear-gradient(90deg, rgba(147, 214, 212, 0.202) 0%, rgba(214, 147, 147, 0.202) 100%)';
});

menuIcon.addEventListener('click', () => {
  sideBar.style.display = 'flex';
  menuIcon.style.display = 'none';
  closeIcon.style.display = 'block';
  navBar.style.background = 'black';
});