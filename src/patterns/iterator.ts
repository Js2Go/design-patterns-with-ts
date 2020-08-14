interface AbstractIterator {
  next(): any
  hasNext(): boolean
  remove(): boolean
}

class  ConcreteIterator implements AbstractIterator {
  private list: any[]
  public cursor: number = 0
  constructor(array: any[]) {
    this.list = array
  }

  public next(): any {
    return this.hasNext() ? this.list[this.cursor++] : null
  }

  public hasNext(): boolean {
    return this.cursor < this.list.length
  }

  public remove(): boolean {
    this.list.splice(this.cursor--, 1)
    return true
  }
}

interface Aggregate {
  add(value: any): void
  remove(value: any): void
  createIterator(): AbstractIterator
}

class ConcreteAggregate implements Aggregate {
  // 容纳对象的容器
  private list: any[]
  constructor() {
    this.list = []
  }

  add(value: any): void {
    this.list.push(value)
  }

  remove(value: any): void {
    const index = this.list.findIndex((listValue: any) => {
      return value === listValue
    })
    this.list.splice(index, 1)
  }

  createIterator(): AbstractIterator {
    return new ConcreteIterator(this.list)
  }
}

;(function main() {
  const aggregate: Aggregate = new ConcreteAggregate()
  aggregate.add('1111')
  aggregate.add('2222')

  const iterator: AbstractIterator = aggregate.createIterator()
  while(iterator.hasNext()) {
    console.log(iterator.next())
  }
}())
