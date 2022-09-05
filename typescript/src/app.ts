class Book {
	public bookName: string;	// public：為預設，可不寫
	private price: number;		// private：私有屬性

	constructor(name: string, price: number){	// 初始化
		this.bookName = name;
		this.price = price;
	}

	showInfo(this: Book){
		console.log("書名：" + this.bookName + "\n價格：$" + this.price);
	}
}
const newbook = new Book('子兒吐吐', 399);
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
	showTrophy() {
		console.log("資歷：" + this.seniority);
	}
}
const NewVIPPlayer = new VIPPlayer("09-74147414", 7);
NewVIPPlayer.showInfo();
const NewprofessionalPlayer = new professionalPlayer("09-22113344", ['Apex：賽季2022-1 #3','小朋友下樓梯：20118層','...']);
NewprofessionalPlayer.showInfo();
NewprofessionalPlayer.showTrophy();
