import validty from "./validty.js";
import { listProducts, modifyList } from "./db.js";

if(localStorage.getItem("@alurageek/products")) {
  modifyList(JSON.parse(localStorage.getItem("@alurageek/products")))
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

const ulSugestions = document.querySelector(".products__list-card");
const productDetails = document.querySelector(".product-details")


const product = listProducts.find(product => product.id == id)
console.log(product)

const img = product.img.includes('http') ? product.img : `../../${product.img}`


productDetails.innerHTML = 
`
<div class="product-details__content">
    <img class="details__img" src=${img} alt=${product.name}>
    <div class="details__info">
        <h3 class="product__name">${product.name}</h3>
        <span class="product__price">R$ ${Number(product.price).toFixed(2).replace('.',',')}</span>
        <p class="product__description" >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        <button class="product__buy">Comprar</button>
    </div>
</div>
`

const createCardProduct = ( ulProducts,category) => {
  listProducts.forEach(product=> {

    if(product.category == category){
      const liCard = document.createElement("li");
      liCard.classList.add("products__card");

      const img = product.img.includes('http') ? product.img : `../../${product.img}`

      liCard.innerHTML = 
      `
        <img
          class="products__card-img"
          src=${img}
          alt="${product.name}"
        />
        <h3 class="products__card-name">${product.name}</h3>
        <span class="products__card-price">R$ ${Number(product.price).toFixed(2).replace('.',',')}</span>
        <a class="products__card-link" href='./product.html?id=${product.id}'>ver produto</a>
      `

      ulProducts.appendChild(liCard);
    }

  })
};

createCardProduct(ulSugestions, product.category)

btnLogin.addEventListener("click", () => {
    window.location.href = "./src/pages/login.html";
  });
  
  const inputs = document.querySelectorAll(".input");
  
  inputs.forEach((input) => {
    input.addEventListener("blur", (e) => {
      validty(e.target);
    });
  });
  
  const textareas = document.querySelectorAll(".textarea");
  
  textareas.forEach((textarea) =>
    textarea.addEventListener("blur", (e) => {
      validty(e.target);
    })
  );