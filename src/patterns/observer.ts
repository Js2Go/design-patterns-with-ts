// 观察者模式
interface AbstractSubject {
  registerObserver(observer: Observer): void
  remove(observer: Observer): void
  notifyObservers(): void
}

class ConcreteSubject implements AbstractSubject {
  private observers: Array<Observer>

  constructor() {
    this.observers = []
  }

  public registerObserver(observer: Observer): void {
    this.observers.push(observer)
  }

  public remove(observer: Observer): void {
    const observerIndex = this.observers.findIndex(value => {
      return value === observer
    })

    observerIndex >= 0 && this.observers.splice(observerIndex, 1)
  }

  public notifyObservers(): void {
    this.observers.forEach(observer => observer.update())
  }
}

interface Observer {
  update(): void
}

class ConcreteObserver1 implements Observer {
  public update(): void {
    console.log('已经执行更新操作1，值为')
  }
}

class ConcreteObserver2 implements Observer {
  public update(): void {
    console.log('已经执行更新操作2，值为')
  }
}

;(function main() {
  const subject: AbstractSubject = new ConcreteSubject()
  const observer1: Observer = new ConcreteObserver1()
  const observer2: Observer = new ConcreteObserver2()

  subject.registerObserver(observer1)
  subject.registerObserver(observer2)

  subject.notifyObservers()
})()


// 发布订阅模式
interface Publish {
  registerObserver(eventType: string, subscribe: Subscribe): void
  remove(eventType: string,  subscribe?: Subscribe): void
  notifyObservers(eventType: string): void
}

interface SubscribesObject {
  [key: string]: Array<Subscribe>
}

class ConcretePublish implements Publish {
  private subscribes: SubscribesObject

  constructor() {
    this.subscribes = {}
  }

  registerObserver(eventType: string, subscribe: Subscribe): void {
    if (!this.subscribes[eventType]) {
      this.subscribes[eventType] = []
    }

    this.subscribes[eventType].push(subscribe)
  }

  remove(eventType: string, subscribe?: Subscribe): void {
    const subscribeArray = this.subscribes[eventType]
    if (subscribeArray) {
      if (!subscribe) {
        delete this.subscribes[eventType]
      } else {
        for (let i = 0; i < subscribeArray.length; i++) {
          if (subscribe === subscribeArray[i]) {
            subscribeArray.splice(i, 1)
          }
        }
      }
    }
  }

  notifyObservers(eventType: string, ...args: any[]): void {
    const subscribes = this.subscribes[eventType]
    if (subscribes) {
      subscribes.forEach(subscribe => subscribe.update(...args))
    }
  }
}

interface Subscribe {
  update(...value: any[]): void
}

class ConcreteSubscribe1 implements Subscribe {
  public update(...value: any[]): void {
    console.log('已经执行更新操作1，值为', ...value)
  }
}

class ConcreteSubscribe2 implements Subscribe {
  public update(...value: any[]): void {
    console.log('已经执行更新操作2，值为', ...value)
  }
}

;(function main() {
  const publish = new ConcretePublish()
  const subscribe1 = new ConcreteSubscribe1()
  const subscribe2 = new ConcreteSubscribe2()

  publish.registerObserver('1', subscribe1)
  publish.registerObserver('2', subscribe2)

  publish.notifyObservers('2', '2222222')
  publish.notifyObservers('1', '1111111')
}())
