import { updateProfile } from "../../login.js";

const passwordInput = document.getElementById("password");
const toggleBtn = document.querySelector(".toggle-password");

export function renderInfo(user = null) {
  const fields = {
    "#fullName": user?.fullName ?? "",
    "#email": user?.email ?? "",
    "#phone": user?.phoneNumber ?? "",
    "#password": user?.password ?? "",
  };

  Object.entries(fields).forEach(([selector, value]) => {
    const el = document.querySelector(selector);
    if (!el) return;

    if ("value" in el) {
      el.value = value;
    } else {
      el.textContent = value;
    }
  });

  renderRecentOrders();
}

function renderRecentOrders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const recentOrdersContainer = document.querySelector(".recent-orders");

  if (!recentOrdersContainer) return;

  const rows = orders
    .slice(0, 4)
    .map(
      (order) => `
      <div class="order-row">
        <div class="order-meta">
          <p class="order-id">${order.id}</p>
          <p class="order-details">${order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</p>
        </div>
        <p class="order-date">${order.createdAt}</p>
        <span class="order-status delivered">${order.status}</span>
        <p class="order-price">₦${order.total.toLocaleString()}</p>
      </div>
    `
    )
    .join("");

  recentOrdersContainer.innerHTML = `
    <div class="heading">
      <h2>Recent Orders</h2>
      <a href="../order_page/order.html">View All Orders</a>
    </div>
    ${rows || '<p class="empty-state">No orders yet. Place an order from the menu to see it here.</p>'}
  `;
}

document.querySelector(".edit-button")?.addEventListener("click", () => {
  const newProfileData = {
    fullName: document.querySelector("#fullName").value,
    email: document.querySelector("#email").value,
    phoneNumber: document.querySelector("#phone").value,
    password: document.querySelector("#password").value,
  };
  updateProfile(newProfileData);
});

if (passwordInput && toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    const icon = toggleBtn.querySelector("ion-icon");
    if (icon) {
      icon.name = isPassword ? "eye-off" : "eye";
    }
  });
}