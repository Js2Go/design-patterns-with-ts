// 抽象创建者
abstract class Builder {
  public abstract buildPartA(): void
  public abstract buildPartB(): void
  public abstract buildPartC(): void
  public abstract buildProduct(): Product_
}

// 具体建造者
class ConcreteBuilder extends Builder {
  private product: Product_
  constructor(product: Product_) {
    super()
    this.product = product
  }

  public buildPartA(): void {}
  public buildPartB(): void {}
  public buildPartC(): void {}

  public buildProduct(): Product_ {
    return this.product
  }
}

// 产品角色
class Product_ {
  public doSomething(): void {
    // 独立业务
  }
}

// 指挥者
class Director {
  private _builder: Builder
  constructor(build: Builder) {
    this._builder = build
  }

  set builder(builder: Builder) {
    this._builder = builder
  }

  public constructorProduct() {
    this._builder.buildPartA()
    this._builder.buildPartB()
    this._builder.buildPartC()
    return this._builder.buildProduct()
  }
}

const builder: Builder = new ConcreteBuilder(new Product_())
const director: Director = new Director(builder)
const product_: Product_ = director.constructorProduct()
console.log(product_)
