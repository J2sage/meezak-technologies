import { getProduct } from "../Menu_page/script/food.js";
import { cart } from "../Menu_page/cart_page/renderOrder.js";

function getCurrentOrder() {
  return JSON.parse(localStorage.getItem("currentOrder") || "null");
}

function getOrderItems() {
  const currentOrder = getCurrentOrder();
  if (currentOrder?.items?.length) {
    return currentOrder.items;
  }

  return cart
    .map((cartItem) => {
      const product = getProduct(cartItem.productId);
      if (!product) return null;
      return {
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        image: product.image,
        productId: cartItem.productId,
      };
    })
    .filter(Boolean);
}

export function updateDashboard() {
  const currentOrder = getCurrentOrder();
  const orderStatusElement = document.querySelector('.order-status');
  const orderDateElement = document.querySelector('.order-date');
  const orderIdElement = document.querySelector('.order-id');
  if (orderStatusElement, orderDateElement, orderIdElement) {
    orderStatusElement.innerHTML = `${currentOrder?.status ?? ''}`;
    orderIdElement.innerHTML = `${currentOrder?.id ?? ''}`;
    orderDateElement.innerHTML = `${currentOrder?.createdAt ?? ''}`;
  }

  const orderItems = getOrderItems();
  let dashboardHTML = "";
  let finalTotal = 0;

  orderItems.forEach((item) => {
    const itemPrice = item.price * item.quantity;
    dashboardHTML += `
      <li>
        <div class="item-left">
          <img src="../Menu_page/${item.image}" alt="${item.name}"> ${item.name}
        </div>
        <p class="item-price">₦${itemPrice.toLocaleString()}</p>
      </li>
    `;
    finalTotal += itemPrice;
  });

  const container = document.querySelector(".item-list");
  if (container) {
    container.innerHTML = dashboardHTML || '<li class="empty-state">No active order yet.</li>';
  }

  const totalElement = document.querySelector(".totalPElement");
  if (totalElement) {
    totalElement.innerHTML = `₦${finalTotal.toLocaleString()}`;
  }
}

export function updateOrder() {
  const orderItems = getOrderItems();
  let orderHTML = "";

  if (!orderItems.length) {
    const details = document.querySelector(".details");
    if (details) {
      details.innerHTML = '<p class="empty-state">No active order yet.</p>';
    }
    return;
  }

  orderItems.forEach((item) => {
    orderHTML += `
      <div class="cart-item">
        <div class="product-info">
          <img src="../../Menu_page/${item.image}" alt="${item.name}">
          <div class="text">
            <p class="name">${item.name}</p>
            <p class="stock">In stock</p>
          </div>
        </div>
        <p class="price">₦${item.price.toLocaleString()}</p>
        <div class="quantity">x${item.quantity}</div>
        <p class="total">₦${(item.price * item.quantity).toLocaleString()}</p>
      </div>
    `;
  });

  const details = document.querySelector(".details");
  if (details) {
    details.innerHTML = orderHTML;
  }
}