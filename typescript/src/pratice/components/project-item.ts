// ◆Drag & Drop Interface
//  ▼/// <reference path="../model/drag-drop.ts" />
import { Draggable } from "../model/drag-drop.js";
// ◆Project type
//  ▼/// <reference path="../model/project.ts" />
import { Project } from "../model/project.js";
// ◆autoBind decorators 裝飾器
//  ▼/// <reference path="../decorators/autobind.ts" />
import { AutoBind } from "../decorators/autobind.js";
// ◆Component Base Class
//  ▼/// <reference path="./base.ts" />
import { Component } from "./base.js";

// ProjectItem Class
// ▼namespace App {
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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
// ▼}
