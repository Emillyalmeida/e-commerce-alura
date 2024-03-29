import { User } from "../models/user.js";
import validty from "./validty.js";

const inputs = document.querySelectorAll(".input");
const isRegister = JSON.parse(localStorage.getItem("@alurageek/user"));
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
  const dataLogin = {};
        
  for(let i =0;i<form.length;i++){
    const {name,value} = form[i];
    if(name){
      dataLogin[name]=value;
    }
  }

  const { email, password } = dataLogin;

  if(isRegister) {
    const user = new User(isRegister._name, isRegister._email, isRegister._CPF, isRegister._birthday, isRegister._password);
    user.login(email, password)
    localStorage.setItem("@alurageek/user", JSON.stringify(user));
    if(user._autheticaded){
      showToast('success','Usuário logado')
      setTimeout(() => {
        window.location = './admin.html'
      }, 2000);
    }
    else {
      showToast('error','verifique se a senha e o email estão corretos')
    }
  }
  else{
    showToast('error','email não cadastrado')
  }
});

function showToast(type, text) {
  const toast = document.getElementById("snackbar");

  toast.innerText = text
  toast.className = `show ${type}`;

  setTimeout(function(){ toast.className = toast.className.replace(`show ${type}`, ""); }, 3000);
}
