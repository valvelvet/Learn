// Advanced Types
// More About Types 關於型別
// ---------------------------------------------------------------------------------------------------------
// &：交集運算符
// 用在 object 的情況
type IceAndSuger = {
  // interface IceAndSuger { ...
  suger: number;
  ice: number;
};
type BaseDrink = {
  // interface BaseDrink { ...
  suger: number;
  tea: string;
  milk: boolean;
  booble: boolean;
};
// interface DrinkOrder extends IceAndSuger, BaseDrink {}
type DrinkOrder = IceAndSuger & BaseDrink;

const myDrinkOrder: DrinkOrder = {
  ice: 3,
  suger: 10,
  tea: "冬瓜茶",
  milk: false,
  booble: true,
};

// 用在 聯合類型 的情況
type A_ID = number | string;
type B_ID = number | boolean;
type C_ID = A_ID & B_ID; // type C_ID = number

// 用在 class 的情況
class IcePop {
  iceName = "冰棒";
  constructor(public outPackage: string) {}
  melting() {
    console.log("冰棒融化中...");
  }
}
class ShavedIce {
  iceName = "剉冰";
  toppings() {
    console.log("我要加料！");
  }
}
type SweatIce = IcePop & ShavedIce;
function makeSweatIce(ice: SweatIce) {
  console.log(ice.iceName);
  console.log(ice.outPackage);
  ice.toppings();
  ice.melting();
}
const NewIceCream: SweatIce = {
  iceName: "冰激淋",
  outPackage: "甜筒",
  melting() {
    console.log("冰激淋融化中...");
  },
  toppings() {
    console.log("加料");
  },
};
makeSweatIce(NewIceCream);

// ---------------------------------------------------------------------------------------------------------
// |：聯集運算符
// 用在 object的情況
type Pencil = {
  color: string;
  leadLong: number;
};
type BallPointPen = {
  color: string;
  waterLeave: number;
};
type UnknownPen = Pencil | BallPointPen;

function printPenInfo(pen: UnknownPen) {
  console.log("這支" + pen.color + "的筆");
  // pen 可能為 Pencil 或 BallPointPen，需要做型別判斷才能正確使用 pen 的屬性/方法
  // if (typeof(pen) === 'Pencil') {	// 不能用 typeof判斷自訂的 type
  if ("leadLong" in pen) {
    // 改用內容物判斷'leadLong'
    console.log("剩下" + pen.leadLong + "cm");
  }
  if ("waterLeave" in pen) {
    console.log("剩下" + pen.waterLeave + "cc");
  }
}

printPenInfo({ color: "藍色", waterLeave: 20 });

// 用在 class的情況
class Bike {
  used() {
    console.log("Riding the bike ...");
  }
}
class Car {
  used() {
    console.log("driving the car ...");
  }
  refueling() {
    console.log("加油中...");
  }
}
type MovingTool = Bike | Car;

function useMovingTool(tool: MovingTool) {
  tool.used();
  // if ('refueling' in tool) {	// 可用內容物判斷
  if (tool instanceof Car) {
    // instanceof 是 JS的方法，用於驗證 class，JS能分辨是從哪個 class建立出來的實體(new)，但不能分辨 type跟 interface
    tool.refueling();
  }
}

const newBike = new Bike();
const newCar = new Car();
useMovingTool(newCar);

// ---------------------------------------------------------------------------------------------------------
// 判斷 object 與 聯合類型(自訂名稱) 的小撇步
// type 跟 interface 設定時，強制一項公共的屬性，用做區分
interface Tree {
  type: "樹"; // 強制一項公共的屬性
  treeLifeCycle: number;
}
interface Flower {
  type: "花"; // 強制一項公共的屬性
  flowerLifeCycle: number;
}
type Plant = Tree | Flower;

function plantLifeCycle(plant: Plant) {
  let lifeCycle;
  // if ('treeLifeCycle' in plant) {	// 不必由內容物判斷
  switch (
    plant.type // 處理已知的屬性，TS還會檢查錯字
  ) {
    case "樹":
      lifeCycle = plant.treeLifeCycle;
      break;
    case "花":
      lifeCycle = plant.flowerLifeCycle;
      break;
  }
  console.log(plant.type + " 生命週期 " + lifeCycle + " 年");
}
plantLifeCycle({ type: "花", flowerLifeCycle: 0.3 }); // TS還會檢查錯字

// ---------------------------------------------------------------------------------------------------------
// 型別轉換 Type Casting

// 寫法一：前面加上：<HTMLInputElement>
// const htmlDom = <HTMLInputElement> document.getElementById('user-input')!;
// htmlDom.value = 'Input something here ...'

// 寫法二：後面加上：as HTMLInputElement
// 之一
// const htmlDom = document.getElementById('user-input')! as HTMLInputElement;
// htmlDom.value = 'Input something here ...'
// 之二
const htmlDom = document.getElementById("user-input")!;
(htmlDom as HTMLInputElement).value = "Input something here ...";

// ---------------------------------------------------------------------------------------------------------
// 索引類型
interface ErrorContaniner {
  // interface 指定只能有 string: string，ex: email: "無效信箱！"
  [prop: string]: string;
  // 當指定後，其餘項也只能是同格式
  // [prop: number]: string;
  // id: number;	// 與索引指定不同，error
}

const errorBug: ErrorContaniner = {
  email: "無效信箱！",
  // userID: 2,	// error
  userName: "請包涵大小寫英文與數字",
};

// ---------------------------------------------------------------------------------------------------------
// 函式超載 Function Overloads
// 對函式/方法的輸入與輸出強制進行型別註記
function Add(a: number, b: number): number;
function Add(a: string, b: string): string;
function Add(a: number, b: string): string;
function Add(a: string, b: number): string;

// 通常輸入有被複合過後的型別，會出現至少兩種以上的型別推論，所以需要型別檢查，但TS的型別推論不會驗證函式中寫的型別檢查結果
function Add(a: A_ID, b: A_ID) {
  // 型別推論輸出為 string | number
  if (typeof a === "string" || typeof b === "string")
    // 型別檢查
    return a.toString() + b.toString();
  return a + b;
}
const result = Add(10, " 3"); // result: string | number
result.split("s"); // .split為 string的方法，若沒有 overload強制註記型別，string | number的型別 TS會警告

// ---------------------------------------------------------------------------------------------------------
// ?.：可選鏈接運算符 Optional Chaining operator
const product = {
  info: {
    name: "色鉛筆",
  },
};
if (product?.info?.name) {
  console.log(product.info.name);
}
