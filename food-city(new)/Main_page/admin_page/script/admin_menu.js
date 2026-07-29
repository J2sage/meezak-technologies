import { foods, saveFoodStorage } from "../../../Menu_page/script/food.js";

const normalize = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
let currentEditingId = null;

const selectedCategory = document.getElementById('selectedCategory');
const searchInputElement = document.getElementById('search-input');
const addItem = document.querySelector('.add-item-btn');
const popUp = document.getElementById('add-item-container');
const overlay = document.querySelector('.popup-overlay');
const closeBtn = document.querySelector('.close-popup');
const cancelBtn = document.querySelector('.cancel-btn');
const submitBtn = document.querySelector('.submit-btn');
const popupForm = document.querySelector('.popup');
const itemName = document.getElementById('name');
const itemPrice = document.getElementById('price');
const itemCategory = document.getElementById('category');
const itemImage = document.getElementById('image-upload');

function renderAdminMenu(items){
  let itemHTML = '';

  items.forEach((foodItem)=>{
    itemHTML+=`
      <tr>
        <td class="item-cell">
          <img class="item-avatar" src="../../Main_page/${foodItem.image}" alt="Margherita Pizza">
          <div>
            <div class="item-name">${foodItem.name}</div>
            <div class="item-category">${foodItem.category}</div>
          </div>
        </td>
        <td>${foodItem.category}</td>
        <td>₦${foodItem.price}</td>
        <td><span class="status-badge available"><ion-icon name="checkmark-circle"></ion-icon> Available</span></td>
        <td class="action-buttons">
          <button type="button" aria-label="Edit item" class="edit-item" data-product-id="${foodItem.id}"><ion-icon name="create"></ion-icon></button>
          <button type="button" class="delete-item" aria-label="Delete item" data-product-id="${foodItem.id}"><ion-icon name="trash"></ion-icon></button>
        </td>
      </tr>
    `;
  });
  
  const itemBody = document.querySelector('.js-item-body');
  if(itemBody){
    itemBody.innerHTML = itemHTML;
  }
}

function showNoResults(){
  document.querySelector('.js-item-body').innerHTML = `
    <div class="not-available">
      <img src="../../../Menu_page/icons/search_off.png" alt="search-off-image">
      <p>No matching item</p>
    </div>
  `;
}

function checkArray(){
  const categoryValue = selectedCategory ? selectedCategory.value : 'all';
  const searchValue = searchInputElement ? searchInputElement.value : '';

  const normalizedCategory = normalize(categoryValue.trim());
  const normalizedSearch = normalize(searchValue.trim());

  let filtered = foods;

  if(normalizedCategory !== 'all'){
    filtered = filtered.filter((item)=> normalize(item.category).includes(normalizedCategory));
  }

  if(normalizedSearch){
    filtered = filtered.filter((item)=>{
      return normalize(item.name).includes(normalizedSearch) || normalize(item.category).includes(normalizedSearch);
    });
  }

  if(filtered.length === 0){
    showNoResults();
  } else {
    renderAdminMenu(filtered);
  }
}

renderAdminMenu(foods);

if(selectedCategory){
  selectedCategory.addEventListener('change', checkArray);
}

if(searchInputElement){
  searchInputElement.addEventListener('input', checkArray);
}

const toggleMenuPopup = ()=>{
  overlay?.classList.toggle('show');
  popUp?.classList.toggle('show-popup');
  document.body.classList.toggle('sidebar-open');
}

addItem?.addEventListener('click', toggleMenuPopup);
closeBtn?.addEventListener('click', toggleMenuPopup);
cancelBtn?.addEventListener('click', toggleMenuPopup);


submitBtn?.addEventListener('click', (event) => {
  event.preventDefault();

  if (currentEditingId) {
    const itemIndex = foods.findIndex((item) => item.id === currentEditingId);

    if (itemIndex !== -1) {
      foods[itemIndex] = {
        ...foods[itemIndex],
        name: itemName?.value?.trim() || foods[itemIndex].name,
        price: Number(itemPrice?.value) || foods[itemIndex].price,
        category: itemCategory?.value?.trim() || foods[itemIndex].category
      };
    }
  } else {
    const newItem = {
      id: `item-${Date.now()}`,
      image: itemImage?.files?.[0] ? 'assets/foodcard1.webp' : 'assets/foodcard1.webp',
      name: itemName?.value?.trim() || 'New Item',
      price: Number(itemPrice?.value) || 0,
      category: itemCategory?.value?.trim() || 'Uncategorized'
    };
    foods.push(newItem);
  }

  saveFoodStorage();
  renderAdminMenu(foods);
  popupForm?.reset();
  toggleMenuPopup();
  currentEditingId = null;
});


document.querySelector('.js-item-body')?.addEventListener('click', (event) => {
  const deleteBtn = event.target.closest('.delete-item');
  const editBtn = event.target.closest('.edit-item');

  if(deleteBtn){
    const productId = deleteBtn.dataset.productId;
    const index = foods.findIndex((item) => item.id === productId);

    if (index !== -1) {
      foods.splice(index, 1);
      saveFoodStorage();
      renderAdminMenu(foods);
    }
    return;
  }
  
  if(editBtn){
    const productId = editBtn.dataset.productId;
    currentEditingId = productId;
    const targetItem = foods.find((item)=> item.id === productId);
    if(targetItem){
      itemName.value = targetItem.name;
      itemCategory.value = targetItem.category;
      itemPrice.value = targetItem.price;

      toggleMenuPopup();
    }
  }
});