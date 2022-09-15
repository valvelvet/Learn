// Decorators 裝飾器
// 多用在 class上，裝飾器的用途在於給予開發人員的工具，Angular, Vue, ...，都有開發可使用的裝飾器
// ---------------------------------------------------------------------------------------------------------
// class裝飾器在'定義'時運作，不需要建立實體(new)
function Logger(constructor: Function) {
  console.log('定義：' + constructor.name);
}

@Logger
class Umbrella {
  static count: number = 0;
  constructor() {
    Umbrella.count++;
    console.log('已建立第' + Umbrella.count + '個實體：Umbrella');
  }
}
const newUmbrella = new Umbrella();

// ---------------------------------------------------------------------------------------------------------
// Decorator Factory 裝飾器工廠
// 就是在 Decorator外再包一層 function，外層的 function要回傳的則是真正的 Decorator，這時外層接收的參數就可以在要回傳的 Decorator中應用
// 回傳的 function，才是真正的 Decorator()，只是在外層套一個可接收參數的 function，
function Logger2(logText: string) {
  console.log(logText);
  // 真正的 Decorator
  return function (constructor: Function) {
    console.log('定義：' + constructor.name);
  };
}

@Logger2('Logging2...')
class Umbrella2 {
  static count: number = 0;
  constructor() {
    Umbrella2.count++;
    console.log('已建立第' + Umbrella2.count + '個實體：Umbrella2');
  }
}
const newUmbrella2 = new Umbrella2();

// ---------------------------------------------------------------------------------------------------------
// 裝飾器執行順序是由下往上執行的（Bottom-up）
function Decorator1(_: Function) {
  console.log('Decorator1...'); //1
}
function Decorator2(_: Function) {
  console.log('Decorator2...'); // 2
}

@Decorator2
@Decorator1
class ReadingDecorators2 {
  constructor() {}
}
// 輸出如下
// Decorator1...
// Decorator2...

// ---------------------------------------------------------------------------------------------------------
// 運作順序：創建的 function的順序(由上至下讀取) -> 執行裝飾器順序(由下至上執行)
// 回傳的function，才是真正的 Decorator()，只是在外層套一個可接收參數的function，裝飾器執行順序還是由下往上執行的（Bottom-up）
function Read1(first: string) {
  console.log('Read1...'); // 2
  return function (_: Function) {
    console.log(first); // 3
  };
}
function Read2(next: string) {
  console.log('Read2...'); // 1
  return function (_: Function) {
    console.log(next); // 4
  };
}
@Read2('Next')
@Read1('First')
class ReadingDecorators {
  constructor() {}
}
// 創建的 function的順序(由上至下讀取)	Read2() -> Read1()
// 執行吐出的 裝飾器順序(由下至上執行)	function (_: Function){ console.log(first); } -> function (_: Function){ console.log(next); }
// 輸出如下
// Read2...
// Read1...
// First
// Next

// ---------------------------------------------------------------------------------------------------------
// 所有種類的裝飾器
// Class Decorator 			類別裝飾器	(target: any) => void
// Method Decorator 		方法裝飾器	(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
// Property Decorator 	欄位裝飾器	(target: any, propertyKey: string) => void
// Parameter Decorator 	參數裝飾器	(target: any, propertyKey: string, parameterIndex: number) => void
function ClassDecorator(target: any) {
  console.log('--- 類別裝飾器 ---');
  console.log('target: \n', target);
}
function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('--- 方法裝飾器 ---');
  console.log('target: \n', target);
  console.log('propertyKey: \n', propertyKey);
  console.log('descriptor: \n', descriptor);
}
function PropertyDecorator(target: any, propertyKey: string) {
  console.log('--- 欄位裝飾器 ---');
  console.log('target: \n', target);
  console.log('propertyKey: \n', propertyKey);
}
function ParameterDecorator(target: any, propertyKey: string, parameterIndex: number) {
  console.log('--- 參數裝飾器 ---');
  console.log('target: \n', target);
  console.log('propertyKey: \n', propertyKey);
  console.log('parameterIndex: \n', parameterIndex);
}

