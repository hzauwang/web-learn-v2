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

#### 合并使用多个 Promise

```js
const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json')
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found')
const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json')
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

## 序列动画

[例子](../example/sequencing-animations/index.html)

## 操作文档

* <code>document.querySelector()</code>是推荐的选择一个元素的主流方法  
* <code>document.querySelectorAll()</code>对多个元素进行匹配和操作  
* <code>document.createElement()</code>创建一个新的段落
* <code>Node.appendChild()</code>在后面追加新的段落  
* <code>document.createTextNode()</code>创建一个文本节点  
* <code>Node1.removeChild(Node)</code>，在拥有要删除的节点(Node)和其父节点(Node1)的引用时，或者使用<code>Node.parentNode.removeChild(Node)</code>
* <code>Node.style.color = 'white'</code>，修改样式
* <code>Node.setAttribute('class', 'class1')</code>，修改属性

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

## Ajax

### XMLHttpRequest

```js
let request = new XMLHttpRequest()
request.open('GET', url)
request.responseType = 'text'
request.onload = function() {
  console.log(request.response)
}
request.send()
```

### Fetch
Fetch API 基本上是 XHR 的一个现代替代品

```js
fetch(url).then((response) => {
  return response.text()
}).then((text) => {
  console.log(text)
})
```

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