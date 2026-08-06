import { seedUsers } from "../../../login.js";
import { showNoResults, normalize } from "./admin_menu.js";



const customerBodyElement = document.querySelector('.js-customer-body');
const selectedStatus = document.getElementById('selected-status');
const searchInputElement = document.getElementById('search-input');
const filterButton = document.getElementsByClassName('secondary-btn')[0];


const users = seedUsers();

renderCustomerDetails(users);

function renderCustomerDetails(users){
  let customerDetailsHTML = '';
  let status = '';

  users.filter(customer => customer.role !== 'admin')
    .forEach((user)=>{
      if(user.active){
        status = 'active';
      }else{
        status = 'inactive';
      }
      customerDetailsHTML+=`
        <tr>
          <td class="item-cell">
            <img class="avatar" src="../../Main_page/assets/icons/customer1.png" alt="John Doe">
            <div>
              <div class="customer-name">${user.fullName}</div>
              <div class="customer-email">${user.email}</div>
            </div>
          </td>
          <td>${user.username}</td>
          <td>${user.phoneNumber}</td>
          <td>24</td>
          <td><span class="status-badge ${status}"><ion-icon name="checkmark-circle"></ion-icon> ${status}</span></td>
          <td class="action-buttons">
            <button aria-label="View customer" class='view' data-product-id="${user.username}"><ion-icon name="eye"></ion-icon></button>
          </td>
        </tr>
      `;
    })
  if(customerBodyElement){
    customerBodyElement.innerHTML = customerDetailsHTML;
  }
}

function checkCustomer(){
  const categoryValue = selectedStatus ? selectedStatus.value : 'all';
  const searchValue = searchInputElement ? searchInputElement.value : '';

  // Keep these lowercase for easy comparison
  const normalizedCategory = categoryValue.trim().toLowerCase(); 
  const normalizedSearch = normalize(searchValue.trim());

  let filtered = users;

  if (normalizedCategory !== 'all') {
    filtered = filtered.filter((item) => {
      const itemCategory = item.active ? 'active' : 'inactive';
      
      return itemCategory === normalizedCategory;
    });
  }

  if(normalizedSearch){
    filtered = filtered.filter((item)=>{
      return normalize(item.fullName).includes(normalizedSearch) || 
             normalize(item.username).includes(normalizedSearch) ||
             normalize(item.email).includes(normalizedSearch) ||
             normalize(item.phoneNumber).includes(normalizedSearch);
    })
  }

  if(filtered.length === 0){
    showNoResults();
  }else{
    renderCustomerDetails(filtered);
  }
}

filterButton.addEventListener('click', ()=>{
  checkCustomer();
})

searchInputElement.addEventListener('input', ()=>{
  checkCustomer();
})


if(customerBodyElement){
  customerBodyElement.addEventListener('click', (event)=>{
    const viewButton = event.target.closest('.view');

    if(viewButton){
      const username = viewButton.dataset.productId;

      users.find((user)=> {
        if(user.username === username){
          user.active = !user.active;
          renderCustomerDetails(users);
          checkCustomer();
        }
      })
    }
  })
}
