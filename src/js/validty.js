const validty = (input) => {
  const typeInput = input.dataset.tipo;

  if (validators[typeInput]) {
    validators[typeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerHTML =
      showErrorsMessage(typeInput, input);
  }
};

const validators = {
  age: (input) => oldThan18(input),
  cpf: (input) => isValidCpf(input),
};

const typesErrors = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "rangeUnderflow",
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
  dataNascimento: {
    valueMissing: "O campo de data de nascimento não pode estar vazio.",
    customError: "Você deve ser maior que 18 anos para se cadastrar.",
  },
  confirmPassword: {
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
  },
  price: {
    valueMissing: "O campo de descrição não pode estar vazio.",
    rangeUnderflow: "O preço precisa ser maior que 0",
  },
};

const showErrorsMessage = (typeInput, input) => {
  typesErrors.forEach((error) => {
    if (input.validity[error]) {
      return errorMessages[typeInput][error];
    }
  });
};

const oldThan18 = () => {
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
};

const isValidCpf = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  let multiplyer = 10;

  if (!verifyVerifications(cpf, multiplyer)) {
    input.setCustomValidity("Digite um cpf valido");
  }
};

const verifyVerifications = (cpf, multiplyer) => {
  let initialMultiplayer = multiplyer;
  let sun = 0;
  const digitsCpf = cpf.substr(0, multiplyer - 1).split("");
  const digitVerify = cpf.charAt(multiplyer - 1);

  for (let i = 0; initialMultiplayer > 1; initialMultiplayer--) {
    soma = soma + digitsCpf[i] * initialMultiplayer;
    i++;
  }

  if (digitVerify == 11(sun % 11)) {
    if (multiplyer == 11) {
      return true;
    }
    return verifyVerifications(cpf, multiplyer++);
  }
  return false;
};

export default validty;
