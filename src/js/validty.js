const validty = (input) => {
  console.log(input.value)
  const typeInput = input.dataset.tipo;

  input.value ? input.classList.add("has-value") : input.classList.remove("has-value")

  console.log(input.classList)

  if (validators[typeInput]) {
    validators[typeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerText = showErrorsMessage(typeInput, input);
  }
};

const validators = {
  age: (input) => oldThan18(input),
  cpf: (input) => isValidCpf(input),
  url: (input) => isValidImage(input)
};

const typesErrors = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "rangeUnderflow",
  "tooLong",
  "tooShort",
  "customError",
];

const errorMessages = {
  name: {
    valueMissing: "O campo de nome não pode estar vazio.",
  },
  email: {
    valueMissing: "O campo de email não pode estar vazio.",
    typeMismatch: "O email digitado não é válido.",
  },
  password: {
    valueMissing: "O campo de senha não pode estar vazio.",
    patternMismatch:
      "A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.",
  },
  age: {
    valueMissing: "O campo de data de nascimento não pode estar vazio.",
    customError: "Você deve ser maior que 18 anos para se cadastrar.",
  },
  passwordConfirm: {
    valueMissing: "O campo de confirmação de senha não pode estar vazio.",
    customError: "As senhas não estão iguais",
  },
  cpf: {
    valueMissing: "O campo de CPF não pode estar vazio.",
    patternMismatch: "Somente numeros no CPF",
    customError: "Digite um cpf valido",
  },
  message: {
    valueMissing: "O campo de menssagem não pode estar vazio.",
  },
  description: {
    valueMissing: "O campo de descrição não pode estar vazio.",
    tooShort: "Caracteres minimos: 20",
    tooLong: "Caracteres minimos: 150"
  },
  price: {
    valueMissing: "O campo de descrição não pode estar vazio.",
    rangeUnderflow: "O preço precisa ser maior que 0",
  },
  url: {
    valueMissing: "O campo de url não pode estar vazio.",
    customError: "Imagem invalida.",
  }
};

const showErrorsMessage = (typeInput, input) => {
  let message = ""
  typesErrors.forEach((error) => {
    if (input.validity[error]) {
      console.log(errorMessages[typeInput][error])
      message = errorMessages[typeInput][error];
    }
  });

  return message
};

const oldThan18 = (input) => {
  const today = new Date();
  const birthday = new Date(input.value);
  const todayMore18 = new Date(
    birthday.getUTCFullYear() + 18,
    birthday.getUTCMonth(),
    birthday.getUTCDate()
  );

  if (todayMore18 > today) {
    input.setCustomValidity(
      "Você deve ser maior que 18 anos para se cadastrar."
    );
  }
  else {
    input.setCustomValidity("");
  }
};

const isValidImage = (input) => {
  const valid = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(input.value)

  valid ? input.setCustomValidity("") : input.setCustomValidity("Imagem invalida.");
}

const isValidCpf = (input) => {
  const cpf = input.value.replace(/\D/g, "");
  let multiplayer = 10;

  // console.log(!verifyVerifications(cpf, multiplayer))

  if (!verifyVerifications(cpf, multiplayer)) {
    console.log('entrou')
    input.setCustomValidity("Digite um cpf valido");
  }
  else {
    input.setCustomValidity("");
  }
};

const verifyVerifications = (cpf, multiplayer) => {
  console.log(multiplayer)
  if (multiplayer == 12) {
    return true;
  }
  let initialMultiplayer = multiplayer;
  let sun = 0;
  const digitsCpf = cpf.substr(0, multiplayer - 1).split("");
  // console.log(digitsCpf)
  const digitVerify = cpf.charAt(multiplayer - 1);

  for (let i = 0; initialMultiplayer > 1; initialMultiplayer--) {
    sun = sun + digitsCpf[i] * initialMultiplayer;
    i++;
  }

  let rest = 11 - (sun % 11)

  if(rest == 10 || rest == 11 ) rest = 0

  if (digitVerify == rest) {
    return verifyVerifications(cpf, multiplayer + 1);
  }
  return false;
};

export default validty;
