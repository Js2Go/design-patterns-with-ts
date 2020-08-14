// 抽象产品接口
interface Product2 {
  method1(): void
  method2(): void
}

// 具体产品1
class ConcreteProduct_1 implements Product2 {
  constructor() {}
  method1() {}
  method2() {}
}

// 具体产品2
class ConcreteProduct_2 implements Product2 {
  constructor() {}
  method1() {}
  method2() {}
}

// 抽象工厂
abstract class Creator {
  public abstract createProduct(type: number): Product2
}

// 具体工厂
class ConcreteCreator extends Creator {
  constructor() {
    super()
  }

  public createProduct(type: number): Product2 {
    let product: Product2 | null = null
    switch (type) {
      case 1:
        product = new ConcreteProduct_1()
        break
      case 2:
        product = new ConcreteProduct_2()
        break
    }
    return product!
  }
}

const creator: Creator = new ConcreteCreator()
const myProduct: Product2 = creator.createProduct(1)
const myProduct2: Product2 = creator.createProduct(2)
console.log(myProduct)
console.log(myProduct2)
