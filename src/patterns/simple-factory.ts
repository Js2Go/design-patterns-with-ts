// 抽象产品接口
interface Product {}

// 具体产品1
class ConcreteProduct1 implements Product {
  constructor() {}
}

// 具体产品2
class ConcreteProduct2 implements Product {
  constructor() {}
}

// 简单工厂
class SimpleFactory {
  public static createProduct(type: number): Product {
    let product: Product | null = null
    switch (type) {
      case 1:
        product = new ConcreteProduct1()
        break
      case 2:
        product = new ConcreteProduct2()
        break
    }
    return product!
  }
}

let product = SimpleFactory.createProduct(1)
console.log(product)

let product2 = SimpleFactory.createProduct(2)
console.log(product2)
