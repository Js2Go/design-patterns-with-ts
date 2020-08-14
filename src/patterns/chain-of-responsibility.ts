abstract class Handler {
  // 下一个处理者
  public successor ?: Handler
  public name: string
  constructor(name: string) {
    this.name = name
  }

  public abstract handleRequest(request: MyRequest): void

  public setNext(successor: Handler): void {
    this.successor = successor
  }
}

class ConcreteHandler1 extends Handler {
  constructor(name: string) {
    super(name)
  }

  public handleRequest(request: MyRequest): void {
    // 首先判断当前级别是否能够处理，不能够处理则交给下一级别处理
    if (request.level <= 1) {
      console.log('被一级处理')
    } else {
      // 交给下一级处理
      this.successor && this.successor.handleRequest(request)
    }
  }
}

class ConcreteHandler2 extends Handler {
  constructor(name: string) {
    super(name)
  }

  public handleRequest(request: MyRequest): void {
    // 首先判断当前级别是否能够处理，不能够处理则交给下一级别处理
    if (request.level > 1 && request.level <= 2) {
      console.log('被二级处理')
    } else {
      // 交给下一级处理
      this.successor && this.successor.handleRequest(request)
    }
  }
}

class ConcreteHandler3 extends Handler {
  constructor(name: string) {
    super(name)
  }

  public handleRequest(request: MyRequest): void {
    // 首先判断当前级别是否能够处理，不能够处理则交给下一级别处理
    if (request.level > 2) {
      console.log('被三级处理')
    } else {
      // 交给下一级处理
      this.successor && this.successor.handleRequest(request)
    }
  }
}

class MyRequest {
  private _level: number
  constructor(level: number) {
    this._level = level
  }

  get level(): number {
    return this._level
  }

  set level(value: number) {
    this._level = value
  }
}

;(function main() {
  // 创建一个请求
  const request: MyRequest = new MyRequest(5)

  // 创建相关处理人
  const handler1: Handler = new ConcreteHandler1('lili')
  const handler2: Handler = new ConcreteHandler2('linlin')
  const handler3: Handler = new ConcreteHandler3('shunshun')

  // 设置下级别审批，构成环形结构
  handler1.setNext(handler2)
  handler2.setNext(handler3)
  handler3.setNext(handler1)

  handler1.handleRequest(request)
}())
