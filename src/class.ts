class Book {
  public bookName: string; // public：為預設，可不寫
  private author: string; // private：私有屬性
  protected price: number; // Protected：子類別無法使用父類別的private，protected可授權子類別使用，又能保有私有性質

  // 初始化
  constructor(name: string, author: string, price: number) {
    this.bookName = name;
    this.author = author;
    this.price = price;
  }

  showInfo(this: Book) {
    console.log('書名：' + this.bookName + '\n作者：' + this.author + '\n價格：$' + this.price);
  }
}
const newbook = new Book('子兒吐吐', '無名', 399);
newbook.showInfo();

// ---------------------------------------------------------------------------------------------------------
// constructor 初始化簡寫
class Author {
  // public authorName: string;	省
  // private birth: number;			省

  constructor(public authorName: string, private birth: number) {
    // 集中在此設置
    // this.authorName = name;	省
    // this.birth = birth;			省
  }

  showInfo(this: Author) {
    console.log('作者：' + this.authorName + '\n年紀：' + this.birth + '歲');
  }
}
const newAuthor = new Author('王大錘', 1990);
newAuthor.showInfo();

// ---------------------------------------------------------------------------------------------------------
// readonly
class Player {
  // public readonly uuID: string;		// readonly 可在這設定
  // private character: string;

  constructor(public readonly uuID: string, private character: string) {
    // readonly 也可在這設定
    // this.uuID = uuID;
    // this.character = character;
  }

  showInfo(this: Player) {
    // this.uuID = '09-87654321';		// 對readonly 重新賦值會error
    console.log('帳號：' + this.uuID + '\n職業：' + this.character);
  }
}
const NewPlayer = new Player('09-88883333', '玩家');
NewPlayer.showInfo();

// ---------------------------------------------------------------------------------------------------------
// Inheritance 繼承
class VIPPlayer extends Player {
  public VIPLevel: number;
  constructor(uuID: string, VIPLevel: number) {
    super(uuID, 'VIP玩家'); // super()調用 父class 的初始化 constructor();
    this.VIPLevel = VIPLevel; // 對子類別的初始化，需在super()後
  }
}
class professionalPlayer extends Player {
  // 初始化簡寫
  constructor(uuID: string, public seniority: string[]) {
    super(uuID, '職業玩家');
  }
  // 功能擴充
  showTrophy() {
    console.log('資歷：' + this.seniority);
  }
}
const NewVIPPlayer = new VIPPlayer('09-74147414', 7);
NewVIPPlayer.showInfo();
const NewprofessionalPlayer = new professionalPlayer('09-22113344', ['Apex：賽季2022-1 #3', '小朋友下樓梯：20118層', '...']);
NewprofessionalPlayer.showInfo();
NewprofessionalPlayer.showTrophy();

// ---------------------------------------------------------------------------------------------------------
// Protected 子類別無法使用父類別的private，protected可授權子類別使用，又能保有私有性質
class SaleBook extends Book {
  constructor() {
    super('企鵝家族', '軼名', 500);
  }
  sale(discount: number) {
    this.price *= discount;
  }
}
const NewSaleBook = new SaleBook();
NewSaleBook.showInfo();
NewSaleBook.sale(0.7);
NewSaleBook.showInfo();

// ---------------------------------------------------------------------------------------------------------
// getter、setter：像使用屬性一樣使用
class SerpriceBox {
  private color: string = '';
  private weight: string | number = 0;

  get boxColor() {
    let _color: string = '';
    switch (this.color) {
      case 'pink':
        _color = '女生';
        break;
      case 'blue':
        _color = '男生';
        break;
      case 'green':
        _color = '隔壁老王生';
        break;
      case 'rainbow':
        _color = '繽紛人生';
        break;
      default:
        _color = '未知';
        break;
    }
    return _color;
  }
  get boxWeight() {
    if (this.weight > 3.5) {
      return '巨嬰';
    } else if (this.weight > 2.5) {
      return '健康寶寶';
    } else if (this.weight <= 0) {
      return '未知';
    } else {
      return '飲養不良，需要好好養養';
    }
  }

