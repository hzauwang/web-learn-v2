## 在线学习网站  

* [菜鸟教程](https://www.runoob.com/js/js-tutorial.html)  
* [W3school](https://www.w3school.com.cn/js/index.asp)  
* [Mozilla 开发者社区](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)  

## 视频教程  

[黑马前端](https://www.bilibili.com/video/BV1Sy4y1C7ha)  

## 电子书  

[JavaScript高级程序设计](https://pan.baidu.com/s/13ZxjQhQHEKp_SUVfbB9ehw) (提取码: 7ig0)  

## js代码规范

[https://github.com/lin-123/javascript](https://github.com/lin-123/javascript)

## JavaScript训练

[freeCodeCamp](https://chinese.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)  

## JavaScript数据类型

基本数据类型: Number, String, Boolean, Null, Undefined, BigInt, Symbol

引用数据类型: Object


### <code>Symbol</code>:

```js
let a = Symbol('foo')
a.toString() // 'Symbol(foo)'
a.description // 'foo'
let b = Symbol('foo')
console.log(a === b) // false
let c = Symbol.for('foo')
let d = Symbol.for('foo')
console.log(c === d) // true

let obj = {
  [a]: 'value1',
  name: 'value2'
}

Object.getOwnPropertySymbols(obj) // 仅获取对象中的symbol键
Reflect.ownKeys(obj) // 获取所有键包括symbol

// 不能与其他数据运算
```

内置属性
```js
class Person{
  static [Symbol.hasInstance](param) {
    console.log(param)
    console.log('检测类型')
    return true //返回值为判断结果
  }
}
let o = { name: 1, age: 2 }
console.log(o instanceof Person) // { name: 1, age: 2 }  '检测类型'

const arr = [1, 2, 3]
const arr2 = [4, 5, 6]
arr2[Symbol.isConcatSpreadable] = false
console.log(arr.concat(arr2)) // [1, 2, 3, [4, 5, 6]]
```

#### 迭代器

Symbol.iterator  
工作原理：  

- 创建一个指针对象，指向当前数据结构的起始位置  
- 第一次调用对象的next方法，指针自动指向数据结构的第一个成员
- 接下来调用next方法，指针会一直往后移动，直到指向最后一个成员
- 每调用next方法返回一个包含value和done属性的对象  

```js
const TEST = [1, 2, 3, 4]

for (const i of TEST) {
  console.log(i) // 1 2 3 4
}

let iterator = TEST[Symbol.iterator]()
console.log(iterator.next()) // {value: 1, done: false}
console.log(iterator.next()) // {value: 2, done: false}
console.log(iterator.next()) // {value: 3, done: false}
console.log(iterator.next()) // {value: 4, done: false}
console.log(iterator.next()) // {value: undefined, done: true}
```

应用  

```js
// 使用for...of遍历对象
const TEST = {
  name: 'wang',
  someThing: [
    'a',
    'b',
    'c',
    'd'
  ],
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.someThing.length) {
          const result = { value: this.someThing[index], done: false }
          index++
          return result
        } else {
          return { value: undefined, done: true }
        }
      }
    }
  }
}

for (const i of TEST) {
  console.log(i) // a b c d
}
```


### 类型判断  

- <code>typeof</code>: 可以判断undefined/number/string/boolean/function  
- <code>instanceof</code>: 判断对象的具体类型  
- <code>===</code>: undefined/null  

### undefined和null

- undefined：定义了但没赋值  
- null： 定义了且值为null， 可用于给某个对象变量赋初始值或回收不用的对象  


### 数值扩展

```js
// 1.Number.EPSILON 是js表示的最小精度

function equal(a, b) {
  if (Math.abs(a - b) < Number.EPSILON) {
    return true
  } else {
    return false
  }
}

console.log(0.1 + 0.2 === 0.3) // false
console.log(equal(0.1 + 0.2, 0.3)) // true

// 2. 二进制和八进制
let b = 0b1010 // 二进制
let o = 0o777 // 八进制
let d = 100
let x = 0xff // 16进制

// 3.Number.isFinite,检测一个数值是否为有限数
console.log(Number.isFinite(100)) // true
console.log(Number.isFinite(100 / 0)) // false

// 4.Number.isNaN 检查一个数值是否为NaN
console.log(Number.isNaN(123)) // false

// 5. Number.parseInt(), NumberFloat()

// 6. Number.isInteger 判断一个数是否为整数
Number.isInteger(1.23) // false

// 7. Math.trunc 将数字的小数部分抹掉
Math.trunc(1.23) // 1

// 7. Math.sign 判断一个数为正数、负数、还是0
Math.sign(0) // 0
Math.sign(2) // 1
Math.sign(-2) // -1
```

### BigInt

```js
let n = 521n
console.log(n, typeof n) // 521n 'bigint'

let n = 123
console.log(BigInt(n)) // 123n

let max = Number.MAX_SAFE_INTEGER
console.log(max) // 9007199254740991
console.log(max + 1) // 9007199254740992
console.log(max + 2) // 9007199254740992 无法继续增加

console.log(BigInt(max) + BigInt(1)) // 9007199254740992n
console.log(BigInt(max) + BigInt(2)) // 9007199254740993n
```

## 变量

### var 声明变量提升

使用<code>var</code>声明的变量，会在所有代码执行前被声明，但不会被赋值
```js
console.log(a) //undefined
var a = 1
```

### let 声明变量

```js
let a = 1, b = 2

// 1.变量不能重复声明
let a = 1
let a = 2 //报错

// 2.块级作用域
// if else while for
{
  let test = 'a'
}
console.log(test) // 报错

// 3.不存在变量提升
console.log(test2) // 报错
let test2 = 1

// 4.不影响作用域链
{
  let mya = '123456'
  function fn() {
    console.log(mya)
  }
  fn() // 执行没有问题
}
```

### const 声明常量

```js
// 1.必须赋初始值

const A // 报错

// 2.一般用大写

// 3.常量不能修改

// 4.块级作用域

// 5.数组和对象的元素修改，不算对常量修改
const TEAM = [1,2,3]
TEAM.push(4) // 正常执行
TEAM = [] // 报错
```

!!!note
    关于变量声明和函数声明的详细说明[https://mp.weixin.qq.com/s/MlKRNfK3blGJA7bfXzdsNg](https://mp.weixin.qq.com/s/MlKRNfK3blGJA7bfXzdsNg)

例子： 
```js
var a = 0
if(true){
  console.log(a, window.a)
  a = 10
  console.log(a, window.a)
  function a(){}
  console.log(a, window.a)
  a = 20
  console.log(a, window.a)
}
console.log(a, window.a)
```

### 变量的解构赋值

```js
/* 数组 */
const TEST = [1, 2, 3, 4]
let [a, b, c, d] = TEST

a // 1
b // 2
c // 3
d // 4

/* 对象 */
const person = {
  name: 'zhao',
  age: 18,
  say: function() {
    console.log(this.name)
  }
}

let {name, age, say} = person
```


## 扩展运算符

```js
const TEST = [1, 2, 3]
function fn() {
  console.log(arguments)
}
fn(TEST) // arguments.length == 1, arguments[0] == [1, 2, 3]
fn(...TEST) // arguments.length == 3, arguments[0] == 1, arguments[1] == 2, ...

// 1.数组的合并
const TEST1 = [1, 2]
const TEST2 = [3, 4]
const RES1 = TEST1.concat(TEST2)
const RES2 = [...TEST1, ...TEST2]

// 2.数组的克隆
const TEST3 = [...TEST1] // 里面有引用类型的话，也是浅拷贝

// 3.伪数组转为真数组
const divs = document.querySelectorAll('div')
const divArr = [...divs]
```

## 字符串的一些方法
```js
let str = 'hello'

// 返回指定索引的Unicode编码
str.charCodeAt(0) // 104

// Unicode编码转为字符
String.fromCharCode(104) // 'h'

// 从后往前找
str.lastIndexOf('l')

/* ---切片--- */

str.slice(0,2) // 'he'
str.slice(0,-2) // 'hel'

// substring类似于slice
//   传递负值会转为0
//   自动调整参数位置，传入(1, 0)会变为(0, 1)
str.substring(0, -2) // '' 变为(0, 0)

// 第二个参数为长度
str.substr(1, 2) // 'el'

/* -------- */

// 大小写转换
str.toUpperCase()
str.toLowerCase()
```

部分方法查看<strong>正则表达式</strong>部分

### 模板字符串

```js
const A = 1
let str = `A是${A}`
```

## 正则表达式

匹配模式： 

* i 忽略大小写
* g 全局

```js
// new RegExp('正则', '匹配模式')
// 字面量创建 /正则/匹配模式
let reg = new RegExp("a", "i")
let reg2 = /a/i

// 测试是否符合正则
reg.test("a")

// \ 转义字符
let reg3 = /a|b/ // a 或 b
let reg4 = /[ab]/ // a 或 b
let reg5 = /[A-z]/ // 任意字母, [0-9] 任意数字
let reg6 = /[^ab]/ // 除了a b 以外的
reg6.test('ab') // false
reg6.test('ac') // true

let reg7 = /(ab){m,n}/ // ab 出现m次到n次，{m,} 表示m次以上
let reg8 = /ab+c/ // +表示至少出现一次，相当于{1,}
let reg9 = /ab*c/ // * 相当于{0,}
let reg10 = /ab?c/ // ? 相当于{0,1}

let reg11 = /^a$/ // ^ 以a开头, $ 以a结尾

let reg12 = /./ // . 表示任意字符(除了换行和行结束符)

/*
 * \w 字母、数字、_
 * \W 和\w 相反 
 * \d 数字
 * \D 相反 
 * \s 空格
 * \S
 * \b 单词边界
 * \B
 */

let reg13 = /child/
reg13.test('hello children') // true
let reg14 = /\bchild\b/
reg14.test('hello children') // false

let str = 'someString'

str.split()

// 找到返回第一次出现的索引，没有返回-1
str.search(/[ab]/)

// 返回值类型为数组，默认返回第一次符合要求的内容，匹配模式设为g时，返回所有的
str.match(/[abc]/)

str.replace()
```


## JavaScript对象

### <code>Object.defineProperty()</code>

```js
let person = {
  name: 'wang'
}
Object.defineProperty(person, 'age', {
	value: 18,
	enumerable: true, // 控制属性是否可枚举, default: false
	writable: true, // 控制属性是否可修改, default: false
	configurable: true // 控制属性是否可以通过delete删除, default: false
})
let number = 18

// 数据双向绑定
Object.defineProperty(person, 'age', {
  get() {
    return number // 当读取age属性时被调用(getter)
  },
  set(value) {
    number = value // 当修改person.age时被调用(setter)
  }
})
// 数据代理, 一个对象代理另一个对象的属性的操作（读/写）
let obj = { x: 1 }
let obj2 = {}
Object.defineProperty(obj2, 'x', {
  get() {
    return obj.x
  },
  set(value) {
    obj.x = value
  }
})
```


### this
关键字"this"指向了当前代码运行时的对象(the current object the code is being written inside)  
```JavaScript
var person1 = {
  name : 'Chris',
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}
person1.greeting() //输出"Hi! I'm Chris."
```

### 原型、原型链

每个对象拥有一个原型（prototype）对象，对象以其原型为模板、从原型继承方法和属性。  
原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链（prototype chain）。
```js
function doSomething(){}
doSomething.prototype.foo = "bar";
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value";
console.log("doSomeInstancing.prop:      " + doSomeInstancing.prop);
// doSomeInstancing.prop:      some value
console.log("doSomeInstancing.foo:       " + doSomeInstancing.foo);
// doSomeInstancing.foo:       bar
console.log("doSomething.prop:           " + doSomething.prop);
// doSomething.prop:           undefined
console.log("doSomething.foo:            " + doSomething.foo);
// doSomething.foo:            undefined
console.log("doSomething.prototype.prop: " + doSomething.prototype.prop);
// doSomething.prototype.prop: undefined
console.log("doSomething.prototype.foo:  " + doSomething.prototype.foo);
// doSomething.prototype.foo:  bar
```
继承的属性和方法是定义在 prototype 属性之上的。
prototype 属性的值是一个对象，我们希望被原型链下游的对象继承的属性和方法，都被储存在其中。


常见的对象定义模式是，在构造器（函数体）中定义属性、在 prototype 属性上定义方法。
```js
function Test(a, b) {
  this.a = a
  this.b = b
}

Test.prototype.x = function() {
  console.log(this.a)
}

Test.prototype.y = function() {
  console.log(this.b)
}
```

### 显式原型、隐式原型

- 函数的prototype默认指向的是Object实例对象，但是Object的prototype不是  
- 所有函数都是Function的实例，包括Function是它自身的实例

```js
function Fn() { // this.prototype = {}

}
console.log(Fn.prototype) // Fn的prototype为显式原型
let fn = new Fn() // 实例对象的__proto__为隐式原型, this.__proto__ = Fn.prototype

Fn.prototype === fn.__proto__ // true

Object instanceof Function // true Object.__proto__ === Function.prototype
Object instanceof Object // true Object.__proto__.__proto__ === Object.prototype
Function instanceof Function // true Function.__proto__ === Function.prototype
Function instanceof Object // Function.__proto__.__proto__ === Object.prototype

/* 示例 */
let F = function(){}

Object.prototype.a = function(){
    console.log('a')
}
Function.prototype.b = function(){
    console.log('b')
}
let f = new F()

f.a() // a F.prototype.__proto__.a
f.b() // 报错 F.prototype.__proto__.__proto__是null
F.a() // a Function.prototype.__proto__.a
F.b() // b Function.prototype.b
```

### 类

#### 构造函数  
```JavaScript
class Person{
  //静态属性，属于类，但不属于实例对象
	static name = '001'
  static eat() {
    console.log('hhh')
  }

  //构造方法,在new的时候执行
	constructor(name) {
		this.name = name
	}

	introduceSelf() {
		console.log(`Hi! I'm ${this.name}`)
	}
}
const xiaoming =  new Person('XiaoMing')
xiaoming.introduceSelf() // Hi! I'm XiaoMing
```

#### 继承  
```JavaScript
/* ES5的实现方法 */
function Person(name) {
  this.name = name
}
Person.prototype.introduceSelf = function() {
  console.log(`Hi! I'm ${this.name}`)
}

function Professor(name, teaches) {
  Person.call(this, name)
  this.teaches = teaches
}
Professor.prototype = new Person()
Professor.prototype.constructor = Professor
Professor.prototype.grade = function() {
  const grade = Math.floor(Math.random() * (5 - 1) + 1)
	console.log(grade)
}

/* ES6的实现方法 */
class Professor extends Person{
	teaches

	constructor(name, teaches) {
		super(name)
		this.teaches = teaches
	}

	introduceSelf() {
		console.log(`My name is ${this.name}, and I will be your ${this.teaches} professor.`)
	}

	grade() {
		const grade = Math.floor(Math.random() * (5 - 1) + 1)
		console.log(grade)
	}
}
const xiaodong = new Professor('XiaoDong', 'XiaoMing')
xiaodong.introduceSelf() // My name is XiaoDong, and I will be your XiaoMing professor.
xiaodong.grade() // some random grade
```

#### 封装  
```JavaScript
class Student extends Person{
	#year

	constructor(name, year) {
		super(name)
		this.#year = year //私有属性
	}

	introduceSelf() {
		console.log(`Hi! I'm ${this.name}, and I'm in year ${this.#year}.`);
	}

	canStudyArchery() {
		return this.#year > 1;
	}

	somePublicMethod() {
		this.#somePrivateMethod()
	}

	#somePrivateMethod() { //私有方法
		console.log('You called me?');
	}
}

const summers = new Student('Summers', 3)
summers.introduceSelf() //Hi! I'm Summers, and I'm in year 3.
summers.canStudyArchery() //true
summers.#year //属性 "#year" 在类 "Student" 外部不可访问，因为它具有专用标识符。
summers.somePublicMethod() //You called me?
summers.#somePrivateMethod() //属性 "#somePrivateMethod" 在类 "Student" 外部不可访问，因为它具有专用标识符。
```

#### getter和setter设置
```js
class Phone {
  get price() {
    console.log('价格被读取了')
  }

  set price(newVal) {
    console.log('价格被修改了')
  }
}

let s = new Phone()
s.price // '价格被读取了'
s.price = 123 // '价格被修改了'
```

### <code>Date()</code>

```js
let d = new Date()

// 创建指定时间

let d2 = new Date("12/03/2016 11:10:30")
console.log(d2) // Sat Dec 03 2016 11:10:30 GMT+0800 (中国标准时间)

// 获取当前实例是几号
d2.getDate() // 3

// 周几, 0表示周日
d2.getDay() // 6

// 月份, 返回0-11, 11表示12月
d2.getMonth() // 11

// 年份
d2.getFullYear() // 2016

// 时间戳
d2.getTime() // 1480734630000

// 当前时间的时间戳
Date.now()
```

### <code>Math</code>

不是构造函数，是一个工具类，封装了数学相关的属性和方法
```js
// 绝对值
Math.abs(-20) // 20

// 向上取整
Math.ceil(1.2) // 2

// 向下取整
Math.floor(1.8) // 1

// 四舍五入
Math.round()

// 0-1之间的随机数
Math.random()
// x-y随机整数
Math.round(Math.random() * (y - x) + x)

Math.max(1,2,3)
Math.min(1,2,3)
Math.pow(2,5)
Math.sqrt(5)
```


### 包装类

- String()  
- Number()  
- Boolean()
  
```js
let num = new Number(3)
let str = new String('hello')
let bool = new Boolean(true)

// 对基本数据类型调用属性和方法时，浏览器会临时使用包装类将其转换为对象，然后再调用属性和方法
let s = 123
s.tpString()
```



### 对象方法扩展

#### <code>Object.is</code>，判断两个数是否完全相等

```js
Object.is(120, 121)
// 和===的区别
Object.is(NaN, NaN) // true
NaN === NaN // false
```

#### <code>Object.assign()</code>
<code>Object.assign()</code>方法将所有<strong>可枚举</strong>和<strong>自有</strong>属性从一个或多个源对象复制到目标对象，返回修改后的对象。  

* 如果和target的已有属性重名，则会覆盖
* 后续的source会覆盖前面的source的同名属性

```js
const target = { a: 1, b: 2 }
const source = { b: 4, c: 5 }

const returnedTarget = Object.assign(target, source)

console.log(target) // { a: 1, b: 4, c: 5 }
console.log(returnedTarget) // { a: 1, b: 4, c: 5 }
```


#### <code>Object.setPrototypeOf</code>设置原型对象, <code>Object.getPrototypeOf(school)</code>获取原型对象

```js
const school = {
  name: 'wang'
}
const cities = {
  xiaoqu: ['beijing', 'shanghai']
}
Object.setPrototypeOf(school, cities)
school.__proto__ === cities // true

Object.getPrototypeOf(school) // { xiaoqu: ['beijing', 'shanghai'] }
```

## function

### 函数参数初始值

```js
// 1. 具有默认值的初始值一般放在最后
function add(a, b, c = 10) {
  return a + b + c
}

// 2. 与解构赋值结合
function connect({ host = "127.0.0.1", username, password, port }) {
  console.log(host)
  console.log(port)
}
connect({
  host: 'localhost',
  username: 'root',
  password: 'root',
  port: 3306
})
```

### call和apply

```js
function fun() {
  console.log(this)
}
fun.call() // Window
fun.apply() // Window

let obj = {
  name: 'hhh'
}
fun.call(obj) // obj
fun.apply(obj) // obj

let obj2 = {
  name: 'hhh2',
  sayMyName(){
    console.log(this.name)
  }
}
obj2.sayMyName.call(obj) // 'hhh'
obj2.sayMyName.apply(obj) // 'hhh'

let obj3 = {
  sayMyName(name, name2){
    console.log(name, name2)
  }
}

// call可以在传入对象后传参数
obj3.sayMyName.call(obj2, 'wang', 'zhao') // 'wang' 'zhao'
// apply需要将实参封装在数组中传递
obj3.sayMyName.apply(obj2, ['wang', 'zhao']) // 'wang' 'zhao'
```

### arguments
调用函数时，会传入两个隐含参数：

* this
* arguments
    * 类数组
    * 传入的实参都会在arguments中
    * 可以通过索引操作
    * 通过length获取长度
    * arguments.callee, 指向当前正在执行的函数

```js
function fun() {
  console.log(arguments)
}

fun(1,2,3) // { 0: 1, 1: 2, 2: 3}
```


### rest参数

可以代替arguments
```js
function date(...args) {
  console.log(args) //接收到的是数组
}
date('a', 'b', 'c')

//rest参数必须放在最后
function fn(a, b, ...args) {
  console.log(a)
  console.log(b)
  console.log(args)
}
fn(1,2,3,4,5,6)
```

### IIFE（立即执行函数表达式）

- 隐藏实现  
- 不会污染外部全局空间  

```js
(function() {
  var a = 1
  console.log(a)
})()
```

### 闭包

当一个嵌套的内部（子）函数引用了嵌套的外部（父）函数的变量（函数）时，就产生了闭包

产生条件：1. 函数嵌套，2.内部函数引用了外部函数的数据（变量/函数）

作用：1.函数内部的变量执行完后，仍然会在内存中（延长局部变量的生命周期）  
2. 函数外部操作函数内部的数据

闭包生命周期：1.产生，在嵌套函数内部函数定义执行完时就产生了（不是在调用）  
2. 死亡，嵌套的内部函数成为垃圾对象时

缺点：1.函数执行完后，局部变量没有释放，占用内存时间变长  
2. 容易造成内存泄露

```js
/* 1. */
function fn1() {
  //此时闭包就产生了（函数提升）
  let a = 1
  function fn2() {
    a++
    console.log(a)
  }
  return fn2
}
let f = fn1()
f() // 2
f() // 3
f = null //死亡

/* 2. */
function showDelay(msg, time) {
  setTimeout(function() {
    alert(msg)
  }, time)
}

showDelay('123', 2000)
```

自定义JS模块  
1.方式一
```js
/* myModule.js */
function myModule() {
  let msg = 'something'
  function doSomething() {
    console.log('hhh ' + msg.toUpperCase())
  }
  function doOtherthing() {
    console.log('hhh ' + msg.toLowerCase())
  }

  return { doSomething, doOtherthing }
}
```
```html
<!-- index.html -->
<script src="myModule.js"></script>
<script>
let fn = myModule()

fn.doSomething() // hhh SOMETHING
fn.doOtherthing() // hhh something
</script>
```
2.方式二
```js
/* myModule2.js */
(function (window) {
  let msg = 'something'
  function doSomething() {
    console.log('hhh ' + msg.toUpperCase())
  }
  function doOtherthing() {
    console.log('hhh ' + msg.toLowerCase())
  }

  window.myModule2 = { doSomething, doOtherthing }
})(window)
```
```html
<!-- index.html -->
<script src="myModule2.js"></script>
<script>
myModule2.doSomething() // hhh SOMETHING
myModule2.doOtherthing() // hhh something
</script>
```

### 内存溢出和泄露

内存溢出：

- 程序运行出现的错误
- 程序运行需要的内存超出了剩余的内存时，就抛出内存溢出的错误  

内存泄漏

- 占用的内存没有及时释放
- 内存泄露积累多了就容易导致内存溢出
- 常见的内存泄露
    * 意外的全局变量
    * 没有及时清理的计时器或回调函数
    * 闭包

### 箭头函数

```js
let fn = (a, b) => {
  return a + b
}

// 1. this是静态的，this始终指向函数声明时所在作用域下的this的值

function getName() {
  console.log(this.name)
}
let getName2 = () => {
  console.log(this.name)
}

window.name = 'test name'
const person = {
  name: 'TEST NAME'
}

getName() // 'test name'
getName2() // 'test name'

getName.call(person) // 'TEST NAME'
getName2.call(person) // 'test name'

// 2. 不能作为构造实例化对象
let Person = (name, age) => {
  this.name = name
  this.age = age
}
let person = new Person() // 报错

// 3. 不能使用arguments

// 4. 箭头函数的简写
let add = n => n * n // 有且只有一个形参省略小括号，代码体只有一条语句省略大括号，此时return必须省略
```


## 生成器
特殊的函数,用于异步编程

```js
// 函数代码的分隔符 yield
function *gen() {
  console.log(111)
  yield 'hello'
  console.log(222)
  yield 'world'
  console.log(333)
}
let iterator = gen()
iterator.next() // 111
iterator.next() // 222
iterator.next() // 333

//遍历
for (const v of gen()) {
  console.log('#' + v) // #hello  #world
}

//传参
function *gen(args) {
  console.log(args)
  let one = yield 'hello'
  console.log(one)
  let two = yield 'world'
  console.log(two)
}
let iterator = gen('AAA')
iterator.next() // AAA
// next方法也可以传参
iterator.next('BBB') // BBB
iterator.next('CCC') // CCC
```

### 实例1

```js
// 嵌套定时器
function one() {
  setTimeout(() => {
    console.log(111)
    iterator.next()
  }, 1000);
}
function two() {
  setTimeout(() => {
    console.log(222)
    iterator.next()
  }, 2000);
}
function three() {
  setTimeout(() => {
    console.log(333)
    iterator.next()
  }, 3000);
}

function *gen() {
  yield one()
  yield two()
  yield three()
}

let iterator = gen()
iterator.next()
```

### 实例2

```js
function getUsers() {
  setTimeout(() => {
    let data = '用户数据'
    iterator.next(data)
  }, 1000);
}

function getOrders() {
  setTimeout(() => {
    let data = '订单数据'
    iterator.next(data)
  }, 1000);
}

function getGoods() {
  setTimeout(() => {
    let data = '商品数据'
    iterator.next(data)
  }, 1000);
}

function *gen() {
  let users = yield getUsers()
  console.log(users)
  let orders = yield getOrders()
  console.log(orders)
  let goods = yield getGoods()
  console.log(goods)
}

let iterator = gen()
iterator.next()
```


## Set 集合

```js
let s = new Set()
console.log(typeof s) // object

let s2 = new Set([1, 2, 3, 2])
console.log(s2.size) // 3
s2.add(5)
s2.delete(1)
s2.has(3) // true
//清空
s2.cleaer()
//遍历
for (const v of s2) {
  console.log(v)
}

// 1.数组去重
let result = [...new Set(arr)]
// 2. arr和arr2的交集
let result2 = [...new Set(arr).filter(item => new Set(arr2).has(item))]
// 3. arr和arr2的并集
let result3 = [...new Set([...arr, ...arr2])]
// 4. arr-arr2(差集)
let result4 = [...new Set(arr).filter(item => !new Set(arr2).has(item))]
```


## Map

```js
let m = new Map()

m.set('name', 'wang')
m.set('change', function() {
  console.log('hello')
})

// size
m.size

// 删除
m.delete('name')

// 获取
m.get('name')

//清空
m.clear()

for (const v of m) {
  console.log(v)
}
```

## 加载JSON

```js
let requestURL = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"

let request = new XMLHttpRequest()

request.open('GET', requestURL)

request.responseType = 'json'

request.onload = function() {
  let superHeroes = request.response
  console.log(superHeroes)
}

request.send()
```

对象和文本之间的转换
```js
let requestURL = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"

let request = new XMLHttpRequest()

request.open('GET', requestURL)

request.responseType = 'text'

request.onload = function() {
  let superHeroesText = request.response
  console.log(superHeroesText)
  let superHeroes = JSON.parse(superHeroesText) // convert it to an object
  console.log(superHeroes)
}

request.send()

let myJSON = { "name" : "Chris", "age" : "38" }
console.log(myJSON)
var myString = JSON.stringify(myJSON) // convert it to an string
console.log(myString)
```

## 一个关于对象构建的实践

链接: [点击跳转](../example/object_example/index.html)

## 异步JavaScript

### 回调

callback: "I will call back later!"

```js
function doStep1(init, callback) {
  const result = init + 1
  callback(result)
}
function doStep2(init, callback) {
  const result = init + 2
  callback(result)
}
function doStep3(init, callback) {
  const result = init + 3
  callback(result)
}
function doOperation() {
  doStep1(0, result1 => {
    doStep2(result1, result2 => {
      doStep3(result2, result3 => {
        console.log(result3)
      })
    })
  })
}
doOperation() // 6
```

### Promise

#### 使用 Promise

```js
const p = new Promise(function(resolve, reject) {
  setTimeout(() => {
    let data = 'some data'
    resolve(data) // 使用resolve后，这个Promise对象的状态为成功，调用then的第一个方法
    let err = 'error'
    reject(err) // 使用reject后，这个Promise对象的状态为失败，调用then的第二个方法
  }, 1000);
})

p.then(function(value) {
  console.log(value)
}, function(reason) {
  console.log(reason)
})
```
```js
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json')
fetchPromise
  .then(response => {
    if(!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    return response.json()
  }) // then() 本身也会返回一个 Promise
  .then(json => {
    console.log(json[0].name)
  })
  .catch(error => {
    console.error(`无法获取产品列表：${error}`)
  }) // 将 catch() 添加到 Promise 链的末尾，它就可以在任何异步函数失败时被调用
```
[XMLHttpRequest和Fetch的区别](https://www.cnblogs.com/hanksyao/p/12089105.html)

Promise 有三种状态:  

* 待定（pending）  
* 已兑现（fulfilled）:<code>then()</code>将会被调用  
* 已拒绝（rejected）:<code>catch()</code>将会被调用

#### 封装ajax

```js
const p = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://api.apiopen.top/api/sentences')
  xhr.send()
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject(xhr.status)
      }
    }
  }
}).then(function(value) {
  console.log(value)
}, function(error) {
  console.error(error)
})
```

#### 合并使用多个 Promise

```js
const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json')
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found')
const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json')

