function displayCustomerOrders(orderList){
  const adminContainer = document.querySelector('#admin-list');
  if (!adminContainer) return;

  let orderListHTML = ``;

  orderList.forEach(order => {
    const itemsHtml = order.items.map(item => `
      <li class="admin-item-row">
        <span class="item-qty">${item.quantity}x</span> 
        <span class="item-name">${item.name}</span>
      </li>
    `).join('');

    orderListHTML+=`
      <tr>
        <td class="order-id">${order.id}</td>
        <td>
            <div class="customer">
              <span class="name">${order.customerName}</span>
              <span class="email">${order.email}</span>
            </div>
        </td>
        <td>${itemsHtml}</td>
        <td class="price"><strong>₦${order.total}</strong></td>
        <td>
          <span class="status-badge ${order.status.toLowerCase()}" ><ion-icon name="checkmark-circle"></ion-icon> ${order.status}</span>
        </td>
      </tr>
    `;

    adminContainer.innerHTML = orderListHTML;
  })
}

function initializeAdminPanel() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  displayCustomerOrders(orders);
}

window.addEventListener('storage', (event) => {
  if (event.key === 'orders' && event.newValue) {
    const updatedOrders = JSON.parse(event.newValue);
    displayCustomerOrders(updatedOrders);
  }
});



initializeAdminPanel();