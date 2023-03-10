import listProducts from "./db.js";

const ulAllProducts = document.querySelector(".products__all");
const modal = document.getElementById("modal");

listProducts.forEach((product)=> {
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
    `
     ulAllProducts.appendChild(liCard)
})

const openModalDelete = () => {
    modal.classList.remove('modal-close')
    modal.classList.add("modal-open")
}

const btnDelete = document.querySelectorAll(".delete");

btnDelete.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e.target.id)
        openModalDelete();
    })
})
