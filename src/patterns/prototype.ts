interface Prototype {
  clone(): Prototype
}

class Person implements Prototype {
  public name: string
  public birthYear: number
  public sex: string
  public presentYear: number

  constructor() {
    this.name = 'kaikai'
    this.birthYear = 1995
    this.sex = 'female'
    this.presentYear = 2020
  }

  public getDiscription(): string {
    return `大傻瓜叫${this.name},性别${this.sex},${this.presentYear}年${this.presentYear - this.birthYear}岁了`
  }

  public clone(): Prototype {
    return Object.create(this)
  }
}

const person = new Person()
console.log(person.getDiscription())
person.presentYear = 2021
const person2 = Object.create(person)
console.log(person2.getDiscription())
