import { Project, ProjectStatus } from "../model/project";

// Project State Management 狀態管理
// ▼namespace App{
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

export const projectState = ProjectState.getInstance();
// ▼}
