"use strict";
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
var EnterID;
(function (EnterID) {
    EnterID[EnterID["Customer"] = 0] = "Customer";
    EnterID[EnterID["System"] = 1] = "System";
    EnterID[EnterID["Viewer"] = 2] = "Viewer";
})(EnterID || (EnterID = {}));
function greet(user) {
    console.log('Hi, I am ' + user.name);
}
;
;
// interface Window { title: string; };
// interface Window { ts: TypeScriptAPI; };
// const src = 'const a = "Hello World"';
// window.ts.transpileModule(src, {});