Promise.allSettled([fetchPromise1, fetchPromise2, fetchPromise3])
  .then(responses => {
    for(const response of responses){
      console.log(`${response.value}：${response.status}`)
    }
  })
  .catch(error => {
    console.error(`获取失败：${error}`)
  })

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then(responses => {
    for(const response of responses){
      console.log(`${response.url}：${response.status}`)
    }
  })
  .catch(error => {
    console.error(`获取失败：${error}`)
  })

// Promise.any(): 在 Promise 数组中的任何一个被兑现时它就会被兑现
Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
  .then( response => {
    console.log(`${response.url}：${response.status}`)
  })
  .catch( error => {
    console.error(`获取失败：${error}`)
  })
```

### async 和 await

```js
async function fn() {
  // 只要返回的结果不是一个Promise类型的对象，那么返回的都是一个成功的Promise
  //return

  // 此时返回的结果是一个失败的Promise
  //throw new Error('出错了')

  // 返回Promise对象
  return new Promise((resolve, reject) => {
    // fn函数返回成功的Promise，且值为'成功'
    resolve('成功')
    // 相反
    reject('失败')
  })
}
const result = fn()
result.then(value => {
  console.log(value)
}, reason => {
  console.log(reason)
})

async function fetchProducts() {
  try {
    const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json')
    if(!response.ok) {
      throw new Error(`HTTP 请求错误：${response.status}`)
    }
    const json = await response.json()
    console.log(json[0].name)
  }
  catch(error){
    console.error(`无法获取产品列表：${error}`)
  }
}
fetchProducts()
```

## 如何实现基于 Promise 的 API

### Promise() 构造器
<code>Promise()</code> 构造器使用单个函数作为参数, 这个函数称作执行器（executor）, 执行器本身采用两个参数，这两个参数都是函数，通常被称作 <code>resolve</code> 和 <cpde>reject</cpde>。如果异步函数成功了，就调用 <code>resolve</code>，如果失败了，就调用 <cpde>reject</cpde>。

```js
function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if(delay < 0) {
      throw new Error('Alarm delay must not be negative')
    }
    window.setTimeout(() => {
      resolve(`Wake up, ${person}!`)
    }, delay);
  })
}
alarm('name1', 2000)
  .then(message => console.log(message))
  .catch(error => console.error(error))
