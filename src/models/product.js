import { listProducts } from "../js/db.js";

const list = (localStorage.getItem("@alurageek/products")) ? JSON.parse(localStorage.getItem("@alurageek/products")) : listProducts

export class Product {
    constructor(name, url, category, price, description){
        this.id = Math.max(...list.map(({id})=> id)) + 1
        this.name = name;
        this.img = url;
        this.price = price;
        this.category = category;
        this.description = description;
    }
}