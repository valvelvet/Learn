"use strict";
class Book {
    constructor(name, price) {
        this.bookName = name;
        this.price = price;
    }
    showInfo() {
        console.log("書名：" + this.bookName + "價格：" + this.price);
    }
}
const book1 = new Book('子兒吐吐', 399);
book1.showInfo();
