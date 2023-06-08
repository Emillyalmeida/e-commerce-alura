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

  console.log(isRegister)

  if(isRegister) {
    const user = new User(isRegister._name, isRegister._email, isRegister._CPF, isRegister._birthday, isRegister._password);
    user.login(email, password)
    localStorage.setItem("@alurageek/user", JSON.stringify(user));
    if(user._autheticaded){
      console.log('logado')
      window.location = './admin.html'
    }
    else {
      console.log('verifique se a senha e o email estão corretos')
    }
  }
  else{
    console.log('não cadastrado')
  }
});
