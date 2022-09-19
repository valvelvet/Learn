// Project State Management 狀態管理


// 輸入驗證
interface Validatable {
  value: string;
  key: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
}
function Validate(input: Validatable) {
  let errorString: string = "";
  if (input.required) errorString += !!input.value ? "" : "  必填\n";

  if (input.maxLength != null && input.minLength != null)
    errorString +=
      input.value.length <= input.maxLength && input.value.length >= input.minLength
        ? ""
        : `  長度需介於 ${input.minLength}至 ${input.maxLength}之間\n`;
  else if (input.maxLength != null) errorString += input.value.length >= input.maxLength ? "" : `  長度限制最多 ${input.maxLength}字\n`;
  else if (input.minLength != null) errorString += input.value.length >= input.minLength ? "" : `  長度限制最少 ${input.minLength}字\n`;

  if (input.max != null && input.min != null)
    errorString += +input.value <= input.max && +input.value >= input.min ? "" : `  數字需介於 ${input.min}至 ${input.max}之間\n`;
  else if (input.max != null) errorString += +input.value >= input.max ? "" : `  數字限制最多 ${input.max}\n`;
  else if (input.min != null) errorString += +input.value >= input.min ? "" : `  數字限制最少 ${input.min}\n`;

  return errorString ? input.key + "：\n" + errorString : "";
}

// decorators 裝飾器
// autoBind
function AutoBind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById("project-list")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = this.type + "-projects";
    this.renderContent();
    this.attach();
  }

  private renderContent() {
    const listId = this.type + "-projects-list";
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent = this.type == "active" ? "新建立" : "已完成";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    //                            ~~~~~~~~~~
    // importNode：用於從不同文檔中複製節點
    // cloneNode：用於在同一文檔中複製節點
    // 但 DOM4取消了不同文檔的區別，可能有更詳細的差別
    // adoptNode()：與importNode非常相似，不同之處在於adoptNode從其父 DOM 中刪除原始元素。
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElement = this.element.querySelector("#title")!;
    this.descriptionInputElement = this.element.querySelector("#description")!;
    this.peopleInputElement = this.element.querySelector("#people")!;
    this.configure();
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
    //               ~~~~~~~~~~~~~~~~~~~~~
    // insertadjacentelement：可以指定四個地方去做插入，ex: Div.insertAdjacentElement('beforebegin',div)
    // 		beforebegin - 元素之前
    // <p>
    // 		afterbegin - 元素第一個子節點之前
    // 	foo
    // 		beforeend - 元素最後一個子節點之後
    // </p>
    // 		afterend - 元素之後
  }

  private gatherUserInput(): [string, string, number] | string {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    let errorSrting: string = "";
    errorSrting =
      Validate({ value: enteredTitle, key: "標題", required: true, minLength: 4 }) +
      Validate({ value: enteredDescription, key: "概述", required: true, minLength: 5, maxLength: 150 }) +
      Validate({ value: enteredPeople, key: "分派", required: true, max: 7, min: 0 });
    if (errorSrting) {
      return errorSrting;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const v = this.gatherUserInput();
    if (typeof v === "string") {
      alert(v);
    } else {
      console.log(v);
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}

const activeList = new ProjectList("active");
const finishedList = new ProjectList("finished");
const projectInput = new ProjectInput();
