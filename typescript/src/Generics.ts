// Generics 泛型

// ---------------------------------------------------------------------------------------------------------
// 泛型 - function
// function merge(objA: object, objB: object) {	// 型別判斷輸出為 object
//   return Object.assign(objA, objB);
// }
// const mergeObj = merge({ name: 'Frank' }, { age: 33 });
// console.log(mergeObj);		// mergeObj型別判斷為 object
// console.log(mergeObj.age);	// 但不知道此 object具體組成

// 使用泛型，將型別像是參數一樣使用
// function輸出提示為：T & U
function merge<T extends object, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergeObj = merge({ name: 'Frank' }, { age: 33 }); // mergeObj的型別判斷：{name: string;} & {age: number;}
console.log(mergeObj);
console.log(mergeObj.name); // 型別判斷：{name: string;} & {age: number;} 有 name，故不會error

// ---------------------------------------------------------------------------------------------------------
// extends 約束
// 需求只要 input有 length屬性
// 若使用聯合型別(string| string[]...)可能漏寫有 length屬性的型別，也將無法使用後來自訂包含 length的型別
// 若使用函示超載(overload)也有疏漏的可能，code也超長
// 使用泛型可以更靈活，不用在乎具體的型別，只要約束(extends) input有 length屬性
interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}
console.log(countAndDescribe('This is a string.'));
console.log(countAndDescribe(['Amma', 'Bella']));

// ---------------------------------------------------------------------------------------------------------
// keyof
// 告訴 TS需要確保輸入有正確的結構，讓在訪問 object下的屬性時不會出錯
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key];
}
console.log(extractAndConvert({ id: 30011, name: 'Sam' }, 'id'));

// ---------------------------------------------------------------------------------------------------------
// 泛型 - class
class DataStorage<T extends number | string | boolean> {
  // 在此例中不要extends object，限制類別，避免陣列刪除物件時有不同狀況
  private data: T[] = [];
  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1); // indexOf在尋找 object時，是以 object的'地址'去比對，所以刪除時指向位置錯，indexOf找不到就回傳'-1'，splice就從最後一項查找刪除
  }
  getItem() {
    return this.data;
  }
}
const numberStorage = new DataStorage();
numberStorage.addItem(122);
numberStorage.addItem(10);
numberStorage.addItem(290);
console.log(numberStorage.getItem());
numberStorage.removeItem(10);
console.log(numberStorage.getItem());

// ---------------------------------------------------------------------------------------------------------
// Partial 部分
// 加上 Partial在建立時可以空白{}，不會跳 error，有點像將類別中全部屬性改為選填(加上?)
interface lifeGoal {
  age: number;
  goal: string;
  reach: boolean;
}
function creatLifeGoal(age: number, goal: string, reach: boolean) {
  let liveGoal: Partial<lifeGoal> = {}; // 加上 Partial在最初建立時可以空白{}，不會跳 error
  liveGoal.age = age;
  liveGoal.goal = goal;
  liveGoal.reach = reach;
  return liveGoal as lifeGoal; // 有些TS版本用 Partial需要加上 as轉回原型別才能 return
}
console.log(creatLifeGoal(40, '環遊世界', false));

// ---------------------------------------------------------------------------------------------------------
// Readonly 唯讀
const UUU: Readonly<string[]> = ["Love", "Money"];
// UUU.push("Friend"); // error