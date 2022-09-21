// ◆　▼　■　●
// ▼三斜線為寫給TS的語法，reference：從 path引用檔案
// ▼此僅給 TS認檔案去檢查，編譯成JS後會出現錯誤，錯誤原因為 namespace是 TS特有，編譯後不存在，編譯後檔案分散儲存
// ▼解法：將檔案編譯成一個檔，開啟 tsconfig.json中 "outFile": "./dist/bundle.js"
// ▼(具體原因不明白，但還要改 "module": "AMD"才能使用)，把 dist檔案刪光重新編譯就可以看到只編譯出 bundle.js一個檔了呦
// // ◆Drag & Drop Interface
// /// <reference path="model/drag-drop.ts" />
// // ◆Project type
// /// <reference path="model/project.ts" />
// // ◆Project State Management 狀態管理
// /// <reference path="state/project.ts" />
// // ◆輸入驗證
// /// <reference path="util/validation.ts" />
// // ◆autoBind decorators 裝飾器
// /// <reference path="decorators/autobind.ts" />
// // ◆Component Base Class
// /// <reference path="components/base.ts" />
// ◆ProjectList Class
/// <reference path="components/project-list.ts" />
// ◆ProjectInput Class
/// <reference path="components/project-input.ts" />

// ▼需用 namespace包起來才能
namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
