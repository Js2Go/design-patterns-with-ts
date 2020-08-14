class Originator {
  private _state: string = ''

  constructor() {}

  get state() {
    return this._state
  }

  set state(value) {
    this._state = value
  }

  // 创建一个备忘录
  public createMemento(): Memento {
    console.log('创建了一个备忘录!')
    return new Memento(this._state)
  }

  // 恢复一个备忘录
  public recoverMemento(memento: Memento) {
    console.log('恢复了一个备忘录!')
    this.state = memento.state
  }
}

class Memento {
  private _state: string
  constructor(state: string) {
    this._state = state
  }

  get state(): string {
    return this._state
  }
}

class Caretaker {
  // 保存一次状态在此，保存多次用数组
  private memento ?: Memento

  public getMemento(): Memento | undefined {
    return this.memento
  }

  public setMemento(memento: Memento): void {
    this.memento = memento
  }
}

;(function main() {
  // 定义发起人
  const originator: Originator = new Originator()
  // 定义守护者
  const caretaker: Caretaker = new Caretaker()
  // 创建一个备忘录
  const memento: Memento = originator.createMemento()
  // 将备忘录存储到守护者
  caretaker.setMemento(memento)
  // 恢复一个备忘录
  originator.recoverMemento(memento)
}())
