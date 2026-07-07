const sideBar = document.getElementsByClassName('ham')[0];
const menuBtn = document.getElementsByClassName('sidebar-control')[0];
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('close');

menuBtn.addEventListener('click', ()=>{
  if (menu.style.display !== 'none') {
    sideBar.style.display = 'block';
    menu.style.display = 'none';
    closeBtn.style.display = 'block';
    document.body.classList.add('no-scroll');
  } else{
    sideBar.style.display = 'none';
    menu.style.display = 'block';
    closeBtn.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }
});
sideBar.addEventListener('click', ()=>{
  if(sideBar.style.display === 'block'){
    sideBar.style.display = 'none';
    menu.style.display = 'block';
    closeBtn.style.display = 'none';
  }
})

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





// additional-comment-control
const fullName = document.getElementsByClassName('F-name')[0];
const extraComment = document.getElementsByClassName('extra-comment')[0];
const additonalArray = JSON.parse(localStorage.getItem('additionalArray')) ||[];
// const additonalArray = [];
const profile = fullName?.value?.trim()?.[0] ?? "";
updateComment();

const postBtn = document.querySelector('.post_btn');
if (postBtn) {
  postBtn.addEventListener('click', () => {
    if(fullName.value !== '' &&  extraComment.value !== ''){
      const profile = fullName.value.trim()[0] || '';
      additonalArray.push({
        fullName: fullName.value,
        comment: extraComment.value,
        profile: profile
      });
      saveToStorage(additonalArray);
      updateComment();
      fullName.value = '';
      extraComment.value = '';
    }
    document.querySelector('.comment-overlay').style.display = 'flex';
    setTimeout(() => {
      document.querySelector('.comment-overlay').style.display = 'none';
    }, 3000);
  })
};

function updateComment(){
  if (additonalArray.length === 0) {
    const element = document.querySelector('.additional');
    if (element) {
      element.innerHTML = '';
    }
    return;
  }

  let addtionalHTML = '';
  const lastItem = additonalArray.at(-1);
  addtionalHTML += `
    <div class="comment-section">
      <div class="profile-comm">
        <div class="profile-name">${lastItem.profile || ''}</div>
        <p>${lastItem.fullName || ''}</p>
      </div>
      <div class="textarea">
        <div class="rating">
          <span> <img src="assets/star-icon.svg" alt=""></span>
          <span> <img src="assets/star-icon.svg" alt=""></span>
          <span> <img src="assets/star-icon.svg" alt=""></span>
          <span> <img src="assets/star-icon.svg" alt=""></span>
          <span> <img src="assets/star-icon.svg" alt=""></span>
        </div>
        <div class="comment">
          <p>${lastItem.comment || ''}</p>
        </div>
      </div>
    </div>
  `;

  document.querySelector('.additional').innerHTML = addtionalHTML;
}

function saveToStorage(params) {
  localStorage.setItem('additionalArray', JSON.stringify(params));
}