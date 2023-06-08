import validty from "./validty.js";
import { listProducts, modifyList } from "./db.js";

if(localStorage.getItem("@alurageek/products")) {
  modifyList(JSON.parse(localStorage.getItem("@alurageek/products")))
}

const inputs = document.querySelectorAll(".input");
const form = document.querySelector(".container__form");

const title = document.querySelector(".container__legend--start")

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

const product = listProducts.find(product => product.id == id)

title.innerText = product.name

console.log(product)

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

for(let i =0;i<form.length;i++){
    const {name} = form[i]

    if(product[name]) {
        form[i].value = product[name]
    }

    form[i].value ? form[i].classList.add("has-value") : form[i].classList.remove("has-value")
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const dataCadastro = {};
        
  for(let i =0;i<form.length;i++){
    const {name,value} = form[i];
    if(name) {
      dataCadastro[name]=value;
    }
  }

  const { name, price, description, img, category } = dataCadastro

  console.log(dataCadastro)

  const findProduct = listProducts.findIndex(item => item.id === product.id)

  listProducts[findProduct] = {
    id: product.id,
    name: name,
    img: img,
    price: price,
    description: description,
    category: category
  }

  modifyList(listProducts)
  localStorage.setItem("@alurageek/products", JSON.stringify(listProducts))

  window.location = './admin.html'
});
  
  