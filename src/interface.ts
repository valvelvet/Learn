// Interface 介面/界面/接口

//            | Type Aliases                                  | Interface
//            |     type Animal = { name: string }            |           interface Story { name: string }
// 擴展        | & | type Bear = Animal & { honey: boolean };  | extends | interface History extends Story { year: string; }
// 擴展數量限制 | 聲明時皆可同時擴展/合併多個 (class 繼承父類別一次只能一個)
// 修改        | 創建後無法更改                                  | 可聲明多個同名，向現有界面添加新字段

// Type Aliases
// type intro = {
//   name: string;
//   introduction(phrase: string): void;
// }

// Interface
interface intro {
  name: string;
}
// 聲明多個同名的 interface，TS就會自動將其合併
interface intro {
  introduction(phrase: string): void;
}
// 合併的 intro 長這樣：
// interface intro {
//   name: string;
//   introduction(phrase: string): void;
// }

// ---------------------------------------------------------------------------------------------------------
// 用於變數：定義結構，必須一模一樣
let user: intro = {
  name: "Rae",
  // age: 23, // 多餘的 age 會 error
  introduction(phrase: string) {
    console.log(phrase + this.name);
  },
};
user.introduction("Hi my name is ");

// ---------------------------------------------------------------------------------------------------------
// 用於 class (implements)，class還可自由新增聲明以外的屬性、方法
class Emp implements intro {
  // class Emp implements intro, 可套用更多Interface, ... {
  constructor(public name: string, public age: number, public birth: string) {}
  public introduction(phrase: string): void {
    console.log(phrase + this.name);
  }
}

// Interface 作用：可以在不知道 class 具體有哪些功能時，保證有指定的功能可使用(intro - (Emp) - introduction)
let user2: intro;
user2 = new Emp("Kally", 19, "2001-02-19");
user2.introduction("Glade to see you, my name is ");

// ---------------------------------------------------------------------------------------------------------
// 用於 function 自定義函數類型
// type 的寫法
type AddFn = (a: number, b: number) => number;

// interface 的寫法
// interface AddFn {
//   (a: number, b: number): number;
// }
// let add: AddFn = (n1, n2, n3) => { // n3 為多餘的，會 error
let add: AddFn = (n1, n2) => {
  return n1 + n2;
};

// ---------------------------------------------------------------------------------------------------------
// readonly：套用在類別時，類別中未寫readonly，也無法重新賦值
interface SignName {
  readonly name: string; // 設定
}
class NoteBook implements SignName {
  name: string; // 未寫readonly
  constructor(name: string) {
    this.name = name;
  }
}
let newNoteBook: SignName;
newNoteBook = new NoteBook("Nick");
// newNoteBook.name = "unknown";	// 無法重新賦值

// ---------------------------------------------------------------------------------------------------------
// 讓定義的屬性成為可選的：?
interface Drink {
  name: string;
  suger?: number;
}
class MilkTea implements Drink {
  name: string;
  suger?: number; // 屬性可選擇
  constructor(name: string, suger?: string) {
    // 也可在此加?，也變為可選擇的變數，默認值為：undefinded
    this.name = name;
    switch (suger) {
      case "no suger":
        this.suger = 0;
        break;
      case "half suger":
        this.suger = 5;
        break;
      case "full suger":
        this.suger = 10;
        break;
      default: // ?屬性可以不設初值
        break;
    }
  }
}
const myMilkTea: Drink = new MilkTea("早餐店奶茶"); // suger為可選擇的變數，不input不會error
console.log(myMilkTea.suger); // 預設值為：undefined