@ClassDecorator
class Decorators {
  @PropertyDecorator
  title: string;
  private _price: number = 0;

  @MethodDecorator
  set price(val: number) {
    if (val > 0) this._price = val;
  }

  constructor(@ParameterDecorator title: string) {
    this.title = title;
  }

  @MethodDecorator
  getInfo(@ParameterDecorator text: string) {
    console.log(text, this.title, this._price);
  }
}

const decorator = new Decorators('Hi new Decorator.');

// ---------------------------------------------------------------------------------------------------------
// 練習：自訂綁定
// PropertyDescriptor 屬性描述符
//  https://ithelp.ithome.com.tw/articles/10251791
//  - Properties 特性：
//      value: any             存儲在屬性中的值：僅在未指定 get和 set函數時才能指定
//      writable: boolean      可寫入的：如果可以修改屬性設為 true，僅在未指定 get和 set函數時才能指定
//      enumerable: boolean    可枚舉的：如果在(propertyName in object)期間訪問該屬性設為 true
//      configurable: boolean  可配置的：能否修改配置
//  - Methods 方法：
//      get(): any
//      set(v: any): void
function AutoBind(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = '有用噠';

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}
const p = new Printer();
document.getElementsByTagName('button')![0].addEventListener('click', p.showMessage);

// ---------------------------------------------------------------------------------------------------------
// 練習：輸入驗證
// interface ValidatorConfig {
//   SomeCuteItem: {
//     prodName: ["required"];
//     price: ["positive"];
//   };
//   類別名稱1: {
//     參數1: ["做什麼驗證"];
//     參數2: ["做什麼驗證"];
//     ...
//   };
//   類別名稱2: {
//     參數1: ["做什麼驗證"];
//     ...
//   };
//   ...
// }
interface ValidatorConfig {
  // 登記哪些項需要做哪些驗證
  [prop: string]: {
    [validatableProp: string]: string[];
  };
}
const registeredValidators: ValidatorConfig = {};

function RequiredInput(target: any, propertyKey: string) {
  // 必填驗證登記
  // target.constructor.name 指為 class名稱 "SomeCuteItem"
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyKey]: [...(registeredValidators[target.constructor.name]?.[propertyKey] ?? []), 'required']
  };
}

function PositiveNumber(target: any, propertyKey: string) {
  // 正數驗證登記
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyKey]: [...(registeredValidators[target.constructor.name]?.[propertyKey] ?? []), 'positive']
  };
}

function validate(obj: any) {
  // 驗證工作寫在這
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return ''; // class 名稱未登記過 == 不需驗證 == 驗證通過返回true
  }
  let errorString: string = '';
  for (const prop in objValidatorConfig) {
    // prop:參數名稱
    for (const val in objValidatorConfig[prop]) {
      // val:做什麼驗證
      switch (objValidatorConfig[prop][val]) {
        case 'required': // 驗證是否存在
          errorString += !!obj[prop] ? '' : prop + ' 必填\n';
          break;
        case 'positive': // 驗證是否為正
          errorString += obj[prop] > 0 ? '' : prop + ' 須為正數\n';
          break;
        default:
          break;
      }
    }
  }
  return errorString;
}

class SomeCuteItem {
  @RequiredInput
  prodName: string;

  @PositiveNumber
  @RequiredInput
  price: number;
  constructor(n: string, p: number) {
    this.prodName = n;
    this.price = p;
  }
}

const item = document.querySelector('form')!;
item.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameEl = document.getElementById('prodName') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const prodName = nameEl.value;
  const price = +priceEl.value;

  const createdProd = new SomeCuteItem(prodName, price);

  const errorSrting = validate(createdProd);
  if (errorSrting) {
    alert(validate(createdProd));
    return;
  }
  console.log(createdProd);
});
