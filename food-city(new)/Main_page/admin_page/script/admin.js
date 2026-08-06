import { showNoResults, normalize } from "./admin_menu.js";

const adminContainer = document.querySelector('#admin-list');
const searchInputElement = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const countReceived = document.getElementById('countReceived');
const countPreparing = document.getElementById('countPreparing');
const countDelivering = document.getElementById('countDelivering');
const countDelivered = document.getElementById('countDelivered');

function updateNumbers(){
  let confirmed = 0;
  let being_prepared = 0;
  let on_the_way = 0;
  let delivered = 0;

  
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  orders.forEach(order =>{
    if(order.status === 'Confirmed'){
      confirmed +=1;
    }else if(order.status === 'Preparing'){
      being_prepared +=1;
    } else if(order.status === 'On-the-Way'){
      on_the_way +=1;
    }else if(order.status === 'Delivered'){
      delivered +=1;
    }
  })

  if(countReceived, countPreparing, countDelivering, countDelivered){
    countReceived.innerHTML = confirmed;
    countPreparing.innerHTML = being_prepared;
    countDelivering.innerHTML = on_the_way;
    countDelivered.innerHTML = delivered;
  }

}

function displayCustomerOrders(orderList){
  if (!adminContainer) return;

  adminContainer.innerHTML = ''; 

  if (orderList.length === 0) {
    adminContainer.innerHTML = `
      <div class="no-orders-message">
        <p>No orders found in this category.</p>
      </div>
    `;
    return;
  }

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
          <span class="status-badge ${order.status.toLowerCase()}" data-product-id="${order.id}"><ion-icon name="checkmark-circle"></ion-icon> ${order.status}</span>
        </td>
      </tr>
    `;

    adminContainer.innerHTML = orderListHTML;
  })
}

function initializeAdminPanel() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  displayCustomerOrders(orders);
  updateNumbers();
}

window.addEventListener('storage', (event) => {
  if (event.key === 'orders' && event.newValue) {
    const updatedOrders = JSON.parse(event.newValue);
    displayCustomerOrders(updatedOrders);
    updateNumbers();
  }
});


initializeAdminPanel();

filterButtons.forEach(button =>{
  button.addEventListener('click', ()=>{
    document.querySelector('.filter-buttons .active').classList.remove('active');
    event.target.classList.add('active');

    const filterValue = event.target.dataset.filter;
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    updateNumbers();

    let filteredOrders = orders;

    if (filterValue !== 'all') {
      filteredOrders = orders.filter(order => {
        if (filterValue === 'received') return order.status === 'Confirmed';
        if (filterValue === 'preparing') return order.status === 'Preparing';
        if (filterValue === 'on-the-way') return order.status === 'On-the-Way';
        if (filterValue === 'delivered') return order.status === 'Delivered';
        return false;
      });
    }

    displayCustomerOrders(filteredOrders);
    updateNumbers();
  })
})

searchInputElement.addEventListener('input', ()=>{
  const searchValue = searchInputElement ? searchInputElement.value : '';
  const normalizedSearch = normalize(searchValue.trim());
  
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  let filtered = orders;

  if(normalizedSearch){
    filtered = filtered.filter((order)=>{
      return normalize(order.customerName).includes(normalizedSearch) || normalize(order.id).includes(normalizedSearch)
    })
  }

  if(filtered.length === 0){
      showNoResults();
    } else {
      displayCustomerOrders(filtered);
    }
})

if (adminContainer) {
  adminContainer.addEventListener('click', (event) => {
    const statusButton = event.target.closest('.status-badge');
    if (!statusButton) return;

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const matchingItem = orders.find(item => item.id === statusButton.dataset.productId);

    if (matchingItem) {
      if(matchingItem.status === 'Confirmed'){
        matchingItem.status = 'Preparing';
      }else if(matchingItem.status === 'Preparing'){
        matchingItem.status = 'On-the-Way';
      } else if(matchingItem.status === 'On-the-Way'){
        matchingItem.status = 'Delivered';
      }else if(matchingItem.status === 'Delivered'){
        orders = orders.filter(item => item.id !== statusButton.dataset.productId);
      }
      
      displayCustomerOrders(orders);
      updateNumbers();
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  });
}



