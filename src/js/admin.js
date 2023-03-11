import listProducts from "./db.js";

const ulAllProducts = document.querySelector(".products__all");
const modal = document.getElementById("modal");
const btnCloseModal = document.querySelector(".btn__close-modal");
const btnConfirmDelete = document.querySelector(".btn__delete");

const mountedListProducts = (listProduct) => {
  ulAllProducts.innerHTML = "";
  listProduct.forEach((product)=> {
    const liCard = document.createElement("li");
    liCard.classList.add("products__card--admin");

    liCard.innerHTML = 
    `
      <img
        class="products__card-img--admin"
        src=../../${product.img}
        alt="${product.name}"
      />
      <h3 class="products__card-name">${product.name}</h3>
      <span class="products__card-price">R$ ${product.price.toFixed(2).replace('.',',')}</span>
      <button class="btn__action edit">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="btn__action delete">
        <i id=${product.id} class="fa-solid fa-trash"></i>
      </button>
    `;
     ulAllProducts.appendChild(liCard);
  })
  const btnDelete = document.querySelectorAll(".delete");

  btnDelete.forEach((btn) => {
      btn.addEventListener('click', (e) => {
          console.log(e.target.id)
          openModalDelete(e.target.id);
      });
  });
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
  mountedListProducts(listProducts);
  closeModalDelete();
})
