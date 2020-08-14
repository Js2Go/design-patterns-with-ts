interface Strategy {
  // 策略模式运算法则
  doSomething(): void
}

class ConcreteStrategy1 implements Strategy {
  public doSomething(): void {
    console.log('使用的策略1')
  }
}

class ConcreteStrategy2 implements Strategy {
  public doSomething(): void {
    console.log('使用的策略2')
  }
}

class ContextOfStrategy {
  private _strategy: Strategy
  constructor(strategy: Strategy) {
    this._strategy = strategy
  }

  set strategy(strategy: Strategy) {
    this._strategy = strategy
  }

  // 封装后的策略方法
  doOperation(): void {
    this._strategy.doSomething()
  }
}

;(function main() {
  const strategy1: Strategy = new ConcreteStrategy1()
  const strategy2: Strategy = new ConcreteStrategy2()
  const context: ContextOfStrategy = new ContextOfStrategy(strategy1)
  context.doOperation()
  context.strategy = strategy2
  context.doOperation()
}())
