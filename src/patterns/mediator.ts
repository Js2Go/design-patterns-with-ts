abstract class Colleague {
  public abstract onEvent(envetType: string): void
}

class ConcreteColleagueA extends Colleague {
  private mediator: Mediator

  constructor(mediator: Mediator) {
    super()
    this.mediator = mediator
  }

  public onEvent(eventType: string): void {
    this.mediator.doEvent(eventType)
  }

  public doSomething(): void {
    console.log('A被运行了')
  }
}

class ConcreteColleagueB extends Colleague {
  private mediator: Mediator

  constructor(mediator: Mediator) {
    super()
    this.mediator = mediator
  }

  public onEvent(eventType: string): void {
    this.mediator.doEvent(eventType)
  }

  public doSomething(): void {
    console.log('B被运行了')
  }
}

abstract class Mediator {
  protected _colleagueA ?: ConcreteColleagueA
  protected _colleagueB ?: ConcreteColleagueB

  set colleagueA(colleagueA: ConcreteColleagueA) {
    this._colleagueA = colleagueA
  }

  set colleagueB(colleagueB: ConcreteColleagueB) {
    this._colleagueB = colleagueB
  }

  public abstract doEvent(eventType: string): void
}

class ConcreteMediator extends Mediator {
  // 1. 根据得到的消息，完成对应任务
  // 2. 中介者在这个方法，协调各个具体的同事对象，完成任务
  public doEvent(eventType: string): void {
    switch (eventType) {
      case 'A': {
        this.doColleagueAEvent()
        break
      }
      case 'B': {
        this.doColleagueBEvent()
        break
      }
      default: {}
    }
  }

  // 相应业务逻辑
  public doColleagueAEvent(): void {
    super._colleagueA && super._colleagueA.doSomething()
    super._colleagueB && super._colleagueB.doSomething()
    console.log('A-B执行完毕')
  }
  public doColleagueBEvent(): void {
    super._colleagueB && super._colleagueB.doSomething()
    super._colleagueA && super._colleagueA.doSomething()
    console.log('B-A执行完毕')
  }
}

;(function main() {
  const mediator: Mediator = new ConcreteMediator()
  const myColleagueA: ConcreteColleagueA = new ConcreteColleagueA(mediator)
  const myColleagueB: ConcreteColleagueB = new ConcreteColleagueB(mediator)
  mediator.colleagueA = myColleagueA
  mediator.colleagueB = myColleagueB

  myColleagueA.onEvent('A')
  myColleagueB.onEvent('B')
}())
