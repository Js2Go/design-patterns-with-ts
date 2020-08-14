// 饿汉式
// 初始化时就创建实例
class Singleton1 {
  // 1, 构造器私有化，外部不能new
  private constructor() {}

  // 2. 本类内部创建对象实例化
  private static instance: Singleton1 = new Singleton1()

  // 3. 提供一个共有的静态方法，返回实例对象
  public static getInstance(): Singleton1 {
    return this.instance
  }
}

console.log(Singleton1.getInstance(), '111')


// 懒汉式
// 第一次使用时创建实例
class Singleton2 {
  private constructor() {}

  private static instance: Singleton2 | null = null

  public static getInstance(): Singleton2 {
    if (!this.instance) {
      this.instance = new Singleton2()
    }
    return this.instance
  }
}

console.log(Singleton2.getInstance(), '222')
