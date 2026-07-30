import { seedUsers } from "../../../login.js";
import { showNoResults, normalize } from "./admin_menu.js";



const customerBodyElement = document.querySelector('.js-customer-body');
const selectedStatus = document.getElementById('selected-status');
const searchInputElement = document.getElementById('search-input');
const fitlterButton = document.getElementsByClassName('secondary-btn')[0];

const users = seedUsers();

renderCustomerDetails(users);

function renderCustomerDetails(users){
  let customerDetailsHTML = '';

  users.filter(customer => customer.role !== 'admin')
    .forEach((user)=>{
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
          <td><span class="status-badge active"><ion-icon name="checkmark-circle"></ion-icon> Active</span></td>
          <td class="action-buttons">
            <button aria-label="View customer"><ion-icon name="eye"></ion-icon></button>
            <button aria-label="Delete customer"><ion-icon name="trash"></ion-icon></button>
          </td>
        </tr>
      `;
    })
  if(customerBodyElement){
    customerBodyElement.innerHTML = customerDetailsHTML;
  }
}

function checkCustomer(){
  const categoryValue = selectedStatus? selectedStatus.value : 'all';
  const searchValue = searchInputElement? searchInputElement.value : '';

  const normalizedCategory = normalize(categoryValue.trim());
  const normalizedSearch = normalize(searchValue.trim());

  let filtered = users;
  
}