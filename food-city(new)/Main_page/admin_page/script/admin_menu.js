import { foods } from "../../../Menu_page/script/food.js";

const normalize = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const selectedCategory = document.getElementById('selectedCategory');
const searchInputElement = document.getElementById('search-input');

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
          <button aria-label="Edit item"><ion-icon name="create"></ion-icon></button>
          <button aria-label="Delete item"><ion-icon name="trash"></ion-icon></button>
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