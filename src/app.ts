// 若安裝的第三方是以 js寫的，ts認不得將無法 import，需經過"聲明文件"翻譯後 ts才能使用
// DTS聲明文件，ex: XXX.d.ts
// 或嘗試搜尋翻譯包 ex: npm i —save-dev @types/lodash
import _ from "lodash";

// 若找不到翻譯包的最後手段，declare強制 ts認識這個字
declare const someThingGlobalFromOtherJS: string;

console.log(_.shuffle([0, 1, 2, 3, 4]));

console.log(someThingGlobalFromOtherJS);

// --------------------------------------------------------------------------------------------
import { Product } from "./product.model";

const p1 = new Product("Weeee", 22);
console.log(p1.getInfo());

// ------------------------------------------------
// 若資料是由外部提供的 json檔
const products = [
  { title: "Book", price: 199 },
  { title: "Eraser", price: 12 },
  { title: "Paper Box", price: 38 },
];

const productList = products.map((prod) => {
  return new Product(prod.title, prod.price);
});

for (const prod of productList) {
  console.log(prod.getInfo());
}

// // ------------------------------------------------
// // 套件：class transformer
// import "reflect-metadata";

// // ------------------------------------------------
// // 套件：class validate
// import { validate } from "class-validator";
