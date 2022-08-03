## 类型声明

```ts
//声明变量，指定类型
let a: number
a = 10

let c: boolean = true

// 如果变量的声明和赋值是同时进行的，TS将自动进行类型检测
let d = true
// d = 123 会报错

// 定义函数参数的类型以及返回值的类型
function sum(a: number, b: number): number {
  return a + b
}
sum(123, 456)
```

## 类型

```ts
// 直接使用字面量进行类型声明
let a: 10
a = 10
// a = 11 会报错

// 可以使用|链接多个类型(联合类型)
let b: "male" | "female"
b = "male"
b = "female"

let c: boolean | string
c = true
c = '123'

// any表示任意类型
let d: any
// 声明变量不指定类型，自动判断为any
let e

// unknown 未知类型的值
let f: unknown
f = 10
f = '123'

let s: string

// d的类型是any，它可以赋值给任意变量
s = d
// unknown是类型安全的any，无法直接赋值给其他变量
// s = f 会报错
if (typeof f === 'string') {
  // 此时不会报错
  s = f
}
// 类型断言, 可以用来告诉解析器变量的实际类型
/* 
  变量 as 类型
  <类型>变量
*/
s = f as string
s = <string>f

// void表示函数没有返回值
function fn(): void { }
// never表示永远不会返回结果
function fn2(): never {
  throw new Error('error123456')
}

let g: object
g = {}
g = function() { }

// 属性后加? 表示属性可选
let h: { name: string, age?: number }
h = { name: 'wang' }
// [propName: string]: any 表示任意类型的属性
let i: { name: string, [propName: string]: any }
i = {name: 'wang', a: 123, b: '456'}

/* 
  函数结构的类型声明
    (形参: 类型, ...) => 返回值
*/
let j: (a: number, b: number) => number
j = function(n1, n2) {
  return n1 + n2
}

// string[]表示字符串数组
let k: string[]
k = ['a', 'b']

let l: Array<number>
l = [1, 2, 3]

// 元组，固定长度的数组
let m: [string, string]
m = ['a', 'b']

// enum 枚举
enum Gender{
  Male,
  Female
}
let n: { name: string, gendar: Gender }
n = {
  name: 'wang',
  gendar: Gender.Male
}

// & 同时满足
let o: { name: string } & { age: number }
o = {name: 'wang', age: 18}

// 类型的别名
type myType = 1 | 2 | 3 | 4 | 5
let p: myType
let q: myType
```

## 类

### 构造函数
```ts
class Person {
  // 直接定义的属性是实例属性，需要通过对象的实例去访问
  name: string
  age2: number
  // static开头的是静态属性，直接通过类调用
  static age: number = 18
  // readonly 只读属性
  readonly gender: string = 'male'

  constructor(name: string, age: number) {
    this.name = name
    this.age2 = age
  }

  sayHello() {
    console.log('hello')
  }

  static sayHello2() {
    console.log('static hello')
  }
}

const bob = new Person('Bob', 50)
console.log(bob.name)
console.log(Person.age)
bob.sayHello()
Person.sayHello2()
```

### 继承

```ts
class Animal{
  name: string

  constructor(name: string) {
    this.name = name
  }

  sayHello(): void {
    console.log('hhhhh~')
  }
}

class Dog extends Animal{
  age: number
  
  constructor(name: string, age: number) {
    super(name)
    this.age = age
  }

  sayHello(): void {
    console.log('wangwangwang~')
  }
}

class Cat extends Animal{
  age: number
  
  constructor(name: string, age: number) {
    super(name)
    this.age = age
  }
  
  sayHello(): void {
    console.log('miaomiaomiao~')
  }
}

const dog = new Dog('旺财', 18)
const cat = new Cat('喵喵', 5)
dog.sayHello()
cat.sayHello()
```

### 抽象类

```ts
// abstract 抽象类 ，不能用来创建对象，只能用来继承
// 抽象类中可以添加抽象方法
abstract class Animal{
  name: string

  constructor(name: string) {
    this.name = name
  }

  // 抽象方法没有方法体，只能定义在抽象类中，子类必须对抽象方法进行重写
  abstract sayHello(): void
}

class Dog extends Animal{
  sayHello(): void {
    console.log('wangwangwang~')
  }
}

const dog = new Dog('旺财')
dog.sayHello()
```

### 接口

```ts
type myType = {
  name: string,
  age: number
}

/* 
  接口用来定义一个类结构,用来定义一个类中应该包含哪些属性和方法，
  可以当成类型声明去使用
*/
interface myInterface{
  name: string
  age: number
}

interface myInterface{
  gender: string
}

const obj: myInterface = {
  name: 'wang',
  age: 18,
  gender: 'male'
}

/* 
  接口可以在定义类的时候去限制类的结构
  接口中的所有属性都不能能有实际的值
  接口只定义对象的结构，不考虑实际值
  接口中的所有方法都是抽象方法
*/

interface myInter{
  name: string
  sayHello(): void
}

/* 
  实现类时，可以使类去实现一个接口
  实现接口就是使类满足接口的要求
*/
class MyClass implements myInter{
  name: string

  constructor(name: string) {
    this.name = name
  }

  sayHello(): void {
    console.log(this.name)
  }
}
```

### 属性的封装

```ts
class Person{
  /* 
    public 修饰的属性可以在任意位置读写 默认值
    private 私有属性，只能在类内部修改，通过类中添加方法使得可以被外部访问
    protected 受保护的属性，只能在当前类和当前类的子类中使用
  */
  private _age: number

  /* 可以直接将属性定义在构造函数中 */
  constructor(public name: string, age: number) {
    this.name = name
    this._age = age
  }

  /* getAge() {
    console.log(this.age)
  }

  setAge(value:number) {
    this.age =  value
  } */

  get age() {
    return this._age
  }

  set age(value:number) {
    this._age = value
  }
}

const per = new Person('wang', 18)
console.log(per.age)
per.age = 20
console.log(per.age)
```

