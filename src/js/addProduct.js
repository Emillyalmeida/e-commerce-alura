const inputs = document.querySelectorAll(".input");
import validty from "./validty.js";

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

const textareas = document.querySelectorAll(".textarea");

textareas.forEach((textarea) =>
  textarea.addEventListener("blur", (e) => {
    validty(e.target);
  })
);
