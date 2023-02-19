const inputs = document.querySelectorAll(".input");
import validty from "./validty.js";

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
