// ◆ProjectItem Class
//  ▼/// <reference path="./project-item.ts" />
import { ProjectItem } from "./project-item.js";
// ◆Drag & Drop Interface
//  ▼/// <reference path="../model/drag-drop.ts" />
import { Dragtarget } from "../model/drag-drop.js";
// Project type
//  ▼/// <reference path="./model/project.ts" />
import { Project, ProjectStatus } from "../model/project.js";
// ◆Project State Management 狀態管理
//  ▼/// <reference path="../state/project.ts" />
import { projectState } from "../state/project.js";
// ◆autoBind decorators 裝飾器
//  ▼/// <reference path="../decorators/autobind.ts" />
import { AutoBind } from "../decorators/autobind.js";
// ◆Component Base Class
//  ▼/// <reference path="./base.ts" />
import { Component } from "./base.js";

// ProjectList Class
// ▼namespace App {
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements Dragtarget {
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
// ▼}
