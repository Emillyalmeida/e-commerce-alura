import validty from "./validty.js";
import banner from "./banner.js";
import { listProducts, modifyList } from "./db.js";

const containerSlides = document.querySelector(".slideshow-container")
const containerDots = document.querySelector(".dots")
const prevBanner = document.querySelector(".prev")
const nextBanner = document.querySelector(".next")

let myTimeout = () => {}

const createSlides = () => {
  banner.forEach((slide)=>{
    const divSlide = document.createElement("div")
    divSlide.classList.add("mySlides","fade")

    divSlide.innerHTML = `<img class="slide__img" src="${slide.img}" style="width:100%">
                          <div class="slide__content">
                            <h1 class="slide__title">${slide.title}</h1>
                            <h3 class="slide__subtitle">
                              ${slide.subtitle}
                            </h3>
                            <a href=#${slide.actionButton}>
                              <button class="slide__button">${slide.textButton}</button> 
                            </a>
                          </div>`

  containerSlides.appendChild(divSlide)
  })
}

const createDots = () => {
  banner.forEach(() => {
    const spanDot = document.createElement("span")
    spanDot.classList.add("dot")

    containerDots.appendChild(spanDot)
  })
}

createSlides()
createDots()

const dots = document.querySelectorAll(".dot")

let slideIndex = 1;
showSlides(slideIndex);

function nextAndPrevSlide(n) {
  clearTimeout(myTimeout)
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearTimeout(myTimeout)
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if(n > slides.length) {slideIndex = 1}

  if(n < 1) {slideIndex = slides.length}

  for(let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for(let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  myTimeout = setTimeout(()=>{showSlides(slideIndex += 1)}, 5000)
}

nextBanner.addEventListener("click", ()=> {
  nextAndPrevSlide(1)
})

prevBanner.addEventListener("click", ()=> {
  nextAndPrevSlide(-1)
})

dots.forEach((dot, index)=> {
  dot.addEventListener("click", () => {
    currentSlide(index + 1)
  })
})


if(localStorage.getItem("@alurageek/products")) {
  modifyList(JSON.parse(localStorage.getItem("@alurageek/products")))
}

const containerProduct = document.querySelector(".products");
const categories = [];

const listCategories = () => {
  listProducts.forEach(product=> {
    if(!categories.includes(product.category)){
      categories.push(product.category)
    }
  })
};


const createCardProduct = ( ulProducts,category) => {
  listProducts.forEach(product=> {

    if(product.category == category){
      const liCard = document.createElement("li");
      liCard.classList.add("products__card");
      const img = product.img.includes('http') ? product.img : `../../${product.img}`

      liCard.innerHTML = 
      `
        <img
          class="products__card-img"
          src=${img}
          alt="${product.name}"
        />
        <h3 class="products__card-name">${product.name}</h3>
        <span class="products__card-price">R$ ${Number(product.price).toFixed(2).replace('.',',')}</span>
        <a class="products__card-link" href='./src/pages/product.html?id=${product.id}'>ver produto</a>
      `

      ulProducts.appendChild(liCard);
    }

  })
};

const createDivCategory = () => {
  categories.forEach(category => {
    const divProduct = document.createElement("div");
    divProduct.classList.add("products__category");
    divProduct.id = category;

    const ulProducts = document.createElement("ul");
    ulProducts.classList.add("products__list-card");

    createCardProduct(ulProducts,category);

    divProduct.innerHTML = `<h2 class="products__title">${category}</h2>`
    divProduct.appendChild(ulProducts);

    containerProduct.appendChild(divProduct);
  })
};

listCategories();
createDivCategory();

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
