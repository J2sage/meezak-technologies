import { updateProfile } from "../../login.js";

const passwordInput = document.getElementById('password');
const toggleBtn = document.querySelector('.toggle-password');

export function renderInfo(user = null){
  const fields = {
    '#fullName': user?.fullName ?? '',
    '#email': user?.email ?? '',
    '#phone': user?.phoneNumber ?? '',
    '#password': user?.password ?? ''
  };

  Object.entries(fields).forEach(([selector, value]) => {
    const el = document.querySelector(selector);
    if (!el) return;

    if ('value' in el) {
      el.value = value;
    } else {
      el.textContent = value;
    }
  });
}

document.querySelector('.edit-button')?.addEventListener('click', ()=>  { 
  const newProfileData = {
    fullName: document.querySelector('#fullName').value,
    email: document.querySelector('#email').value,
    phoneNumber: document.querySelector('#phone').value,
    password: document.querySelector('#password').value
  }
  updateProfile(newProfileData);
})

if (passwordInput && toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    const icon = toggleBtn.querySelector('ion-icon');
    if (icon) {
      icon.name = isPassword ? 'eye-off' : 'eye';
    }
  });
}