```

### 使用 async 和 await

```js
async function testFunction(person, delay) {
  try {
    const message = await alarm(person, delay)
    console.log(message)
  }
  catch(error) {
    console.error(error)
  }
}
```

## workers

三种不同类型的 workers：  

* dedicated workers  
* shared workers: 可以由运行在不同窗口中的多个不同脚本共享。
* service workers: 行为像代理服务器，缓存资源以便于 web 应用程序可以在用户离线时工作。

第一例worker(dedicated workers):  
[用 worker 进行质数生成](../example/worker_example/index.html)

使用<code>addEventListener('message', (message) => {})</code>接受信息
使用<code>postMessage()</code>发送信息

```js
/* 主线程 */
// 创建Worker实例对象
let worker = new Worker('path/to/doSomething.js')
//绑定接收消息的监听
worker.onmessage = function(event) {
  console.log(event.data)
}
//向分线程发送消息
worker.postMessage(number)
```
```js
/* 分线程, path/to/doSomething.js */
function myFunction() {
  // ...
}
let onmessage = function(event) {
  let number = event.data
  let result = myFunction(number)
  postMessage(result)
}
```

## 序列动画

[例子](../example/sequencing-animations/index.html)

## 操作文档（DOM）

* <code>document.querySelector()</code>是推荐的选择一个元素的主流方法  
* <code>document.querySelectorAll()</code>对多个元素进行匹配和操作  
* <code>document.createElement()</code>创建一个新的段落
* <code>Node.appendChild()</code>在后面追加新的段落  
* <code>parentNode.insertBefore(newNode, oldNode)</code> 指定的子节点前插入新的子节点
* <code>parentNode.replaceChild(newNode, oldNode)</code> 指定的子节点替换已有的子节点
* <code>document.createTextNode()</code>创建一个文本节点
* <code>Node1.removeChild(Node)</code>，在拥有要删除的节点(Node)和其父节点(Node1)的引用时，或者使用<code>Node.parentNode.removeChild(Node)</code>
* <code>Node.style.color = 'white'</code>，修改样式
* <code>Node.setAttribute('class', 'class1')</code>，修改属性
* <code>document.getElementsByTagName()</code>, 返回类数组
* <code>Node.previousSibling</code>、<code>Node.nextSibling</code>, 前一个和后一个兄弟节点
* <code>document.documentElement</code> html根标签
* <code>document.all</code> 所有元素

例子: 不管窗口的大小是多少，确保应用程序和它所在的窗口视图一样大
```js
let div = document.querySelector('div')
const width = window.innerWidth
const height = window.innerHeight

