import { foods } from "./food.js";
import { cart, updateCart, saveToStorage } from "../cart_page/renderOrder.js";

const sideBar = document.getElementsByClassName('ham')[0];
const menuBtn = document.getElementsByClassName('sidebar-control')[0];
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('close');

menuBtn.addEventListener('click', ()=>{
  if (menu.style.display !== 'none') {
    sideBar.style.display = 'block';
    menu.style.display = 'none';
    closeBtn.style.display = 'block';
  } else{
    sideBar.style.display = 'none';
    menu.style.display = 'block';
    closeBtn.style.display = 'none';
  }
});

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


document.querySelectorAll('.add_btn').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const productId = button.dataset.productId;
    addToCart(productId);
    saveToStorage();
    updateCart();
  })
})

function addToCart(productId){
  let matchingItem;
  cart.forEach((item)=>{
    if(productId === item.productId){
      matchingItem = item;
    }
  });
  if(matchingItem){
    matchingItem.quantity +=1;
  }else{
    cart.push({
      productId,
      quantity : 1
    })
  }
}