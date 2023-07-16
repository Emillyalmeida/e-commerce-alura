import { listProducts, modifyList } from "./db.js";
import { User } from "../models/user.js";

const currentUser = JSON.parse(localStorage.getItem("@alurageek/user"));

const ulAllProducts = document.querySelector(".products__all");
const modal = document.getElementById("modal");
const btnCloseModal = document.querySelector(".btn__close-modal");
const btnConfirmDelete = document.querySelector(".btn__delete");
const btnLogout = document.querySelector(".header__button--logout")
const spanUserName = document.querySelector(".user__name")

spanUserName.innerText = currentUser._name

btnLogout.addEventListener("click", () => {
  const user = new User(currentUser._name, currentUser._email, currentUser._CPF, currentUser._birthday, currentUser._password);
  user.logout()
  localStorage.setItem("@alurageek/user", JSON.stringify(user));
  showToast('success','você foi deslogado!')
  setTimeout(() => {
    window.location = "../../index.html"
  }, 2000);
})

const mountedListProducts = (listProduct) => {
  ulAllProducts.innerHTML = "";
  listProduct.forEach((product)=> {
    const liCard = document.createElement("li");
    liCard.classList.add("products__card--admin");

    const img = product.img.includes('http') ? product.img : `../../${product.img}`

    liCard.innerHTML = 
    `
      <img
        class="products__card-img--admin"
        src=${img}
        alt="${product.name}"
      />
      <h3 class="products__card-name">${product.name}</h3>
      <span class="products__card-price">R$ ${Number(product.price).toFixed(2).replace('.',',')}</span>
      <button class="btn__action edit">
        <i data-id=${product.id} class="fa-solid fa-pen"></i>
      </button>
      <button class="btn__action delete">
        <i id=${product.id} class="fa-solid fa-trash"></i>
      </button>
    `;
     ulAllProducts.appendChild(liCard);
  })
  const btnDelete = document.querySelectorAll(".delete");
  const btnEdit = document.querySelectorAll(".edit");

  btnDelete.forEach((btn) => {
      btn.addEventListener('click', (e) => {
          openModalDelete(e.target.id);
      });
  });

  btnEdit.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      window.location = `./editProduct.html?id=${e.target.dataset.id}`;
    });
});
}

if(localStorage.getItem("@alurageek/products")) {
 modifyList(JSON.parse(localStorage.getItem("@alurageek/products")))
}

mountedListProducts(listProducts)

const openModalDelete = (idProduto) => {
    modal.classList.remove("modal-close");
    modal.classList.add("modal-open");
    btnConfirmDelete.dataset.id = idProduto;
};

const closeModalDelete = () => {
  modal.classList.remove("modal-open")
  modal.classList.add("modal-close")
};


btnCloseModal.addEventListener("click", () => {
  closeModalDelete();
});

btnConfirmDelete.addEventListener("click", (e) => {
  const findProduct = listProducts.findIndex(product => product.id == e.target.dataset.id);
  listProducts.splice(findProduct, 1);
  localStorage.setItem("@alurageek/products", JSON.stringify(listProducts))
  mountedListProducts(listProducts);
  closeModalDelete();
  showToast('success','Produto excluido')
})

function showToast(type, text) {
  const toast = document.getElementById("snackbar");

  toast.innerText = text
  toast.className = `show ${type}`;

  setTimeout(function(){ toast.className = toast.className.replace(`show ${type}`, ""); }, 3000);
}