div.style.width = width + 'px'
div.style.height = height + 'px'

window.onresize = funciton() {
  const width = window.innerWidth
  const height = window.innerHeight
  div.style.width = width + 'px'
  div.style.height = height + 'px'
}
```

<code>元素.style.样式</code>, 读取内联样式  
<code>getComputedStyle(元素, 伪元素)</code>, window上的方法,读取正在显示的样式，例: <code>getComputedStyle(document.querySelector('p'), null).width</code>

<code>Node.clientHeight</code>, <code>Node.clientWidth</code>, <strong>可见</strong>宽度和<strong>可见</strong>高度（content+padding），在有滚动条的时候，要去掉滚动条的区域;只读，不可修改  
<code>Node.offsetHeight</code>, <code>Node.offsetWidth</code>, content + padding + border  
<code>Node.scrollHeight</code>, <code>Node.scrollWidth</code>, 滚动区域的宽度和高度  
<code>Node.offsetLeft</code>, <code>Node.offsetTop</code>, 获取相对其定位父元素的水平和垂直偏移量  
<code>Node.scrollLeft</code>, <code>Node.scrollTop</code>, 获取滚动条的滚动距离
<code>Node.addEventListener('click', funciton(){}, false)</code>, 第三个参数表示是否在捕获阶段触发事件  
<code>Node.className</code>, 获取class  
<code>Node.classList.add('className')</code>, 添加class  
<code>Node.classList.remove('className')</code>, 移除class  
<code>Node.classList.replace('oldClassName', 'newClassName')</code>, 替换class  

!!!note
    Node.scrollHeight - Node.scrollTop === Node.clientHeight, 表明滚动条到达底部

事件属性：  
<code>event.cancelBubble = true</code> <code>event.stopPropagation()</code>, 取消事件冒泡

!!!note
    事件委派: 将事件绑定给所有元素共同的祖先元素，通过事件冒泡来给所有子元素绑定事件，通过event.target来让指定的子元素触发事件

dom加载完毕后执行的事件
```js
document.addEventListener('DOMContentLoaded', function() {
  console.log(123)
})
```

## BOM

### Window

BOM对象可以通过Window获取， window.navigator

### Navigator

浏览器信息，可以用来识别不同浏览器, 主要使用 <code>navigator.userAgent</code>

```js
/* 以下在edge中测试 */
navigator.appName // 'Netscape'

