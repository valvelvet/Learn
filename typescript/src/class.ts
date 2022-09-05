class Book {
	public bookName: string;	// public：為預設，可不寫
	private author: string;		// private：私有屬性
	protected price: number;	// Protected：子類別無法使用父類別的private，protected可授權子類別使用，又能保有私有性質

	// 初始化
	constructor(name: string, author: string, price: number){
		this.bookName = name;
		this.author = author;
		this.price = price;
	}

	showInfo(this: Book){
		console.log("書名：" + this.bookName + "\n作者：" + this.author + "\n價格：$" + this.price);
	}
}
const newbook = new Book('子兒吐吐', '無名', 399);
newbook.showInfo();

// ---------------------------------------------------------------------------------------------------------
// constructor 初始化簡寫
class Author {
	// public authorName: string;	省
	// private birth: number;			省

	constructor(public authorName: string, private birth: number){	// 集中在此設置
		// this.authorName = name;	省
		// this.birth = birth;			省
	}

	showInfo(this: Author){
		console.log("作者：" + this.authorName + "\n年紀：" + this.birth + "歲");
	}
}
const newAuthor = new Author('王大錘', 1990);
newAuthor.showInfo();

// ---------------------------------------------------------------------------------------------------------
// readonly
class Player {
	// public readonly uuID: string;		// readonly 可在這設定
	// private character: string;

	constructor(public readonly uuID: string, private character: string){	// readonly 也可在這設定
		// this.uuID = uuID;
		// this.character = character;
	}

	showInfo(this: Player){
		// this.uuID = '09-87654321';		// 對readonly 重新賦值會error
		console.log("帳號：" + this.uuID + "\n職業：" + this.character);
	}
}
const NewPlayer = new Player("09-88883333", "玩家");
NewPlayer.showInfo();

// ---------------------------------------------------------------------------------------------------------
// Inheritance 繼承
class VIPPlayer extends Player{
	public VIPLevel: number;
	constructor(uuID: string, VIPLevel: number){
		super(uuID, "VIP玩家");	// super()調用 父class 的初始化 constructor();
		this.VIPLevel = VIPLevel;		// 對子類別的初始化，需在super()後
	}
}
class professionalPlayer extends Player{
	// 初始化簡寫
	constructor(uuID: string, public seniority: string[]){
		super(uuID, "職業玩家");
	}
	// 功能擴充
	showTrophy() {
		console.log("資歷：" + this.seniority);
	}
}
const NewVIPPlayer = new VIPPlayer("09-74147414", 7);
NewVIPPlayer.showInfo();
const NewprofessionalPlayer = new professionalPlayer("09-22113344", ['Apex：賽季2022-1 #3','小朋友下樓梯：20118層','...']);
NewprofessionalPlayer.showInfo();
NewprofessionalPlayer.showTrophy();

// ---------------------------------------------------------------------------------------------------------
// Protected 子類別無法使用父類別的private，protected可授權子類別使用，又能保有私有性質
class SaleBook extends Book{
	constructor(){
		super('企鵝家族', '軼名', 500);
	}
	sale(discount: number){
		this.price *= discount
	}
}
const NewSaleBook = new SaleBook();
NewSaleBook.showInfo();
NewSaleBook.sale(0.7);
NewSaleBook.showInfo();