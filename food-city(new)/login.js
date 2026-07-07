import { loadCartForUser, saveCartForUser } from './Menu_page/cart_page/renderOrder.js';

const logInBox = document.querySelector('.login-box');
const backdrop = document.querySelector('.remove-container-backdrop');
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
    { username: 'jibril', password: '123', role: 'customer' },
    { username: 'balo', password: '456', role: 'customer' }
  ];
  localStorage.setItem('usersDB', JSON.stringify(mockUsers));
  return mockUsers;
}

function updateLoginLabel(user = null){
  document.querySelectorAll('.login-span').forEach((span) => {
    span.textContent = user ? user.username : 'LOGIN';
  });
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
    const previousUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if(previousUser){
      saveCartForUser(previousUser);
    }

    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    loadCartForUser(foundUser);
    updateLoginLabel(foundUser);
    closeLoginModal();

    const redirectPath = foundUser.role === 'admin'
      ? '../Main_page/admin.html'
      : '../Main_page/index.html';

    window.location.href = redirectPath;
  }else{
    alert('Invalid Credentials');
  }
}

function logOut(){
  const currentUserToLogout = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if(currentUserToLogout){
    saveCartForUser(currentUserToLogout);
  }

  localStorage.removeItem('currentUser');
  loadCartForUser(null);
  updateLoginLabel();
  window.location.href = '../Main_page/index.html';
}

// login-control

document.querySelectorAll('.log-in').forEach((logInButton) => {
  logInButton.addEventListener('click', () => {
    if(!currentUser){
      openLoginModal();
    }else{
      logOut();
    }
  });
});

document.querySelector('#login-close')?.addEventListener('click', closeLoginModal);
document.querySelector('.login-box form')?.addEventListener('submit', logIn);

const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
if(currentUser){
  loadCartForUser(currentUser);
  updateLoginLabel(currentUser);
}
