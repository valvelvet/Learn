// ◆Project State Management 狀態管理
//  ▼/// <reference path="../state/project.ts" />
import { projectState } from "../state/project.js";
// ◆輸入驗證
//  ▼/// <reference path="./util/validation.ts" />
import { Validate } from "../util/validation.js";
// ◆autoBind decorators 裝飾器
//  ▼/// <reference path="../decorators/autobind.ts" />
import { AutoBind } from "../decorators/autobind.js";
// ◆Component Base Class
//  ▼/// <reference path="./base.ts" />
import { Component } from "./base.js";

// ProjectInput Class
// ▼namespace App {
export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  // 以 default導出
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  costInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", "user-input", "afterbegin");
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
// ▼}
