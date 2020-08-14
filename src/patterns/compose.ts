abstract class Component2 {
  protected name: string
  constructor(name: string) {
    this.name = name
  }

  public abstract doOperation(): void

  public add(component: Component2): void {}

  public remove(component: Component2): void {}

  public getChildren(): Array<Component2> {
    return []
  }
}

class Composite extends Component2 {
  // 构件容器
  private componentList: any
  constructor(name: string) {
    super(name)
    this.componentList = []
  }

  public doOperation(): void {
    console.log(`这是容器${this.name}, 处理一些业务逻辑`)
  }

  public add(component: Component2): void {
    this.componentList.push(component)
  }

  public remove(component: Component2): void {
    const componentIndex = this.componentList.findIndex((value: Component2, index: number) => {
      return value == component
    })
    this.componentList.splice(componentIndex, 1)
  }

  public getChildren(): Array<Component2> {
    return this.componentList
  }
}

class Leaf extends Component2 {
  constructor(name: string) {
    super(name)
  }

  public doOperation(): void {
    console.log(`这是叶子节点${this.name}, 处理一些业务逻辑`)
  }
}

;(function main() {
  const root: Component2 = new Composite('root')
  const node1: Component2 = new Leaf('1')
  const node2: Component2 = new Composite('2')
  const node3: Component2 = new Leaf('3')

  root.add(node1)
  root.add(node2)
  root.add(node3)

  const node2_1: Component2 = new Leaf('2_1')
  node2.add(node2_1)
  console.log(root)

  const children1 = root.getChildren()
  console.log(children1)

  root.remove(node2)

  const children2 = root.getChildren()
  console.log(children2)
})()
