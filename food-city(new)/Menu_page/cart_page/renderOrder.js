import { getProduct } from "../script/food.js";
export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function updateCart(){
  let cartHTML = ``;
  let finalTotal = 0;
  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    if (!matchingProduct) return;
    let quantityTotal = cartItem.quantity * matchingProduct.price

    cartHTML += `
      <div class="cart" data-product-id='${matchingProduct.id}'>
        <div class="product-info">
          <img src="../${matchingProduct.image}" alt="${matchingProduct.name}">
          <div class="text">
            <p class="name">${matchingProduct.name}</p>
            <p class="stock">In stock</p>
          </div>
        </div>
        <p class="price">₦${matchingProduct.price}</p>
        <div class="quantity">
          <img src="icon/decrease.png" class="decrease" data-product-id='${matchingProduct.id}' alt="decrease-png">
          ${cartItem.quantity}
          <img src="icon/increase.png" class="increase" data-product-id='${matchingProduct.id}' alt="increase-png">
        </div>
        <p class="total">₦${quantityTotal}</p>
        <div class="delete-container">
          <img src="icon/icon-remove-item.png" class="delete" data-product-id='${matchingProduct.id}'>
        </div>
      </div>
    `;

    finalTotal += quantityTotal;
  });

  const container = document.querySelector('.cart-body');
  if (container) {
    container.innerHTML = cartHTML;
  }
  updateorderSummary(finalTotal);
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

if (document.readyState !== 'loading') {
  updateCart();
} else {
  document.addEventListener('DOMContentLoaded', updateCart)
};

const cartBody = document.querySelector('.cart-body');
if (cartBody) {
  cartBody.addEventListener('click', (event) => {
    const increaseBtn = event.target.closest('.increase');
    const decreaseBtn = event.target.closest('.decrease');
    const deleteBtn = event.target.closest('.delete');

    if (increaseBtn) {
      const productId = increaseBtn.dataset.productId;
      const matchingItem = cart.find((item) => item.productId === productId);
      if (matchingItem) {
        matchingItem.quantity += 1;
        saveToStorage();
        updateCart();
      }
      return;
    }

    if (decreaseBtn) {
      const productId = decreaseBtn.dataset.productId;
      const matchingItem = cart.find((item) => item.productId === productId);
      if (matchingItem && matchingItem.quantity > 1) {
        matchingItem.quantity -= 1;
        saveToStorage();
        updateCart();
      }
      return;
    }

    if (deleteBtn) {
      const productId = deleteBtn.dataset.productId;
      delFromCart(productId);
    }
  });
}

function delFromCart(productId){
  const index = cart.findIndex((item) => item.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveToStorage();
    updateCart();
  }
}

function updateorderSummary(finalTotal){
  let shipping;
  if(finalTotal > 10000 <= 0){
    shipping = 0;
  }else{
    shipping = 1000
  }
  let taxP = ((10/100)*finalTotal);
  let orderSummaryHTML = `
    <div class="order-container">
      <h3 class="summary">ORDER SUMMARY</h3>
      <hr class="summary-line">
      <p class="subtotal">
        <b>Subtotal(₦) :</b> <span>${finalTotal}</span>
      </p>
      <p class="tax">
        <b>Tax(10%)(₦) :</b> <span>${taxP}</span>
      </p>
      <p class="shipping">
        <b>Shipping(₦) :</b> <span>${shipping}</span>
      </p>
      <hr>
      <p class="afterTotal">
        <b>Total(₦) :</b> <span>${finalTotal + taxP + shipping}</span>
      </p>
      <button type="button" class="checkout_btn">PROCEED TO CHECKOUT</button>
    </div>
  `;

  const container = document.querySelector('.order');
  if (container) {
    container.innerHTML = orderSummaryHTML;
  }
}