  set boxColor(value: string) {
    if (['pink', 'blue', 'green', 'rainbow'].includes(value)) this.color = value;
    else throw Error('無法辨識 ' + value);
  }
  set boxWeight(value: string | number) {
    this.weight = value;
  }
}
const NewSerpriceBox = new SerpriceBox();
console.log('顏色：' + NewSerpriceBox.boxColor + '\n重量：' + NewSerpriceBox.boxWeight); // getter
// NewSerpriceBox.boxColor = 'orange';
NewSerpriceBox.boxColor = 'blue'; // setter
NewSerpriceBox.boxWeight = 3.8; // setter
console.log('顏色：' + NewSerpriceBox.boxColor + '\n重量：' + NewSerpriceBox.boxWeight); // getter

// ---------------------------------------------------------------------------------------------------------
// Static Methods 靜態屬性：不用new就能直接使用，例如：Math.PI, ...，在class內部以class名稱取用(非this)
class Humen {
  static outward = {
    smart: true,
    eyes: 2,
    legs: 2,
    sex: ['men', 'women', 'third', 'four'],
  };
  static tryNewHumen(skin: string, power: string) {
    return '外觀：' + skin + '，超能力：' + power;
  }
  // 在class內部以class名稱取用(非this)，ex: Humen
  showInfo(this: Humen) {
    // console.log('眼睛：' + this.outward.eyes + '\n智慧生物：' + this.outward.smart);
    console.log('眼睛：' + Humen.outward.eyes + '\n智慧生物：' + Humen.outward.smart);
  }
}
console.log(Humen.outward);
console.log(Humen.tryNewHumen('沼澤貓貓', '死亡旋轉'));
const NewHumen = new Humen();
NewHumen.showInfo();

// ---------------------------------------------------------------------------------------------------------
// 複寫：showInfo()
class GMPlayer extends Player {
  constructor(public readonly uuID: string) {
    super(uuID, 'GM帳號');
  }

  showInfo(this: Player) {
    console.log('GM帳號：' + this.uuID);
  }
}
const NewGMPlayer = new GMPlayer('GM-001');
NewGMPlayer.showInfo();

// ---------------------------------------------------------------------------------------------------------
// abstract 抽象屬性
// 抽象類別 class：類別無法建立實體(不能new)，必須建立子類別使用
// 方法 function：父定義此'方法的名稱與屬性'，子類別定義'方法內容'(必須)
abstract class Character {
  static userCount: number = 0;
  constructor(protected characterName: string, protected setPoint: string, protected character: string) {
    Character.userCount++;
  }
  showInfo(this: WizardCharacter) {
    console.log('帳號：' + WizardCharacter.userCount + '\n名稱：' + this.characterName + '\n重生點：' + this.setPoint + '\n職業：' + this.character);
  }
  abstract device(): void; // abstract 方法：父定義此'方法的名稱(device)與屬性(void)'
}

class WizardCharacter extends Character {
  constructor(characterName: string, setPoint: string) {
    super(characterName, setPoint, '法師');
  }
  device(this: WizardCharacter) {
    // abstract 方法：子類別定義'方法內容'
    console.log('0級：50度保溫；30級：87度沖咖啡；70級：120度火焰燒酒；100級：200度定溫烘烤');
  }
}

class FighterCharacter extends Character {
  constructor(characterName: string, setPoint: string) {
    super(characterName, setPoint, '狂戰士');
  }
  device(this: FighterCharacter) {
    // abstract 方法：子類別定義'方法內容'
    console.log('0級：廚餘打包；30級：炒飯浪；70級：打發蛋白手；120級：忍者空中切');
  }
}
// const NewCharacter = new Character();	// abstract class 抽象類別：無法建立實體(不能new)
const NewWizardCharacter = new WizardCharacter('乂煞氣乂', '與世隔絕村');
NewWizardCharacter.showInfo();
NewWizardCharacter.device();
const NewFighterCharacter = new FighterCharacter('卍沒有未來卍', '花火城');
NewFighterCharacter.showInfo();
NewFighterCharacter.device();

// ---------------------------------------------------------------------------------------------------------
// Singletons & Private Constructors：確保只能被創建一個的方法
class Earth {
  // 建立靜態屬性
  static instance: Earth;
  // constructor 加上 private：無法被外界調用
  private constructor(public radius: number) {}
	// 建立一個靜態getInstance，功能為創建類別且檢測只創建一次
  static getInstance() {
		if(!Earth.instance){
			this.instance = new Earth(6378);
		}
		return this.instance;
	}
}
const myEarth = Earth.getInstance();
const myEarth2 = Earth.getInstance();
console.log(myEarth,myEarth2);	// 應為一模一樣
