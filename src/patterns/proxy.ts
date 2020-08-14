// 静态代理
interface Subject {
  doOperation(): void
}

class RealSubject implements Subject {
  public doOperation() {
    console.log('我是RealSubject类，正在执行')
  }
}

class MyProxy implements Subject {
  private target: Subject
  constructor(realSubject: Subject) {
    this.target = realSubject
  }

  public doOperation() {
    console.log('我是代理类')
    this.target.doOperation()
  }
}

;(function main() {
  const realSubject: Subject = new RealSubject()
  const myProxy: Subject = new MyProxy(realSubject)

  myProxy.doOperation()
}())



// 动态代理
interface Subject2 {
  doOperation(): void
}

class RealSubject2 implements Subject2 {
  constructor() {}

  public doOperation(): void {
    console.log('我是RealSubject2类，正在执行')
  }
}

class ProxyFactory {
  private target: any
  constructor(target: any) {
    this.target = target
  }

  public getProxyInstance(): any {
    return new Proxy(this.target, {
      get: (target, propKey) => {
        // 做一些拦截处理
        return target[propKey]
      }
    })
  }
}

;(function main() {
  const target: Subject2 = new RealSubject2()
  const proxyInstance: Subject2 = <Subject2>new ProxyFactory(target).getProxyInstance()

  proxyInstance.doOperation()
}())