navigator.userAgent // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36 Edg/103.0.1264.49'
```

### Location

地址栏信息

```js

location = "http://www.baidu.com"
//或
location.assign("http://www.baidu.com")

location.reload(true) //重新加载页面, true表示强制清空缓存

location.replace(url) // 以给定的 URL 来替换当前的资源, 与assign()方法不同的是，调用replace()方法后，当前页面不会保存到会话历史中
```

### History

操作浏览器历史记录前进后退

- <code>history.length</code>
- <code>history.back()</code>, 回退到上一个页面
- <code>history.forward()</code>, 前进
- <code>history.go()</code>, 跳转到指定页面, 接收整数为参数，1表示前进一个页面，-1表示向后一个页面

### Screen

用户屏幕信息



## 客户端存储

### 传统方法：cookies

### 存储简单数据 — web storage

所有的 web storage 数据都包含在浏览器内两个类似于对象的结构中：<code>sessionStorage</code>和<code>localStorage</code>。第一种方法，只要浏览器开着，数据就会一直保存 (关闭浏览器时数据会丢失) ，而第二种会一直保存数据，甚至到浏览器关闭又开启后也是这样。

```js
//每个域名分离存储
localStorage.setItem('name', 'xiaoming') //允许在存储中保存一个数据项
localStorage.getItem('name') //获取存储值
localStorage.removeItem('name') //删除
localStorage.clear() //删除所有数据
localStorage.key(index) //得到某个索引的key
```

例子: [personal-greeting.html](../example/web_storage/index.html)

### 存储复杂数据 — IndexedDB

[笔记存储示例](../example/IndexedDB/index.html)

## 表单

### 表单验证

* required 属性  
* 使用正则表达式验证
```html
<form>
  <label for="choose">Would you prefer a banana or a cherry?</label>
  <input id="choose" name="i_like" required pattern="banana|cherry">
  <button>Submit</button>
