const sideBar = document.getElementsByClassName('ham')[0];
const menuBtn = document.getElementsByClassName('sidebar-control')[0];
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('close');

menuBtn.addEventListener('click', ()=>{
  if (menu.style.display !== 'none') {
    sideBar.style.display = 'block';
    menu.style.display = 'none';
    closeBtn.style.display = 'block';
  } else{
    sideBar.style.display = 'none';
    menu.style.display = 'block';
    closeBtn.style.display = 'none';
  }
});

// Scroll to reviews when the REVIEWS nav item is clicked
const reviewSection = document.querySelector('.review-container');
if (reviewSection) {
  const headerNavItems = document.querySelectorAll('nav.tab-links ul li a');
  const smallNavItems = document.querySelectorAll('.ham .small-nav li a');
  const allNavLinks = [...headerNavItems, ...smallNavItems];

  allNavLinks.forEach(link => {
    if (/reviews/i.test(link.textContent.trim())) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        reviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close sidebar (mobile) if open
        if (sideBar.style.display === 'block') {
          sideBar.style.display = 'none';
          menu.style.display = 'block';
          closeBtn.style.display = 'none';
        }
      });
    }
  });
}