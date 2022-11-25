import validty from "./validty.js";

const btnLogin = document.querySelector(".header__button");

btnLogin.addEventListener("click", () => {
  window.location.href = "./src/pages/login.html";
});

const inputs = document.querySelectorAll(".input");

inputs.forEach((input) => {
  if (input.dataset.tipo == "price") {
    SimpleMaskMoney.setMask(input, {
      prefix: "R$ ",
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ",",
      thousandsSeparator: ".",
      cursor: "end",
    });
  }

  input.addEventListener("blur", (e) => {
    validty(e.target);
  });
});

const textareas = ocument.querySelectorAll(".textarea");

textareas.forEach((textarea) =>
  textarea.addEventListener("blur", (e) => {
    validty(e.target);
  })
);
