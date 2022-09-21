// Component Base Class
namespace App {
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
}
