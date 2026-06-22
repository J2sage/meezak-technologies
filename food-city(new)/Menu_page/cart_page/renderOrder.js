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
      const matchingItem = getProduct(productId);
      document.body.classList.add('no-scroll');
      const backdrop =  document.querySelector('.remove-container-backdrop');
      backdrop.classList.add('show');
      if (!matchingItem) return;
      
      let removeContainerHTML;

      removeContainerHTML = `
        <h3>Remove item from cart</h3>
        <hr>
        <p>Do you wish to remove this item from your cart?</p>
        <div class="remove-img-container">
          <img src="../${matchingItem.image}" alt="food-image" class="remove-img">
        </div>
        <div class="confirmation">
          <p class="cancel">No, Cancel</p>
          <p class="confirm" data-product-id='${matchingItem.id}'>Yes, Remove</p>
        </div>
      `;
      const removeContainer = document.querySelector('.remove-container');
      
      removeContainer.innerHTML = removeContainerHTML;
      removeContainer.style.display = 'block';

      const container = document.querySelector('.container');
      if(container){
        container.setAttribute('inert', '');
      }
      // delFromCart(productId);
    }
  });
}

const removeContainer = document.querySelector('.remove-container');
if (removeContainer) {
  removeContainer.addEventListener('click', (event) => {
    const cancel = event.target.closest('.cancel');
    const confirm = event.target.closest('.confirm');

    document.body.classList.remove('no-scroll');

    const backdrop =  document.querySelector('.remove-container-backdrop');
    backdrop.classList.remove('show');

    if (cancel) {
      removeContainer.style.display = 'none';
      const container = document.querySelector('.container');
      if(container){
        container.removeAttribute('inert');
      }
      return;
    }

    if (confirm) {
      const productId = confirm.dataset.productId;
      delFromCart(productId);
      removeContainer.style.display = 'none';

      const container = document.querySelector('.container');
      if(container){
        container.removeAttribute('inert');
      }
    }
  });
}

function delFromCart(productId){

  const index = cart.findIndex((item) => item.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveToStorage();
    updateCart();
    updateCartQuantity();
  }
}
export function updateCartQuantity(params) {
  let cartQuantitys = 0;
  cart.forEach((item)=>{
    cartQuantitys += item.quantity
  });

  const CQ = document.querySelector('#cart-quantity');
    CQ.innerHTML = cartQuantitys;
}

function updateorderSummary(finalTotal){
  let shipping;
  if(finalTotal > 10000 || finalTotal <= 0){
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

