import validty from "./validty.js";
import { User } from "../models/user.js";

const inputs = document.querySelectorAll(".input");
const form = document.querySelector(".container__form");

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

  const {name, age, email, password, cpf} = dataCadastro;
  const user = new User(name, email, age, cpf, password);
  localStorage.setItem("@alurageek/user", JSON.stringify(user));

  showToast('success', 'usuário cadastrado com sucesso')
  setTimeout(() => {
    window.location = './login.html'
  }, 2000);
});


function showToast(type, text) {
  const toast = document.getElementById("snackbar");

  toast.innerText = text
  toast.className = `show ${type}`;

  setTimeout(function(){ toast.className = toast.className.replace(`show ${type}`, ""); }, 3000);
}
