// tsconfig 文檔：  https ://www.typescriptlang.org/docs/handbook/tsconfig-json.html

// 編譯器配置文檔：https ://www.typescriptlang.org/docs/handbook/compiler-options.html

// VS Code TS 調試：  https ://code.visualstudio.com/docs/typescript/typescript-debugging

// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

// ---------------------------------------------------------------------------------------------------------
// any			*
// number		1	 8.3	-2
// string		''	""	``
// boolean	true	false
// object		{}
// Array		string[]  Array<string>  (string | number)[]
// Tuple		[number, string]
// 類型(別名)  Type Aliases   type
type Booktype = {
  ISBN: number;
  bookName: string;
  onSale: boolean;
  saleInfo: {
    prise: number;
    inventory: number;
  };
  bookClass: string[];
  // bookClass: Array<string>;
  menu: [number, string];
};

const book: Booktype = {
  ISBN: 100098,
  bookName: "Read me now!",
  onSale: true,
  saleInfo: {
    prise: 399,
    inventory: 37,
  },
  bookClass: ["Horror", "mystery"],
  menu: [1, "Now I'm opening!"],
};

// function consoleItem(a: number) {
// function consoleItem(a) {  // any
function consoleItem(a: any) {
  a = "str";
  console.log(a);
}
consoleItem(100);

// ---------------------------------------------------------------------------------------------------------
// 聯合類型    Union Types    |
type UserName = { name: string };
type UserAge = { age: number | string };
type User = UserName & UserAge & { hobby: string };

function greet(user: User) {
  console.log("我叫" + user.name + "，今年" + user.age + "歲，興趣是" + user.hobby);
}
greet({ name: "小亭", age: 10, hobby: "打球" });

// ---------------------------------------------------------------------------------------------------------
// 文字類型   Literal Types
const constantString = "Hello World";
const constantNumber = 88;

function leng(a: "HTML" | "CSS" | "JS") {
  console.log(a);
}
leng("HTML");
// leng('TS');

// ---------------------------------------------------------------------------------------------------------
// 接口       Interfaces     interface
interface Building {
  name: string;
  birth: number;
}

// type 跟 interface 差別：
//           | 新增/擴展?   | 修改?
// Type      | &          | 創建後無法更改
// Interface | extends    | 可向現有界面添加新字段
type Animal = { name: string };
type Bear = Animal & { honey: boolean };

interface Story {
  name: string;
}
interface History extends Story {
  truely: boolean;
}
interface Story {
  year: string;
}

// ---------------------------------------------------------------------------------------------------------
// 列舉       Enum			{}
enum EnterID {
  Customer,
  System,
  Viewer,
}
EnterID.Customer;

enum CustomerLv {
  Gold = "金",
  Silver = "銀",
  Copper = "銅",
  Iron = "鐵",
}
CustomerLv.Silver;

// ---------------------------------------------------------------------------------------------------------
// function type		void / never
// void：函數不返回值，為TS自動推斷出的類型，注：不返回任何值的函數將隱式返回值 undefined，但是在 TypeScript中 void與 undefined不同
// never：函數不返回值，函數拋出異常或終止程序的執行，或確定聯合中沒有任何內容時也會出現(所有可能的 type都檢查過濾完之後)
function voidFn(a: string) {
  console.log(a); // void
  // return a; // string
}
let voidType = voidFn("void");

// void 的箭頭函示仍可以有 return，命名函式定義為 void 則不能返回任何內容
type voidFunc = () => void;
const f1: voidFunc = () => {
  return true;
};

function neverFn(msg: string): never {
  throw new Error(msg);
}
let neverType = neverFn("Error!");

function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}

// ---------------------------------------------------------------------------------------------------------
// unknown：這類似於 any類型，但此值做任何事情是不合法的
let a: unknown;
a = 200;
a = "Eamm";

let b: string;
// b = a; // unknown 不能賦予任何 type
// 做類型檢查，將未知類型判斷成固定的類型
if (typeof a === "string") b = a; // 判斷成固定的類型 "let a: string"
