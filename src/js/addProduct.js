import { Product } from "../models/product.js";
import { listProducts, modifyList } from "./db.js";
import validty from "./validty.js";

const inputs = document.querySelectorAll(".input");
const form = document.querySelector(".container__form");

inputs.forEach((input) => {
  // if (input.dataset.tipo == "price") {
  //   SimpleMaskMoney.args = {
  //     allowNegative: false,
  //     negativeSignAfter: false,
  //     prefix: '',
  //     suffix: '',
  //     fixed: true,
  //     fractionDigits: 2,
  //     decimalSeparator: ',',
  //     thousandsSeparator: '.'
  //   };
  // }

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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const dataCadastro = {};
        
  for(let i =0;i<form.length;i++){
    const {name,value} = form[i];
    if(name){
      dataCadastro[name]=value;
    }
  }

  console.log(dataCadastro)

  const { nomeProduto, price, description, url, category } = dataCadastro
  const newProduct = new Product(nomeProduto, url, category, price, description)

  if(localStorage.getItem("@alurageek/products")) {
    modifyList(JSON.parse(localStorage.getItem("@alurageek/products")))
  }

  listProducts.push(newProduct)

  localStorage.setItem("@alurageek/products", JSON.stringify(listProducts))

  window.location = './admin.html'
});
