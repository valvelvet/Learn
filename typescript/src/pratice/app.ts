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
// // ◆ProjectList Class
// ▼/// <reference path="components/project-list.ts" />
// import { ProjectList } from "./components/project-list.js"; 				// ES-Module import
// import { ProjectList as PJL } from "./components/project-list.js"; // import 使用別名導入 -- 1:導入指定項
import * as PJL from "./components/project-list.js"; 							// import 使用別名導入 -- 2:導入全部
// // ◆ProjectInput Class
// ▼/// <reference path="components/project-input.ts" />
// import { ProjectInput } from "./components/project-input.js";			// ES-Module import
import PJI from "./components/project-input.js";									// 導入 default:可重命別名

// ▼需用 namespace包起來才能用
// ▼namespace App {
// new ProjectList("active");				// ES-Module import
// new ProjectList("finished");			// ES-Module import
// new PJL("active");								// import 使用別名導入 -- 1:導入指定項
// new PJL("finished");							// import 使用別名導入 -- 1:導入指定項
new PJL.ProjectList("active");		// import 使用別名導入 -- 2:導入全部
new PJL.ProjectList("finished");	// import 使用別名導入 -- 2:導入全部
// new ProjectInput();							// ES-Module import
new PJI();												// 導入 default:可重命別名
// ▼}
