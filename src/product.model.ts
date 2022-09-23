
// ------------------------------------------------
// 套件：class validate
// import { ... } from "class-validator";

export class Product {
  constructor(public title: string, public price: number) {}

  getInfo() {
    return [this.title, `$ ${this.price}`];
  }
}
