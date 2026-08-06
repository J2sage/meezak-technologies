import { getCustomersFromApi, updateCustomerActive } from '../../../data/admin-api.js';

/* ============================================================
   LOCAL ADMIN CUSTOMER FLOW — COMMENTED OUT FOR COMPARISON
   ============================================================
   The old version used seedUsers() and changed active status locally.
*/

/* ============================================================
   API ADMIN CUSTOMER FLOW — ACTIVE
   ============================================================
*/
const customerBodyElement = document.querySelector('.js-customer-body');
const selectedStatus = document.getElementById('selected-status');
const searchInputElement = document.getElementById('search-input');
const filterButton = document.getElementsByClassName('secondary-btn')[0];
let customers = [];

const showNoResults = () => {
  if (customerBodyElement) customerBodyElement.innerHTML = '<tr><td colspan="6">No matching customers</td></tr>';
};

function renderCustomerDetails(list) {
  if (!customerBodyElement) return;
  customerBodyElement.innerHTML = list.map((customer) => {
    const status = customer.active ? 'active' : 'inactive';
    return `
      <tr>
        <td class="item-cell"><img class="avatar" src="../../Main_page/assets/icons/customer1.png" alt="${customer.name}"><div><div class="customer-name">${customer.name}</div><div class="customer-email">${customer.email}</div></div></td>
        <td>${customer.name}</td>
        <td>${customer.phone || ''}</td>
        <td>${customer.totalOrders || 0}</td>
        <td><button class="status-badge ${status}" data-customer-id="${customer.id}" data-active="${customer.active}"><ion-icon name="checkmark-circle"></ion-icon> ${status}</button></td>
        <td class="action-buttons"><button aria-label="View customer" class="view" data-customer-id="${customer.id}"><ion-icon name="eye"></ion-icon></button></td>
      </tr>
    `;
  }).join('');
}

async function loadCustomers() {
  try {
    customers = await getCustomersFromApi({
      q: searchInputElement?.value.trim() || '',
      active: selectedStatus?.value || 'all'
    });
    if (!customers.length) return showNoResults();
    renderCustomerDetails(customers);
  } catch (error) {
    if (customerBodyElement) customerBodyElement.innerHTML = `<tr><td colspan="6">${error.message}</td></tr>`;
  }
}

filterButton?.addEventListener('click', loadCustomers);
searchInputElement?.addEventListener('input', loadCustomers);

customerBodyElement?.addEventListener('click', async (event) => {
  const statusButton = event.target.closest('.status-badge');
  if (!statusButton) return;

  try {
    await updateCustomerActive(statusButton.dataset.customerId, statusButton.dataset.active !== 'true');
    await loadCustomers();
  } catch (error) {
    alert(error.message || 'Could not update customer status.');
  }
});

loadCustomers();