</form>
```
* 限制输入的长度
```html
<input id="choose" name="i_like" required minlength="6" maxlength="6">
<input type="number" id="number" name="amount" value="1" min="1" max="10">
```

使用<code>:invalid</code>伪类添加验证失败后的css样式

## AJAX

### HTTP

#### 请求报文

```
请求行   GET、POST请求类型 / url / HTTP/1.1版本
请求头   Host:
        Cookie: 
        Conten-type:
        User-Agent: 
        ***
空行
请求体  get请求是空的，post请求可以有内容
```

#### 响应报文

```
行  HTTP/1.1  200   OK
头  Conten-type:
    Conten-length:
    ***
空行
体  <html>
      ***
    </html>
```

### XMLHttpRequest

xhr的readystate的状态:  

- 0 未初始化
- 1 载入
- 2 载入完成
- 3 交互, 解析接收到的服务器端响应数据
- 4 完成

```html
<button id="button1">get</button>
<button id="button3">取消get</button>
<output id="output1"></output>

<button id="button2">post</button>
<output id="output2"></output>
<script>
  /* GET请求 */
  const button = document.querySelector('#button1')
  const result = document.querySelector('#output1')

  const button3 = document.querySelector('#button3')

  let xhr = null
  let isSending = false // 标识是否正在发送请求

  button.addEventListener('click', function() {
    if (isSending) { //如果正在发送，取消请求，发送一个新的
      xhr.abort()
    }
    xhr = new XMLHttpRequest()
    //修改表示变量的值
    isSending = true

    //超时设置,超过2s就取消
    xhr.timeout = 2000
    //超时回调
    xhr.ontimeout = function() {
      console.log('超时')
    }
    //网络异常
    xhr.onerror = function() {
      console.log('网络异常')
    }

    xhr.open('get', 'http://localhost:8888/server?t=' + Date.now()) // 加上时间戳解决缓存问题
    xhr.send()
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        //修改表示变量的值
        isSending = false

        if (xhr.status >= 200 && xhr.status < 300) {
          // 1. 响应行
          console.log(xhr.status) // 状态码
          console.log(xhr.statusText) // 状态字符串
          console.log(xhr.getAllResponseHeaders()) // 所有响应头
          console.log(xhr.response) //响应体
          result.innerText = xhr.response
        } else {

        }
      }
    }
  })

  //取消请求
  button3.addEventListener('click', function() {
    xhr.abort()
  })

  /* POST请求 */
  const button2 = document.querySelector('#button2')
  const result2 = document.querySelector('#output2')

  button2.addEventListener('click', function() {
    const xhr = new XMLHttpRequest()
    //设置响应体的类型为json，实现接受的数据自动转换
    xhr.responseType = 'json'

    xhr.open('POST', 'http://localhost:8888/json-server')
    //设置请求头
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('head', 'aaa') // 自定义请求头需要同时在服务器配置,如node.js中的express框架设置app.all()，同时添加response.setHeader('Access-Control-Allow-Headers', '*')

    xhr.send('a=100&b=200&c=300')

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          let data = xhr.response
          console.log(data)
          result2.innerText = data.name
        }
      }
    }
  })
