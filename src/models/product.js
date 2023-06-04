import { listProducts } from "../js/db.js";

export class Product {
    constructor(name, url, category, price, description){
        this.id = Math.max(...listProducts.map(({id})=> id)) + 1
        this.name = name;
        this.img = url;
        this.price = price;
        this.category = category;
        this.description = description;
    }
}