## 泛型

```ts
/* 
  定义函数或类时，遇到类型不明确时就可以使用泛型
*/
function fn<T>(a:T): T {
  return a
}

// 可以直接调用
let res1 = fn(10) // ts自动对类型进行推断
let res2 = fn<string>('hello') // 手动指定
console.log(res1, res2)

// 可以同时指定多个
function fn2<T, K>(a:T, b:K):T {
  return a
}
fn2<number, string>(123, 'hello')

interface Inter{
  length: number
}

// T extends Inter 表示泛型必须是Inter实现类（子类）
function fn3<T extends Inter>(a:T):number {
  return a.length
}

fn3({ length: 10 })

class MyClass<T>{
  name: T
  constructor(name: T) {
    this.name = name
  }
}
let mc = new MyClass<string>('123')
```

## 例子

html模板
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>贪吃蛇</title>
</head>

<body>
  <div class="main">
    <div class="stage">
      <div class="snake">
        <div></div>
      </div>

      <div class="food">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="score-panel">
      <div>
        SCORE: <span class="score">0</span>
      </div>
      <div>
        level: <span class="level">1</span>
      </div>
    </div>
  </div>
</body>

</html>
```

样式
```less
/* index.less */
@bg-color:#b7d4a8;

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font: bold 20px "Courier";
}

.main{
  width: 360px;
  height: 420px;
  background-color: @bg-color;
  margin: 100px auto;
  border: 10px solid black;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  .stage{
    width: 304px;
    height: $width;
    border: 2px solid black;
    position: relative;

    .snake{
      &>div{
        width: 10px;
        height: $width;
        background-color: black;
        border: 1px solid @bg-color;
        position: absolute;
      }
    }

    .food{
      position: absolute;
      left: 40px;
      top: 100px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2px;
      
      &>div{
        width: 4px;
        height: $width;
        background-color: black;
        transform: rotate(45deg);
      }
    }
  }

  .score-panel{
    width: 300px;
    display: flex;
    justify-content: space-between;
  }
}
```

入口TS文件
```ts
/* index.ts */
import './style/index.less'

import GameControl from './modules/gameControl'

window.onload = () => {
  new GameControl()
}
```

GameControl模块
```ts
/* gameControl.ts */
import Food from './food'
import ScorePanel from './scorePanel'
import Snake from './snake'

class GameControl{
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  direction = ''

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 2)

    this.init()
  }

  init() {
    document.addEventListener('keydown', this.keyDownHandler.bind(this))
    this.run()
  }

  keyDownHandler(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault()
      if (
        (this.direction === 'ArrowUp' && event.key === 'ArrowDown')
        || (this.direction === 'ArrowDown' && event.key === 'ArrowUp')
        || (this.direction === 'ArrowLeft' && event.key === 'ArrowRight')
        || (this.direction === 'ArrowRight' && event.key === 'ArrowLeft')
      ) {
        return
      }
      this.direction = event.key
    }
  }

  run() {
    let X = this.snake.X
    let Y = this.snake.Y

    switch (this.direction) {
      case 'ArrowUp':
        Y -= 10
        break;
      case 'ArrowDown':
        Y += 10
        break;
      case 'ArrowLeft':
        X -= 10
        break;
      case 'ArrowRight':
        X += 10
        break;
    }

    if (this.checkEat(X, Y)) {
      this.food.change()
      this.scorePanel.addScore()
      this.snake.addBody()
    }

    this.snake.X = X
    this.snake.Y = Y

    this.snake.isLive ? setTimeout(() => {
      this.run()
    }, 300 - (this.scorePanel.level - 1) * 30) : alert('Game over!')

  }

  checkEat(X: number, Y: number) {
    return X === this.food.X && Y === this.food.Y
  }
}

export default GameControl
```

scorePanel模块
```ts
/* scorePanel.ts */
class ScorePanel{
  score = 0
  level = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement
  maxLevel: number
  upScore: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.querySelector('.score')!
    this.levelEle = document.querySelector('.level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  addScore() {
    this.scoreEle.innerHTML = ++this.score + ''
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }

  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}

export default ScorePanel
```

Snake模块
```ts
/* snake.ts */
class Snake{
  element: HTMLElement
  head: HTMLElement
  bodies: HTMLCollection
  isLive = true

  constructor() {
    this.element = document.querySelector('.snake')!
    this.head = document.querySelector('.snake > div') as HTMLElement
    this.bodies = this.element.getElementsByTagName('div')!
  }

  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(value: number) {
    if (this.X === value) {
      return
    }
    if (value < 0 || value > 290) {
      this.isLive = false
      return
    }
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkCollide()
  }

  set Y(value: number) {
    if (this.Y === value) {
      return
    }
    if (value < 0 || value > 290) {
      this.isLive = false
      return
    }
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkCollide()
  }

  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  checkCollide() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        this.isLive = false
        return
      }
    }
  }
}

export default Snake
```

Food模块
```ts
/* food.ts */
class Food{
  element: HTMLElement

  constructor() {
    // 加感叹号表示不可能为空
    this.element = document.querySelector('.food')!
  }

  // 定义获取食物X轴坐标
  get X() {
    return this.element.offsetLeft
  }

  get Y() {
    return this.element.offsetTop
  }

  change() {
    this.element.style.left = Math.round(Math.random() * 29) * 10 + 'px'
    this.element.style.top = Math.round(Math.random() * 29) * 10 + 'px'
  }
}

export default Food
```