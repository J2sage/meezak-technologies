export function getProduct(productId) {
  let matchingProduct;

  foods.forEach((product)=>{
    if(product.id === productId){
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export const foods = [{
  id: '01',
  image: 'assets/foodcard1.webp',
  name: 'Fried Rice',
  price: 3500
},{
  id: '02',
  image: 'assets/foodcard2.webp',
  name: "City's special rice",
  price: 4500
},{
  id: '03',
  image: 'assets/foodcard3.webp',
  name: 'Singaporean noodles',
  price: 4000
},{
  id: '04',
  image: 'assets/foodcard4.webp',
  name: "Grandma's Special Rice",
  price: 4500
},{
  id: '05',
  image: 'assets/foodcard5.webp',
  name: 'Village Rice',
  price: 4500
},{
  id: '06',
  image: 'assets/foodcard6.webp',
  name: 'Jollof Rice',
  price: 3500
},{
  id: '07',
  image: 'assets/foodcard7.webp',
  name: 'Basmatic Jollof Rice',
  price: 4800
},{
  id: '08',
  image: 'assets/foodcard8.webp',
  name: 'Ofada Rice & Sauce',
  price: 8400
},{
  id: '09',
  image: 'assets/foodcard9.webp',
  name: 'Yam',
  price: 1500
},{
  id: '10',
  image: 'assets/foodcard10.webp',
  name: 'Yam Porridge',
  price: 3000
}];

