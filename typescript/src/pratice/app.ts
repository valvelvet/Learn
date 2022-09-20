// Draggable type
interface Draggable {
  dragStartHandler(e: DragEvent): void;
  dragEndHandler(e: DragEvent): void;
}

interface Dragtarget {
  dragOverHandler(e: DragEvent): void;
  dragLeaveHandler(e: DragEvent): void;
  dropHandler(e: DragEvent): void;
}

// Project type
enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(public id: string, public title: string, public description: string, public cost: number, public status: ProjectStatus) {}
}

// Project State Management 狀態管理
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listener: Listener<T>[] = [];

  constructor() {}

  addListener(listenerFn: Listener<T>) {
    this.listener.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, cost: number) {
    const newProject = new Project(Math.floor(Math.random() * 100000000).toString(), title, description, cost, ProjectStatus.Active);
    this.projects.push(newProject);
    this.updateListener();
  }

  moveProject(projectId: string, projectState: ProjectStatus) {
    const prj = this.projects.find((prj) => prj.id === projectId);
    if (prj && prj.status !== projectState) {
      prj.status = projectState;
      this.updateListener();
    }
  }

  updateListener() {
    for (const listenerFn of this.listener) {
      listenerFn(this.projects.slice()); // .slice()作為複製使用，使更改不影響原陣列
    }
  }
}

const projectState = ProjectState.getInstance();

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

// autoBind decorators 裝飾器
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

// Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  protected templateElement: HTMLTemplateElement;
  protected hostElement: T;
  protected element: U;

  constructor(
    templateId: string,
    hostId: string,
    newElementId?: string,
    public insertAt: "beforebegin" | "afterbegin" | "beforeend" | "afterend" = "beforeend"
  ) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId)! as T;

    const importedNode = document.importNode(this.templateElement.content, true);
    //                            ~~~~~~~~~~
    // importNode：用於從不同文檔中複製節點
    // cloneNode：用於在同一文檔中複製節點
    // 但 DOM4取消了不同文檔的區別，可能有更詳細的差別
    // adoptNode()：與importNode非常相似，不同之處在於adoptNode從其父 DOM 中刪除原始元素。
    this.element = importedNode.firstElementChild as U;
    this.element.id = newElementId ?? "";

    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement(this.insertAt, this.element);
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

  abstract configure(): void;
  abstract renderContent(): void;
}

// ProjectItem Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get cost() {
    if (this.project.cost === 0) return "-";
    else return "$ " + this.project.cost;
  }

  constructor(hostId: "active" | "finished", project: Project) {
    super("single-project", hostId + "-projects-list", project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(_e: DragEvent) {}

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.cost;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

// ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements Dragtarget {
  assignProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", type + "-projects");
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const prjEl = this.element.querySelector("ul")!;
    prjEl.classList.remove("droppable");
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
  }

  @AutoBind
  dragLeaveHandler(_e: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    projectState.addListener((projects: Project[]) => {
      this.assignProjects = projects.filter((item) => {
        return item.status === (this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
      });
      this.renderProjects();
    });
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
  }

  renderContent() {
    const listId = this.type + "-projects-list";
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent = this.type == "active" ? "新建立" : "已完成";
  }

  private renderProjects() {
    const listEl = document.getElementById(this.type + "-projects-list")! as HTMLUListElement;
    while (listEl.hasChildNodes()) {
      listEl.removeChild(listEl.lastChild!);
    }
    for (const prjItem of this.assignProjects) {
      new ProjectItem(this.type, prjItem);
    }
  }
}

// ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  costInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", "user-input");
    this.titleInputElement = this.element.querySelector("#title")!;
    this.descriptionInputElement = this.element.querySelector("#description")!;
    this.costInputElement = this.element.querySelector("#cost")!;
    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | string {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredCost = this.costInputElement.value;

    let errorSrting: string = "";
    errorSrting =
      Validate({ value: enteredTitle, key: "目標", required: true, minLength: 2 }) +
      Validate({ value: enteredDescription, key: "概述", required: true, minLength: 5, maxLength: 350 }) +
      Validate({ value: enteredCost, key: "預計花費金額", required: true, min: 0 });
    if (errorSrting) {
      return errorSrting;
    } else {
      return [enteredTitle, enteredDescription, +enteredCost];
    }
  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const v = this.gatherUserInput();
    if (typeof v === "string") {
      alert(v);
    } else {
      this.element.reset();
      projectState.addProject(v[0], v[1], v[2]);
    }
  }
}

const projectInput = new ProjectInput();
const activeList = new ProjectList("active");
const finishedList = new ProjectList("finished");
