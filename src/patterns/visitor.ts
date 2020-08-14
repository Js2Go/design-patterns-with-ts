abstract class AbstractElement {
  // 定义业务逻辑
  public abstract doSomething(): void
  // 允许谁来访问
  public abstract accept(visitor: Visitor): void
}

class ConcreteElement1 extends AbstractElement {
  public doSomething(): void {
    console.log('ConcreteElement1执行的业务逻辑')
  }

  public accept(visitor: Visitor): void {
    visitor.visit1(this)
  }
}

class ConcreteElement2 extends AbstractElement {
  public doSomething(): void {
    console.log('ConcreteElement2执行的业务逻辑')
  }

  public accept(visitor: Visitor): void {
    visitor.visit2(this)
  }
}

abstract class Visitor {
  public abstract visit1(element1: ConcreteElement1): void
  public abstract visit2(element2: ConcreteElement2): void
}

class ConcreteVisitor extends Visitor {
  public visit1(element1: ConcreteElement1): void {
    console.log('进入处理element1')
    element1.doSomething()
  }

  public visit2(element2: ConcreteElement2): void {
    console.log('进入处理element2')
    element2.doSomething()
  }
}

// 数据结构，管理很多元素（ConcreteElement1， ConcreteElement2）
class ObjectStructure {
  private listSet: Set<AbstractElement>
  constructor() {
    this.listSet = new Set()
  }

  // 增加
  public attach(element: AbstractElement): void {
    this.listSet.add(element)
  }

  // 删除
  public detach(element: AbstractElement): void {
    this.listSet.delete(element)
  }

  // 显示
  public display(visitor: Visitor): void {
    for (let element of this.listSet.values()) {
      element.accept(visitor)
    }
  }
}

;(function main() {
  const objectStructure: ObjectStructure = new ObjectStructure()
  objectStructure.attach(new ConcreteElement1())
  objectStructure.attach(new ConcreteElement2())
  objectStructure.detach(new ConcreteElement2())

  const visitor: Visitor = new ConcreteVisitor()

  objectStructure.display(visitor)
})()
