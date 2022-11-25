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
