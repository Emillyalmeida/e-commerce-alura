import validty from "./validty.js";

const btnLogin = document.querySelector(".header__button");

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
