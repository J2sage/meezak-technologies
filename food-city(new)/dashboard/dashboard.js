import { getProduct } from '../Menu_page/script/food.js';
import { cart } from '../Menu_page/cart_page/renderOrder.js';

export function updateDashboard(){
  let dashboardHTML = ``;
  let finalTotal = 0;
  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    if(!matchingProduct) return;
    let quantityTotal = cartItem.quantity * matchingProduct.price;

    dashboardHTML +=`
      <li>
        <div class="item-left">
          <img src="../Menu_page/${matchingProduct.image}" alt="Fried Rice"> ${matchingProduct.name}</span>
        </div>
        <p class="item-price">₦${(matchingProduct.price * cartItem.quantity).toLocaleString()}</p>
      </li>
    `;

    finalTotal += quantityTotal;
  })

  const container = document.querySelector('.item-list');
  if(container){
    container.innerHTML = dashboardHTML;
  }
  document.querySelector('.totalPElement') && (document.querySelector('.totalPElement')
    .innerHTML = `₦${(finalTotal).toLocaleString()}`)
}

export function updateOrder(){
  let orderHTML = ``;
  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    if(!matchingProduct) return;

    orderHTML += `
      <div class="cart-item">
        <div class="product-info">
          <img src="../../Menu_page/${matchingProduct.image}" alt="${matchingProduct.name}">
          <div class="text">
            <p class="name">${matchingProduct.name}</p>
            <p class="stock">In stock</p>
          </div>
        </div>
        <p class="price">₦${(matchingProduct.price).toLocaleString()}</p>
        <div class="quantity">
          x${cartItem.quantity}
        </div>
        <p class="total">₦${(matchingProduct.price * cartItem.quantity).toLocaleString()}</p>
      </div>
    `;
  });

  document.querySelector('.details') && (document.querySelector('.details')
    .innerHTML = orderHTML);
}

  const currentPath = window.location.pathname;
  console.log(currentPath);