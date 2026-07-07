import { foods } from "./food.js";
import { cart, updateCart, saveToStorage, updateCartQuantity } from "../cart_page/renderOrder.js";

const sideBar = document.getElementsByClassName('ham')[0];
const menuBtn = document.getElementsByClassName('sidebar-control')[0];
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('close');
const logInBox = document.getElementsByClassName('login-box')[0];

renderMenuOption(foods);
updateCartQuantity();

menuBtn.addEventListener('click', ()=>{
  if (menu.style.display !== 'none') {
    sideBar.style.display = 'block';
    menu.style.display = 'none';
    closeBtn.style.display = 'block';
    document.body.classList.add('no-scroll');
  } else{
    sideBar.style.display = 'none';
    menu.style.display = 'block';
    closeBtn.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }
});

function renderMenuOption(foods){

  let foodHTML = ``;
  foods.forEach((food)=>{
    foodHTML+= `
      <div class="card1">
        <img src="${food.image}">
        <p>${food.name}</p>
        <h3><span>₦${food.price}</span> per plate</h3>
        <button class="add_btn" data-product-id = "${food.id}" type="button">Add to Cart</button>
      </div>
    `;
  });

  document.querySelector('.grid_cards')
    .innerHTML = foodHTML;

  attachAddButtons();
}


// document.querySelectorAll('.add_btn').forEach((button)=>{
//   button.addEventListener('click', ()=>{
//     const productId = button.dataset.productId;
//     addToCart(productId);
//     saveToStorage();
//     updateCart();
//   })
// })
function attachAddButtons(){
  document.querySelectorAll('.add_btn').forEach((button)=>{
    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCart();
      updateCartQuantity();
      saveToStorage();
      button.innerHTML = 'Added'
      setTimeout(() => {
        button.innerHTML = 'Add to Cart'
      }, 1000);
    })
  })
}

function addToCart(productId){
  let cartQuantity = 0;
  let matchingItem;
  cart.forEach((item)=>{
    if(productId === item.productId){
      matchingItem = item;
    }
  });
  if(matchingItem){
    matchingItem.quantity +=1;
      cartQuantity += 1;
  }else{
    cart.push({
      productId,
      quantity : 1
    })
    cartQuantity += 1;
  }
}

const normalize = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const searchInputs = document.querySelectorAll('#live-search, #mini-search');
searchInputs.forEach((search)=>{
  search.addEventListener('input', (event)=>{
    const raw = event.target.value || '';
    const filterText = normalize(raw.trim());

    if(filterText === ''){
      renderMenuOption(foods);
      return;
    }

    const filtered = foods.filter((item)=>
      normalize(item.name).includes(filterText)
    );

    if(filtered.length === 0){
      document.querySelector('.grid_cards').innerHTML = `
        <div class="not-available">
          <img src="icons/search_off.png" alt="search-off-image">
          <p>No matching item</p>
        </div>
      `;
    } else {
      renderMenuOption(filtered);
    }
  })
})

