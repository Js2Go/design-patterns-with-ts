// 以下是一个规则校验器实现，具有 and 和 or规则，
// 通过规则可以构建一棵解析树，用来检验一个文本是否满足解析树定义的规则

// 例如一棵解析树为 D And （A Or （B C）），文本 “D A”满足该解析树定义的规则
abstract class Expression {
  public abstract interpreter(str: string): boolean
}

class TerminalExpression extends Expression {
  private literal: string
  constructor(str: string) {
    super()
    this.literal = str
  }

  public interpreter(str: string): boolean {
    for (let charVal of str) {
      if (charVal === this.literal) {
        return true
      }
    }

    return false
  }
}

class AndExpression extends Expression {
  private expression1: Expression
  private expression2: Expression

  constructor(expression1: Expression, expression2: Expression) {
    super()
    this.expression1 = expression1
    this.expression2 = expression2
  }

  public interpreter(str: string): boolean {
    return this.expression1.interpreter(str) && this.expression2.interpreter(str)
  }
}

class OrExpression extends Expression {
  private expression1: Expression
  private expression2: Expression

  constructor(expression1: Expression, expression2: Expression) {
    super()
    this.expression1 = expression1
    this.expression2 = expression2
  }

  public interpreter(str: string): boolean {
    return this.expression1.interpreter(str) || this.expression2.interpreter(str)
  }
}

function buildInterpreterTree() {
  const terminal1: Expression = new TerminalExpression('A')
  const terminal2: Expression = new TerminalExpression('B')
  const terminal3: Expression = new TerminalExpression('C')
  const terminal4: Expression = new TerminalExpression('D')

  // B and C
  const alternation1: Expression = new AndExpression(terminal2, terminal3)
  // A Or (B C)
  const alternation2: Expression = new OrExpression(terminal1, alternation1)
  // D And (A Or (B C))
  return new AndExpression(terminal4, alternation2)
}

;(function main() {
  const define: Expression = buildInterpreterTree()
  const context1: string = 'D A'
  const context2: string = 'D B C'
  console.log(define.interpreter(context1))
  console.log(define.interpreter(context2))
}())
