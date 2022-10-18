// tsconfig 文檔：  https ://www.typescriptlang.org/docs/handbook/tsconfig-json.html

// 編譯器配置文檔：https ://www.typescriptlang.org/docs/handbook/compiler-options.html

// VS Code TS 調試：  https ://code.visualstudio.com/docs/typescript/typescript-debugging

// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

// any			*
// number		1	 8.3	-2
// string		''	""	``
// boolean	true	false
// object		{}
// Array		string[]  (string | number)[]
// Tuple		[number, string]
const book = {
  ISBN: 100098,
  name: 'Read me now!',
  onSale: true,
  saleInfo: {
    prise: 399,
    inventory: 37,
  },
  class: ['Horror', 'mystery'],
  menu: [1, "Now I'm opening!"],
};
// Enum			{}
enum EnterID { Customer, System, Viewer }

// 類型(別名)  Type Aliases   type
// 聯合類型    Union Types    |
type UserName = { name: string; };
type UserAge = {age: number | string };
type User = UserName & UserAge & { school: string };
function greet(user: User) {
  console.log('我叫' + user.name + "，今年" + user.age + "歲，就讀" + user.school);
}
greet({ name: '小亭', age: 10, school: 'ＯＯ國小' });
// function type		void Unknown never
// Literal Types


// 接口       Interfaces     interface
interface Building { name: string; birth: number; }

// type 跟 interface 差別：
//           | 新增/擴展?   | 修改?
// Type      | &          | 創建後無法更改
// Interface | extends    | 可向現有界面添加新字段
type Animal = { name: string };
type Bear = Animal & { honey: boolean; };

interface Story { name: string; };
interface Histery extends Story { truely: boolean; };

// interface Window { title: string; };
// interface Window { ts: TypeScriptAPI; };
// const src = 'const a = "Hello World"';
// window.ts.transpileModule(src, {});