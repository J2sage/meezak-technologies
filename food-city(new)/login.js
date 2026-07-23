const logInBox = document.querySelector('.login-box');
const backdrop = document.querySelector('.remove-container-backdrop');
const menuLink = document.getElementById('menu-link');
if(logInBox){
  logInBox.innerHTML = `
    <form action="">
      <ion-icon name="close" id="login-close"></ion-icon>
      <h2>Login</h2>
      <div class="input-box">
        <span class="icon"><ion-icon name="mail"></ion-icon></span>
        <input class="username" type="text" required>
        <label for="username">Username</label>
      </div>
      <div class="input-box">
        <span class="icon"><ion-icon name="lock"></ion-icon></span>
        <input type="password" class="password" required>
        <label for="password">Password</label>
      </div>
      <div class="remember-forget">
        <label><input type="checkbox">Remember me</label>
        <a href="#">Forgot Password?</a>
      </div>
      <button type="submit" class="btn">Login</button>
      <div class="register-link">
        <p>Don't have an account <a href="#">Register</a></p>
      </div>
    </form>
  `;
}
function openLoginModal(){
  if(logInBox){
    logInBox.style.display = 'flex';
    backdrop?.classList.add('show');
    document.body.classList.add('no-scroll');
  }
}

function closeLoginModal(){
  if(logInBox){
    logInBox.style.display = 'none';
  }
  backdrop?.classList.remove('show');
  document.body.classList.remove('no-scroll');
}

function seedUsers(){
  const storedUsers = JSON.parse(localStorage.getItem('usersDB') || 'null');
  if(storedUsers && storedUsers.length){
    return storedUsers;
  }

  const mockUsers = [
    { username: 'admin', password: '123', role: 'admin' },
    { username: 'jibril', password: '123', role: 'customer', fullName: 'Jibril Adebayo', email: 'jibril@example.com' },
    { username: 'balo', password: '456', role: 'customer', fullName: 'Balo Johnson', email: 'balo@example.com' }
  ];
  localStorage.setItem('usersDB', JSON.stringify(mockUsers));
  return mockUsers;
}

function updateLoginLabel(user = null){
  document.querySelectorAll('.login-span').forEach((span) => {
    span.textContent = user ? user.username : 'LOGIN';
  });
}
function updatedashBoardLabel(user = null){
  document.querySelectorAll('.full-name').forEach((span) => {
    span.textContent = user ? user.fullName : '';
  })
}

function toggleMenuLink(user = null){
  if(menuLink){
    const shouldHide = !!user && user.role === 'admin';
    menuLink.style.display = shouldHide ? 'none' : '';
  }
}

function protectMenuPage(user = null){
  const isMenuPage = window.location.pathname.includes('/Menu_page/');
  if(isMenuPage && user?.role === 'admin'){
    window.location.href = '../Main_page/admin_page/admin.html';
  }
}

function redirectBasedOnRole(user){
  if(!user){
    return;
  }

  toggleMenuLink(user);

  const redirectPath = user.role === 'admin'
    ? '../Main_page/admin_page/admin.html'
    : '../dashboard/index.html';

  window.location.href = redirectPath;
}

function logIn(event){
  event?.preventDefault();

  if(!logInBox){
    return;
  }

  const name = document.querySelector('.username')?.value.trim() || '';
  const password = document.querySelector('.password')?.value.trim() || '';
  const users = seedUsers();
  const foundUser = users.find((u) => u.username === name && u.password === password);

  if(foundUser){
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    updateLoginLabel(foundUser);
    updatedashBoardLabel(foundUser);
    toggleMenuLink(foundUser);
    closeLoginModal();
    redirectBasedOnRole(foundUser);

  }else{
    alert('Invalid Credentials');
  }
}

document.querySelector('.logout-btn')?.addEventListener('click', logOut);

function getHomePagePath(){
  const path = window.location.pathname.toLowerCase();

  if(path.includes('/dashboard/order_page/')){
    return '../../Main_page/index.html';
  }

  if(path.includes('/dashboard/')){
    return '../Main_page/index.html';
  }

  if(path.includes('/main_page/admin_page/')){
    return '../index.html';
  }

  if(path.includes('/main_page/')){
    return 'index.html';
  }

  if(path.includes('/menu_page/')){
    return '../Main_page/index.html';
  }

  return '../Main_page/index.html';
}

function logOut(){
  localStorage.removeItem('currentUser');
  updateLoginLabel();
  updatedashBoardLabel();
  toggleMenuLink();
  window.location.replace(getHomePagePath());
}

// login-control

document.querySelectorAll('.log-in').forEach((logInButton) => {
  logInButton.addEventListener('click', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if(currentUser){
      redirectBasedOnRole(currentUser);
    }else{
      openLoginModal();
    }
  });
});

// if (JSON.parse(localStorage.getItem('currentUser') || 'null')) {
//       window.location.href = '../dashboard/index.html';
//     }else{
//       openLoginModal();
//     }

document.querySelector('#login-close')?.addEventListener('click', closeLoginModal);
document.querySelector('.login-box form')?.addEventListener('submit', logIn);

const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
if(currentUser){
  updateLoginLabel(currentUser);
  updatedashBoardLabel(currentUser);
  toggleMenuLink(currentUser);
  protectMenuPage(currentUser);
}else{
  toggleMenuLink();
}
