import { updateProfile } from "../../login.js";

const passwordInput = document.querySelector('.password');
const toggleBtn = document.querySelector('.toggle-password');
const changePasswordBtn = document.querySelector('.change-password-btn');
const savePasswordBtn = document.querySelector('.save-password-btn');

function getCurrentUser(user = null) {
  if (user) return user;

  try {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  } catch {
    return null;
  }
}

function setFieldValue(selector, value) {
  const el = document.querySelector(selector);
  if (!el) return;

  if ('value' in el) {
    el.value = value ?? '';
  } else {
    el.textContent = value ?? '';
  }
}

export function renderInfo(user = null) {
  const currentUser = getCurrentUser(user);
  const fields = {
    '#fullName': currentUser?.fullName ?? '',
    '#email': currentUser?.email ?? '',
    '#phone': currentUser?.phoneNumber ?? '',
  };

  Object.entries(fields).forEach(([selector, value]) => {
    setFieldValue(selector, value);
  });

  renderRecentOrders();
}

function renderRecentOrders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const recentOrdersContainer = document.querySelector(".recent-orders");

  if (!recentOrdersContainer) return;

  const rows = orders
    .toReversed()
    .slice(0, 4)
    .map(
      (order) => `
      <div class="order-row">
        <div class="order-meta">
          <p class="order-id">${order.id}</p>
          <p class="order-details">${order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</p>
        </div>
        <p class="order-date">${order.createdAt}</p>
        <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
        <p class="order-price">₦${order.total.toLocaleString()}</p>
      </div>
    `
    ).join("");

  recentOrdersContainer.innerHTML = `
    <div class="heading">
      <h2>Recent Orders</h2>
      <a href="../order_page/order.html">View All Orders</a>
    </div>
    ${rows || '<p class="empty-state">No orders yet. Place an order from the menu to see it here.</p>'}
  `;
}

document.querySelector('.edit-button')?.addEventListener('click', ()=>  { 
  const currentUser = getCurrentUser();
  if(!currentUser) return

  const newProfileData = {
    fullName: document.querySelector('#fullName').value || currentUser.fullName,
    email: document.querySelector('#email').value || currentUser.email,
    phoneNumber: document.querySelector('#phone').value || currentUser.phoneNumber,
    password: currentUser.password
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

function initializeProfile() {
  renderInfo(getCurrentUser());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProfile, { once: true });
} else {
  initializeProfile();
}


const passwordWrapper = document.querySelector('.password-wrapper');

changePasswordBtn?.addEventListener('click', () => {
  
  passwordWrapper?.classList.toggle('show');
  changePasswordBtn?.classList.toggle('active');
})

savePasswordBtn?.addEventListener('click', () => {
  const currentUser = getCurrentUser();
  const errorMessage = document.querySelector('.error-mssg');
  const currentPasswordInput = document.getElementById('current-password');
  const newPasswordInput = document.getElementById('new-password');
  const confirmNewPasswordInput= document.getElementById('confirm-password');

  if (!currentUser || !errorMessage || !currentPasswordInput || !newPasswordInput || !confirmNewPasswordInput) return;

  const currentPassword = currentPasswordInput.value.trim();
  const newPassword = newPasswordInput.value.trim();
  const confirmNewPassword = confirmNewPasswordInput.value.trim();

  if (!currentPassword || !newPassword || !confirmNewPassword) return;

  if (currentPassword !== currentUser.password) {
    errorMessage.style.display = 'block';
  }else{
    const newPasswordsMatch = newPassword === confirmNewPassword;
    const errorNewMessage = document.querySelector('.error-new');
    
    if (!newPasswordsMatch) {
      errorNewMessage.style.display = 'block';
    } else {
      errorNewMessage.style.display = 'none';
      errorMessage.style.display = 'none';
      currentPasswordInput.value = '';
      newPasswordInput.value = '';
      confirmNewPasswordInput.value = '';
      passwordWrapper?.classList.toggle('show');
      changePasswordBtn?.classList.toggle('active');
      updateProfile({ ...currentUser, password: newPassword });
    }
  }
})