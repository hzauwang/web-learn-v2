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

## JavaScript对象

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

### 类

构造函数  
```JavaScript
class Person{
	name

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

继承  
```JavaScript
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

封装  
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