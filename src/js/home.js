import validty from "./validty.js";
import listProducts from "./db.js";

const btnLogin = document.querySelector(".header__button");

const containerProduct = document.querySelector(".products");
const categories = [];

const listCategories = () => {
  listProducts.forEach(product=> {
    if(!categories.includes(product.category)){
      categories.push(product.category)
    }
  })
};


const createCardProduct = ( ulProducts,category) => {
  listProducts.forEach(product=> {

    if(product.category == category){
      const liCard = document.createElement("li");
      liCard.classList.add("products__card");
      liCard.innerHTML = 
      `
        <img
          class="products__card-img"
          src=${product.img}
          alt="${product.name}"
        />
        <h3 class="products__card-name">${product.name}</h3>
        <span class="products__card-price">R$ ${product.price.toFixed(2).replace('.',',')}</span>
        <a class="products__card-link" href='./src/pages/product.html?id=${product.id}'>ver produto</a>
      `

      ulProducts.appendChild(liCard);
    }

  })
};

const createDivCategory = () => {
  categories.forEach(category => {
    const divProduct = document.createElement("div");
    divProduct.classList.add("products__category");
    divProduct.id = category;

    const ulProducts = document.createElement("ul");
    ulProducts.classList.add("products__list-card");

    createCardProduct(ulProducts,category);

    divProduct.innerHTML = `<h2 class="products__title">${category}</h2>`
    divProduct.appendChild(ulProducts);

    containerProduct.appendChild(divProduct);
  })
};

listCategories();
createDivCategory();

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