</script>
```

### jQuery

```js
$.get(url, { a: 100, b: 200 }, funciton(data) {
  console.log(data)
}, 'json')

$.post(url, { a: 100, b: 200 }, funciton(data) {
  console.log(data)
})

$.ajax({
  url: '',
  data: { a: 100, b: 200 },
  type: 'GET',
  dataType: 'json',
  success: function(data) {
    console.log(data)
  },
  //超时时间
  timeout: 2000,
  error: function() {

  },
  // 头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
```

### axios

```js
// 配置baseURL
axios.default.baseURL = "http://localhost:8888"
axios.get('/server', {
  params: {
    id: 100
  },
  // 请求头
  headers: {
    name: 'hhh'
  }
}).then(value => {
  console.log(value)
})

//第一个参数为url，第二个参数为请求体，第三个为其他选项
axios.post('/server', {
    username: 'admin',
    password: 'admin'
  },{
    params: {
      id: 100
    },
    // 请求头
    headers: {
      name: 'hhh'
    }
}).then(value => {
  console.log(value)
})

axios({
  method: 'POST',
  // url
  url: '/server',
  // url 参数
  params: {
    id: 100
  },
  // 请求头
  headers: {
    name: 'hhh'
  },
  // 请求体
  data{
    username: 'admin',
    password: 'admin'
  }
}).then(response => {
  console.log(response.data)
  console.log(response.status)
})
```

### Fetch

```js
fetch(url, {
  method: 'POST',
  //请求头
  headers: {
    a: '123'
  },
  //请求体
  body: {

  }
}).then(response => {
  return response.text()
  // return response.json()
}).then((text) => {
  console.log(text)
})
```

### 跨域

同源： 协议、域名、端口号必须相同  
违背同源就是跨域

#### jsonp

解决跨域的非官方方案，只支持get请求

后端请求返回的必须是个js代码，如后端返回<code>"console.log('hello')"</code>
```js
function handle(data) {
  console.log(data)
}

input.onblur = function() { // 向服务器发送请求
  let username = this.value
  const script = document.createElement('script')
  script.src = 'http://localhost:8888/server'
  document.body.appendChild(script)
}

// 服务器返回 handle('something'),则会执行handle函数
```

jQuery 发送jsonp

```js
$.getJSON(url + '?callback=?', function(data) {
  console.log(data)
})

//node.js服务端接受callback参数
let cb = request.query.callback

response.send(`${cb}(${str})`)
```

#### CORS

官方解决方案，在服务器中进行处理

服务器添加响应头：

<code>'Access-Control-Allow-Origin': '*'</code>  
<code>'Access-Control-Allow-Headers': '*'</code>,允许自定义请求头  
<code>'Access-Control-Allow-Method': '*'</code>,请求方法  



## 模块化

- 防止命名冲突  
- 代码复用
- 高维护性

ES6之前的模块化规范：
- CommonJS => NodeJS、Browserify
- AMD => requireJS
- CMD => seaJS

### ES6模块化语法

```js
/* m1.js */
// 分别暴露
export let myA = '123'

export function say() {
  console.log('hello!')
}
```
```js
/* m2.js */
// 统一暴露
let myA = '123'

function say() {
  console.log('hello!')
}

export { myA, say }
```
```js
/* m3.js */
// 默认暴露
export default {
  myA: '123',
  say: function() {
    console.log('hello!')
  }
}
```
```html
<!-- 第一种方式 -->
<script type="module">
  // 1.通用的导入方式
  /* 引入m1.js */
  import * as m1 from 'm1.js'
  console.log(m1)
  /* 引入m2.js */
  import * as m2 from 'm2.js'
  console.log(m2)
  /* 引入m3.js */
  import * as m3 from 'm3.js'
  m3.default.say()

  // 2. 解构赋值
  /* 引入m1.js */
  import { myA, say } from 'm1.js'
  /* 引入m2.js */
  import { myA as m2MyA, say as m2Say } from 'm2.js'
  /* 引入m3.js */
  import { default as m3 } from 'm3.js'

  // 3.简便形式，针对默认暴露
  import m3 from 'm3.js'
</script>
<!-- 第二种方式 -->
<!-- 将import语句放在一个文件(app.js)中 -->
<script src="app.js" type="module"></script>
```

### babel对ES6模块化代码转换

```html
<!--
    1. 安装工具 babel-cli babel-preset-env browserify(webpack)
    2. npx babel dir/of/js -d dist/js --presets=babel-preset-env
    3. 打包 npx browserify dist/js/app.js -o dist/bundle.js
-->
```


## ES7-ES11

### ES7

```js
// includes
const myArr = [1, 2, 3]
console.log(myArr.includes(1)) // true

// **
console.log(2 ** 10) // Math.pow(2, 10)
```

### ES8

#### async和await
[async和await](#async-await)

#### 对象方法扩展

```js
const myObj = {
  name: 'wang',
  age: 18
}

// 获取对象所有键
Object.keys(myObj)
// 对象所有值
Object.values(myObj)
// entries
Object.entries(myObj) // [['name', 'wang'], ['age', 18]]
// 创建map
const m = new Map(Object.entries(myObj))
m.get('name')
// 对象属性的描述对象
Object.getOwnPropertyDescriptors(myObj)

// 第一个参数为原型对象
const myObj2 = Object.create(null, {
  name: {
    value: 'wang',
    // 是否可以删除
    configurable: true,
    // 是否可以修改
    writable: true,
    // 是否可枚举
    enumerable: true
  }
})
```

### ES9

#### 对象扩展
```js
// rest参数
function connect({ host, port, ...user }) {
  console.log(host)
  console.log(port)
  console.log(user)
}

connect({
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  type: 'master'
})

// ...扩展运算符
const myA = {
  q: '123',
  w: '456'
}

const myB = {
  e: '789'
}

const all = { ...myA, ...myB } // 合并
```

#### 正则扩展

命名捕获分组  
```js
let str = '<a href="http://localhost">hello</a>'

//提取url与标签文本
const reg = /<a href="(.*)">(.*)<\/a>/
const result = reg.exec(str)
console.log(result) // ['<a href="http://localhost">hello</a>', 'http://localhost', 'hello']


const reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/
const result = reg.exec(str)
console.log(result) // result.groups.text == 'hello' result.groups.url == "http://localhost"
```

##### 反向断言

```js
// 正向断言
let str = 'jadsaid13451dasdad545啦啦啦'

// 提取后面的数字
const reg = /\d+(?=啦)/

const result = reg.exec(str)
console.log(result) // result[0] == '545'

// 反向断言

const reg = /(?<=dad)\d+/
const result = reg.exec(str)
console.log(result) // result[0] == '545'
```

##### dotAll模式

```js
// 正则中的 . 表示除换行符以外的任意单个字符

let str = `
<ul>
  <li>
    <a>wang</a>
    <p>20</p>
  </li>
  <li>
    <a>zhang</a>
    <p>22</p>
  </li>
</ul>`

const reg = /<li>\s+<a>(.*?)<\/a>\s+<p>(.*?)<\/p>/
const result = reg.exec(str)
console.log(result)

const reg2 = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs // s 表示dotAll模式
let result
let data = []
while(result = reg2.exec(str)) {
  data.push({
    name: result[1],
    age: result[2]
  })
}
```



### ES10

#### 对象的扩展方法 Object.fromEntries

类似于Object.entries, 逆运算
```js
// 二维数组
const result = Object.fromEntries([
  ['name', 'wang'],
  ['age', 18]
])
console.log(result) // {name: 'wang', age: 18}

// Map
const m = new Map()
m.set('name', 'wang')
const result = Object.fromEntries(m)
console.log(result) // {name: 'wang'}
```

#### 字符串扩展

<code>str.trimStart()</code>  
<code>str.trimEnd()</code>  

#### 数组扩展

```js
/* flat, 将多维数组转为低维数组 */

// 2维转1维
const arr = [1, 2, 3, 4, [5, 6]]
console.log(arr.flat()) // [1, 2, 3, 4, 5, 6]
// 3维转2维
const arr2 = [1, 2, 3, 4, [5, 6, [7, 8, 9]]]
console.log(arr2.flat()) // [1, 2, 3, 4, 5, 6, [7, 8, 9]]
// 3维转1维,传入参数，该参数表示深度
const arr3 = [1, 2, 3, 4, [5, 6, [7, 8, 9]]]
console.log(arr2.flat(2)) // [1, 2, 3, 4, 5, 6, 7, 8, 9]

/* flatMap */
const arr = [1, 2, 3, 4]
const result = arr.map(item => [item * 10])
console.log(result) // [[10], [20], [30], [40]]

const result2 = arr.flatMap(item => [item * 10])
console.log(result2) // [10, 20, 30, 40]
```

### ES11

[私有属性](#_18)

[Promise.allSettled](#promise_2)

<code>String.prototype.matchAll</code>方法

```js
let str = `
<ul>
  <li>
    <a>wang</a>
    <p>20</p>
  </li>
  <li>
    <a>zhang</a>
    <p>22</p>
  </li>
</ul>`

const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs
const result = str.matchAll(reg)
// for...of 提取结果
for (const v of result) {
  console.log(v)
}
// ...扩展运算符
const arr = [...result]
```

可选链操作符

```js
function main(config) {
  /* 判断是否传入参数 */
  //const dbHost = config && config.db && config.db.host
  const dbHost = config?.db?.host
  console.log(dbHost)
}
main({
  db: {
    host: '132.168.1.100',
    username: 'root'
  },
  cache: {
    host: '132.168.1.200',
    username: 'admin'
  }
})
```

动态import

按需加载

```js
/* hello.js */
export function hello() {
  alert('hello')
}
/* app.js */
const btn = document.querySelector('button')
btn.addEventListener('click', function() {
  import('./hello.js').then(module => {
    module.hello()
  })
})
```

<code>globalThis</code>

始终指向全局对象

```js
console.log(globalThis) // Window
```