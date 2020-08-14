abstract class State {
  public abstract handle1(): void
  public abstract handle2(): void
}

class ConcreteState1 extends State {
  private context: Context
  constructor(context: Context) {
    super()
    this.context = context
  }

  // 本状态下需要处理的逻辑
  public handle1(): void {
    console.log('State1的状态需要处理的逻辑')
  }

  // 进行状态转移
  public handle2(): void {
    this.context.currentState = this.context.STATE2
    console.log('由状态state1转为state2')
  }
}

class ConcreteState2 extends State {
  private context: Context
  constructor(context: Context) {
    super()
    this.context = context
  }

  // 本状态下需要处理的逻辑
  public handle1(): void {
    this.context.currentState = this.context.STATE1
    console.log('由状态state2转为state1')
  }
  
  // 进行状态转移
  public handle2(): void {
    console.log('State2的状态需要处理的逻辑')
  }
}

class Context {
  public STATE1: State = new ConcreteState1(this)
  public STATE2: State = new ConcreteState2(this)
  public currentState: State

  constructor() {
    this.currentState = this.STATE1
  }

  public doOperation1() {
    this.currentState?.handle2()
  }

  public doOperation2() {
    this.currentState?.handle1()
  }
}

;(function main() {
  const context: Context = new Context()
  context.doOperation1()
  context.doOperation2()
}())
