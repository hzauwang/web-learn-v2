# Vue 2.x

Vue：一个渐进式的 JavaScript 框架，它的核心库只关注视图层。


### 1、安装

安装方法有三个：

- 通过 cdn 引入
- 直接下载后，在 `<script>` 标签中引入
- NPM 安装



#### 1.1 cdn 引入

直接在 `<script>` 标签中引入 cdn 即可使用

```js
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```



#### 1.2 直接下载

在官网安装界面点击开发版本，即可下载 vue.js ，之后在项目中通过 `<script>` 标签引入

```html
<!-- src="../vue.js" 表示的是：我将下载的 vue.js 保存在了当前文件上级目录的同级目录(resources)下 -->
<script src="../resources/vue.js"></script>
```



#### 1.3 NPM 安装

[https://www.runoob.com/vue2/vue-install.html](https://www.runoob.com/vue2/vue-install.html)

---



### 2、初步使用（官网例子）

这里通过几个简单的小例子了解一下 Vue

这里采用的是第二种安装方法 (直接下载) 引入

案列全部以下面这种形式展现在 HTML 页面中，之后的例子全都是 body 标签中内代码

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        
        <!-- 页面渲染 -->
        
        <!-- 引入 vue.js -->
        <script src="../resources/vue.js"></script>
        
        <!-- 使用 vue.js -->
        
    </body>
</html>
```



#### 2.1 声明式渲染

这是最简单的一个例子，将数据显示在页面上

Vue 会将数据和 DOM 建立关联，将数据声明式的渲染进 DOM 的系统，并且它里面所有东西都是响应式的

```html
<!-- 将数据绑定到 DOM 文本（H1） -->
<div id = "app">
    <h1>{{message}}</h1>
</div>

<!-- 引入 vue 的路径 -->
<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message: 'Hello,Vue.'
        }
    })
    
    // 在 console 中对 message 进行修改：app.message = '你好';
    // 此时页面中的数据会同时发生变化，这就是响应式
</script>
```



#### 2.2 几个小例子

通过 v-if 来判断在页面上是否显示某一行内容

```html
<div id = "app">
    <h1>这是第一行数据</h1>
    <p v-if = "see">修改 see 可以隐藏本行内容</p>
    <h1>这是第三行数据</h1>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            see: true
        }
    })
    
    // 在 console 中编写 app.see = false ，则页面上只会显示两行数据
</script>
```



通过 v-for 在页面上渲染一个列表类型的数据

运行后，在浏览器端可以看到一个列表

```html
<div id = "app">
    <ul>
        <li v-for="item in list">{{item}}</li>
    </ul>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            list: ["Html","JavaScript","css"]
        }
    })
    
    // 在 console 中输入：app.list.push('Vue'); 页面上的列表会同步更新
    // push(),在数组最后面添加一个元素
</script>
```



通过 v-on 添加一个事件监听器，通过它调用 Vue 实例中定义的方法

反转页面显示的字符串

```html
<div id = "app">
    <p>{{message}}</p>
    <button v-on:click="reverseMessage">反转消息</button>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message: 'Hello,Vue'
        },
        methods: {
            reverseMessage: function(){
                // split():把一个字符串分割为一个字符数组
                // reverse():颠倒数组中的元素顺序,
                // join():把数组中的所有元素放入一个字符串
                this.message = this.message.split('').reverse().join('')
            }
        }
    })
</script>
```



通过 v-bind 实现单向绑定  
通过 v-model 实现<b>表单输入</b>和应用状态之间的双向绑定

即表单中内容发生变化时，p 标签显示的文本内容同时发生变化

```html
<div id = "app">
    <p>{{message}}</p>
    <input type="text" v-model="message" />
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message: 'Hello,Vue'
        }
    })
</script>
```



#### 2.3 数据和方法

当一个 Vue 实例被创建时，它会将数据对象中的所有的属性加入到 Vue 的响应式系统中

当这些属性的值发生改变时，视图将会产生 "响应"，即匹配更新为新的值

这里的注意点：当 vue 的实例被创建时，hello 中已经存在的属性才会加入到响应式系统中

​			如果之后可能需要添加某个属性，应该在最开始定义的时候添加并赋一个初始值 (初始值可以为空)

```html
<script src="../resources/vue.js"></script>
<script>
    // 定义一个数据对象
    var hello = {
        id: 1,
        text: "hello",
        remark: ''
    }

    // 将该对象添加到 vue 实例中
    // 此时会将 hello 对象的所有属性添加到响应式系统中
    var app = new Vue({
        el: "#app",
        data: hello
    })

    // 获得 hello 对象的 id
    app.id == hello.id;

    // 修改 id 的值， hello 对象中的 id 会随之变化
    app.id = 2;
    console.log("hello.id = ",hello.id);

    // 反过来也一样
    hello.id = 3;
    console.log("app.id = ",app.id);
</script>
```



**Object.freeze(xxx)**：阻止修改现有的数据对象，这个意思是 Vue 的实例和这个对象本身都不能修改了

具体表现在，通过 Vue 实例修改会报错，通过对象本身修改会无效

```html
<script src="../resources/vue.js"></script>
<script>
    var hello = {
        id: 1,
        text: "hello"
    }

    // 阻止 vue 的实例对 hello 的属性进行修改
    // hello 本身还是可以修改的，但是修改无效，23333~
    Object.freeze(hello);
    
    var app = new Vue({
        el: "#app",
        data: hello
    })

    app.id == hello.id;

    // 这里就会报错，因为不能对 hello 的属性修改了
    // app.id = 2;
    // console.log("hello.id = ",hello.id);

    // 这里两个结果都是 1，已经无法修改
    hello.id = 3;
    console.log("app.id = ",app.id);
    console.log("hello.id = ",hello.id);
</script>
```



### 3、生命周期

每个 Vue 实例在被创建的时候都要经历一系列初始化的过程

如需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等



#### 3.1 MVVM 模式

Model -- View -- Controller

Model 层：模型层，存储数据

View 层：视图层，用户能看到的并进行交互的界面，对应的就是网页页面显示的内容

Controller 层：控制器，收集视图层用户输入的数据，将数据处理后发送到模型层，最后返回新的视图



Model -- View -- ViewModel

Model 层：模型层，主要是处理服务器从网络上请求的数据，对应的就是 data

View 层：视图层，前端展示的页面，对应的就是上面的页面

ViewModel 层：视图模型层，视图层和模型层交流的桥梁，一方面实现了数据绑定，数据的变化将实时反馈到视图层

另一方面实现了 DOM 监听，当 DOM 中发生一些事件的时候，可以监听并改变对应的数据，对应的就是 new Vue({...})



区别：MVVM 实现了 View 和 Model 的自动同步，当 Model 改变时，对应 View 会自动改变，不用操作 DOM 元素

MVC 是单向通信的，View 和 Model 需要通过 Controller 通信



#### 3.2 生命周期钩子函数

然后，Vue 在这些过程中提供了一些叫做 **生命周期钩子** 的函数，可以在不同阶段根据自己需求添加代码完成相关功能

```html
<div id="app">
    <h2>{{message}}</h2>
</div>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el: '#app',
        data: {
            message: 'Hello'
        },
        // 数据还没有绑定到 Vue 对象，data，methods 中的数据还没有初始化，同时页面还没有挂载对象
        beforeCreate() {
            console.log("创建实例之前") 
            console.log(this.message) // undefined
            console.log(this.$el) // undefined
            console.log("DOM结构：",document.getElementById('app').innerHTML) //<h2>{{message}}</h2>
        },
        // data，methods 中的数据已经初始化好了，但是页面还没有挂载对象
        // 这个时候可以执行一些异步操作，因为 data 中已经有数据了
        created() {
            console.log("创建实例之后")
            console.log(this.message) // Hello
            console.log(this.$el) // undefined
            console.log("DOM结构：",document.getElementById('app').innerHTML) //<h2>{{message}}</h2>
        },
        // 此时页面挂载对象，但是还没有渲染页面
        beforeMount() {
            console.log("实例挂载前")
            console.log(this.message) // Hello
            console.log(this.$el) // <div id="app">  <h2>{{message}}</h2>   </div>
            console.log("DOM结构：",document.getElementById('app').innerHTML) //<h2>{{message}}</h2>
        },
        // 页面已经渲染完成了
        mounted() {
            console.log("实例挂载后")
            console.log(this.message) // Hello
            console.log(this.$el) // <div id="app">  <h2>Hello</h2>   </div>
            console.log("DOM结构：",document.getElementById('app').innerHTML) //<h2>Hello</h2>
        },
        // 在页面打开命令行，输入：app.message="World";
        // 页面还没有更新，但是 data，methods 中的数据已经更新，还没有渲染到页面
        beforeUpdate() {
            console.log("数据更新前")
            console.log(this.message) // World
            console.log(this.$el) // <div id="app">  <h2>World</h2>   </div>
            console.log("DOM结构：",document.getElementById('app').innerHTML) //<h2>Hello</h2>
        },
        // 页面和 vue 对象中的数据保持同步，此时更新渲染已经完成
        updated() {
            console.log("数据更新后")
            console.log(this.message) // World
            console.log(this.$el) // <div id="app">  <h2>World</h2>   </div>
            console.log("DOM结构：",document.getElementById('app').innerHTML) //<h2>World</h2>
        }
    })
</script>
```



### 4、一些指令

#### 4.1 v-once

该指令修饰的标签或者组件只会渲染一次，之后修改不再生效

```html
<div id="app">
    <h2>{{message}}</h2>
    <!-- 在页面对 message 进行修改时，第二个 <h2> 标签的内容不会发生变化 -->
    <h2 v-once>{{message}}</h2>
</div>

<script src="../resources/vue.js"></script>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            message:'hello'
        }
    })
</script>
```



#### 4.2 v-html

针对获得数据是一段 HTML 代码的情况，可以通过 v-html 完成解析

```html
<div id="app">
    <h2>{{link}}</h2>
    <!-- 这里可以对 link 中的 html 代码进行解析 -->
    <h2 v-html="link"></h2>
</div>

<script src="../resources/vue.js"></script>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            link:"<a href='http://www.baidu.com'>百度</a>"
        }
    })
</script>
```



#### 4.3 v-text

将数据显示在页面上，跟 {{}} 的作用差不多，但是 v-text 指定的内容会覆盖掉标签里面定义的内容，{{}} 则不会

```html
<div id="app">
    <!-- 这一行会显示 hello,你好 -->
    <h2>{{message}},你好</h2>
    <!-- 下面这一行在页面上只会显示 message 的内容 -->
    <h2 v-text="message">,你好</h2>
</div>

<script src="../resources/vue.js"></script>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            message: 'hello'
        }
    })
</script>
```



#### 4.4 v-pre

指定的元素和它的子元素会跳过 vue 的渲染，直接显示标签定义的内容

```html
<div id="app">
    <h2>{{message}}</h2>
    <!-- 这个 div 下的元素都不会经过 vue 的渲染，会直接显示 {{message}} -->
    <div v-pre>
        <h2>{{message}}</h2>
        <h2>{{message}}</h2>
    </div>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message:'hhh'
        }
    })
</script>
```



#### 4.5 v-cloak

有时候在网络不太好的情况下，页面加载完了，但是 vue 还没有渲染，导致页面会显示 {{message}} 的情况

vue 解析渲染之后会忽略掉 v-cloak 这个指令，所以可以对 v-cloak 的样式进行设计，使界面不会出现 {{message}}

```html
<div id="app" v-cloak>
    <h1>{{message}}</h1>
</div>

<script src="../resources/vue.js"></script>
<script>
    // 这个延时模拟网络卡顿
    setTimeout(function(){
        let app = new Vue({
            el: '#app',
            data: {
                message:'hhh'
            }
        })
        },1000)
</script>
<!-- 这个样式的意思是：是否显示这个 div -->
<style>
    [v-cloak]{
        display: none;
    }
</style>
```



#### 4.6 v-bind（重要）

##### 绑定标签元素内部的属性

它与 {{}} 的区别在于，v-bind 是用来绑定元素内部属性的，另一方面 {{}} 也无法绑定标签元素内部的属性

```html
<div id="app">
    <!-- 
		 {{message}} 绑定了标签外的值，将 <p> 标签中间的值绑定为 data 中的 message 的值
		 v-bind 则是绑定了元素内部的标签，将 align 的值绑定为 data 中的 address 的值
		 两者都可以通过 vue 实例进行动态替换
	-->
    <p v-bind:align="address">{{message}}</p>
</div>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el: '#app',
        data: {
            message: 'Hello',
            address: 'center'
        }
    })
</script>
```

##### **v-bind** 的简写模式

```html
<!-- 完整写法 -->
<h2 v-bind:align="address"></h2>

<!-- 简写 -->
<h2 :align="address"></h2>
```



##### v-bind 动态绑定 class 有两种实现方式

- 通过对象绑定时
- 通过数组绑定时

通过对象方式绑定，会对对象中的 boolean 值进行判断，为 true 就添加进 class，否则不添加进去

```html
<div id="app">
    <!-- <h2 :class="{key1: boolean, key2: boolean}"></h2> -->
    
    <!-- 当 boolean 为 true 时，class 会添加 key 进去
		只有一个 key 为 true 时，class = "key1"
		当有多个 key 为 true 时，class = "key1 key2"
	-->
    
    <!-- 所以这里就是 class="active" -->
    <h2 :class="{active: isActive, b: isB}"></h2>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            isActive: true,
            isB: false
        }
    })
</script>
```



通过数组方式绑定，如果数组中的元素有 引号 ，就显示它本身，否则就显示 data 中定义的，再否则就不显示那个元素

```html
<div id="app">
    <!-- 此处的 class="item1 b" -->
    <h2 :class="['item1',item2,item4]"></h2>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            item1: 'a',
            item2: 'b',
            item3: 'c'
        }
    })
</script>
```



##### v-bind 动态绑定 style 也有两种实现方式

- 通过对象绑定
- 通过数组绑定

通过对象绑定时

```html
<div id="app">
    <p :style="{color: hc, fontSize: fs}">666</p>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            hc: 'red',
            fs: '20px'
        }
    })
</script>
```



通过数组绑定时

```html
<div id="app">
    <p :style="[hc,fs]">666</p>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            hc: {color: 'red'},
            fs: {fontSize: '20px'}
        }
    })
</script>
```



##### 一个关于 v-bind 的小例子：遍历一个列表在页面，当点击某一个元素时，将其变成红色，其余的不变色

```html
<div id="app">
    <ul>
        <li v-for="(item,index) in lists" @click="change(index)" :class="{active: num === index}">{{item}}</li>
    </ul>
</div>
<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
           lists:["a","b","c","d"],
            num: 0
        },
        methods: {
            change(index){
                this.num = index;
            }
        }
    })
</script>
<style>
    .active{
        color: red
    }
</style>
```



#### 4.7 v-on（重要）

v-on 事件监听，常常跟事件处理方法联合使用，例如下面的点击事件，上面监听调用下面的方法

```html
<div id="app">
    <h1 v-on:click="change">{{message}}</h1>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message: 'Hello'
        },
        methods: {
            change() {
                this.message = 'World'
            }
        }
    })
</script>
```

v-on：简写模式

```html
<!-- 完整写法 -->
<h1 v-on:click="change">{{message}}</h1>

<!-- 简单写法 -->
<h1 @click="change">{{message}}</h1>
```



事件调用的方法可能出现的三种情况

- 方法不需要参数
- 方法本身需要一个参数
- 方法需要一个参数，同时还需要一个 event 对象

```html
<div id="app">

    <!-- 不需要参数的时候，小括号加不加都可以 -->
    <button @click="btn">按钮1</button>
    <button @click="btn()">按钮2</button>

    <!-- 需要一个参数的时候，有三种特别情况：
			1.不加小括号，vue 会默认将浏览器生成的 event 事件对象作为参数传入，打印结果为 相应的事件对象
			2.加了小括号，表示传参为空，打印结果为 undefined
			3.传入参数，但是没有添加引号，如果是单词或字符，vue 会将其看作变量在 data 中寻找，找不到就报错
	-->
    <button @click="btn1">按钮3</button>
    <button @click="btn1()">按钮4</button>
    <button @click="btn1(msg)">按钮5</button>
    <button @click="btn1(123)">按钮6</button>

    <!-- 需要传入参数和 event 对象
			1.不加小括号，vue 会将浏览器生成的 event 对象作为第一个参数传入，第二个参数就显示为 undefined
			2.加了小括号，但是没有传参数，会显示两个 undefined
			3.传入一个参数，如果这个参数不是事件对象，则事件对象会默认为 undefined，反之亦然
			4.传入 event 对象的时候，需要使用 $event 作为参数
	-->
    <button @click="btn2">按钮7</button>
    <button @click="btn2()">按钮8</button>
    <button @click="btn2(1)">按钮9</button>
    <button @click="btn2(1,$event)">按钮0</button>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        methods: {
            // 不需要参数
            btn(){
                console.log('---');
            },

            // 需要一个参数
            btn1(a){
                console.log('+++',a)
            },

            // 需要一个参数和一个 event 对象
            btn2(b,event){
                console.log(b,'+++',event)
            }
        }
    })
</script>
```



事件处理修饰符

> @click.stop 阻止事件冒泡
>
> @click.prevent 阻止默认事件
>
> @click.once 该事件只会触发一次
>
>@click.stop.prevent 可以连续使用

按键别名

> @keyup.enter 监听某一个键位
>
> @keydown.tab 使用keydown
>
> @keydown.ctrl, @keydown.alt, @keydown.shift, @keydown.meta 系统修饰键，使用keydown
>
>@keydown.ctrl.y 系统修饰键可以使用连续两个键

> .exact 精确控制事件

```html
<div id="app">
    <div @click="div">
        <!-- 
			不添加 .stop 时，点击按钮同时会触发 div 的点击事件(事件冒泡)
			添加了 .stop 则不会触发 div 的点击事件
		-->
        <button @click.stop="btn">按钮</button>
    </div>

    <form action="http://www.baidu.com">
        <!-- 默认的提交事件，会直接自动提交并跳转页面 -->
        <input type="submit" value="提交" />
        <!-- 阻止默认的提交事件，具体表现就是不跳转页面，而是在自己定义的方法中进行操作 -->
        <input type="submit" value="提交" @click.prevent="sub" />
    </form>
    
    <!-- 监听键盘所有键位抬起的事件 -->
    <!-- <input type="text" @keyup="key" /> -->
    <!-- 只监听回车键 -->
    <input type="text" @keyup.enter="key" />
    
    <!-- 该事件只会触发一次 -->
    <button @click.once="one">一次</button>
    
    <!-- 只有 "只按下 ctrl 键并且鼠标点击" 才会触发事件，其他情况都不能触发事件 -->
    <button @click.exact.ctrl="show">exa</button>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        methods: {
            btn(){
                console.log('btn');
            },
            div(){
                console.log("div")
            },
            sub(){
                console.log("sub")
            },
            key(){
                console.log("key")
            },
            one(){
                console.log("one")
            },
            exa(){
                console.log("exc")
            }
        }
    })
</script>
```



#### 4.8 v-if

判断页面某个内容是否显示，通常跟 v-else 联合使用

```html
<div id="app">
    <h1 v-if="isShow">页面显示IF</h1>
    <h1 v-else>页面显示ELSE</h1>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            isShow: false
        }
    })
</script>
```

v-show 与 v-if 的对比

v-show 让元素消失是给元素添加了一个行内样式：display:none，dom 中依旧可以查看

v-if 则是直接让元素在页面消失了，dom 查看不到该元素了



#### 4.9 v-for

循环遍历，通过 v-for 可以遍历数组和集合

```html
<div id="app">
    <ul>
        <!-- 遍历数组 -->
        <li v-for="(item,index) in lists">{{item}} -- {{index}}</li>
    </ul>
    <ul>
        <!-- 遍历对象，获取的顺序依次为：值，键，下标 -->
        <li v-for="(value,key,index) in obj">{{item}} - {{key}} - {{index}}</li>
    </ul>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            lists:['a','b','c','d'],
            obj:{
                name: 'zz',
                age: 18
            }
        }
    })
</script>
```



#### 4.10 v-model（重要）

原理见[Object.defineProperty()](./js.md#javascript_1)  
表单元素和数据的双向绑定

```html
<div id="app">
    <input type="text" v-model="message" />
    <h1>{{message}}</h1>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el:'#app',
        data: {
            message:''
        }
    })
</script>

<!--------------------------------------------------------------------------------------------------------->

<!-- 不用 v-model 实现双向绑定 -->
<div id="app">
    <!-- 通过 v-bind 和 @input 实现
		v-bind 绑定文本框输入的值
		@input 文本框改变的时候触发，修改 message 的值
	-->
    <input type="text" :value="message" @input="cc" />
    <h1>{{message}}</h1>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el:'#app',
        data: {
            message:''
        },
        methods:{
            cc(event){
                this.message = event.target.value;
            }
        }
    })
</script>
```



**v-model** 绑定一些标签

```html
<div id="app">
    <!-- radio 单选按钮 -->
    <label>
        <input type="radio" v-model="sex" value="男" />男
    </label>
    <label>
        <input type="radio" v-model="sex" value="女" />女
    </label>
    <h2>性别是:{{sex}}</h2>
    <hr />

    <!-- checkbox 同意协议的那个小框框 -->
    <label>
        <input type="checkbox" v-model="isAgree" />同意协议
    </label>
    <button :disabled="!isAgree">下一步</button>
    <hr />

    <!-- checkbox 多选框 -->
    <label>
        <input type="checkbox" v-model="hobby" value="吃"/>吃
    </label>
    <label>
        <input type="checkbox" v-model="hobby" value="喝"/>喝
    </label>
    <label>
        <input type="checkbox" v-model="hobby" value="拉"/>拉
    </label>
    <label>
        <input type="checkbox" v-model="hobby" value="撒"/>撒
    </label>
    <h2>爱好是：{{hobby}}</h2>
    <hr />

    <!-- 下拉框单选 -->
    <select name="zz" v-model="fruit">
        <option value="冬瓜">冬瓜</option>
        <option value="南瓜">南瓜</option>
        <option value="西瓜">西瓜</option>
        <option value="北瓜">北瓜</option>
    </select>
    <h2>水果是：{{fruit}}</h2>
    <hr />

    <!-- 下拉框多选 -->
    <select name="zz" v-model="fs" multiple="multiple">
        <option value="冬瓜">冬瓜</option>
        <option value="南瓜">南瓜</option>
        <option value="西瓜">西瓜</option>
        <option value="北瓜">北瓜</option>
    </select>
    <h2>水果是：{{fs}}</h2>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el:'#app',
        data: {
            sex:'',
            isAgree: false,
            hobby:[],
            fruit:'冬瓜',
            fs:[]
        }
    })
</script>
```



**v-model** 的一些修饰符

```html
<div id="app">
    <!-- lazy: 数据在失去焦点或者按 enter 时才会更新
		      v-model 本来是实时更新双向绑定的，用在这里，可以输入完了再在下方显示
	-->
    <input type="text" v-model.lazy="message" />
    <h1>{{message}}</h1>

    <!-- number: 将用户输入的数字转化成 number 类型(默认是字符串类型) -->
    <input type="text" v-model.number="age" />
    <h1>{{typeof age}}</h1>

    <!-- trim: 去掉字符串前后的空格，中间的空格还在 -->
    <input type="text" v-model.trim="name" />
    <h1>{{name}}</h1>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el:'#app',
        data: {
            message:'',
            age:'',
            name:''
        }
    })
</script>
```

#### 4.11 自定义指令
```html
<div id="app">
    <div>
        <h2 v-text="message"></h2>
        <!-- v-big: 放大10倍 -->
        <h2 v-big="message"></h2>
        <!-- v-fbind: 绑定的input获取焦点 -->
        <input v-fbind="message">
    </div>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message:1
        },
        directives: {
            big(element, binding) {
                element.innerText = binding.value * 10
            },
            fbind: {
                // 此处的this指向的是window
                // 指令与元素绑定时
                bind(element, binding) {
                    element.value = binding.value
                },
                // 指令所在元素插入页面时
                inserted(element, binding) {
                    element.focus()
                },
                // 指令所在模板更新时
                update(element, binding) {
                    element.value = binding.value
                }
            }
        }
    })
</script>

```



### 5、小插曲

#### 5.1 数组的一些方法（重要）

```html
<div id="app">
    <ul>
        <li v-for="(item,index) in lists">{{item}}</li>
    </ul>

    <button @click="change">改变</button>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            lists:['a','b','c','d']
        },
        methods:{
            change(){
                // 在数组末尾添加一个或多个元素
                // this.lists.push('e');
                // this.lists.push("e","f","g");

                // 在数组开头添加一个或多个元素
                // this.lists.unshift('aa')
                // this.lists.unshift("aa","aaa");

                // 删除数组最后一个元素
                // this.lists.pop();

                // 删除数组第一个元素
                // this.lists.shift();

                // splice(start,num,value...) 是集大成者，可以实现插入、替换、删除元素

                // 删除元素，从下标为 x 的位置开始，删除两个元素
                // this.lists.splice(1,2)
                // 只传入一个参数的情况下，会删除这个元素以及之后的所有元素
                // this.lists.splice(1)

                // 替换元素，从下标为 x 的位置开始，替换 n 个元素，替换 m 个元素
                // this.lists.splice(1,3,'xx','yy')

                // 插入元素，从下标为 x 的位置开始，第二个参数为 0 ，插入 n 个元素
                // this.lists.splice(1,0,'z','zz','zzz')

                // Vue.set(对象，索引，修改值) 修改数组值
                // Vue.set(this.lists,1,'bb')

                // 反转数组内容
                this.lists.reverse();
            }
        }
    })
</script>
```



#### 5.2 可变参数

参数个数不确定的时候使用

```html
<div id="app">
    <h2>sum:{{result}}</h2>
    <!-- 可以传入多个参数 -->
    <button @click="sum(1,6,5,50)">求和</button>
</div>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            result: 0
        },
        methods:{
            // 定义可变长度的参数
            sum(...a){
                for(let i = 0; i < a.length; i++){
                    this.result += a[i]
                }
            }
        }
    })
</script>
```



#### 5.3 JS 相关（重要）

这三个方法可以实现链式编程，就是 let newArr = arr.filter(xxx).map(xxx).reduce(xxx);

- filter: 过滤数组元素，参数是一个回调函数，返回值为 true 时会将元素存入新数组，否则就过滤掉
- map: 对数组所有元素进行一次变化，参数是一个回调函数
- reduce: 汇总数组的所有内容，参数是一个回调函数

```html
<script>

    let nums = [10,50,6,20,63,9,100,56,86,23]

    // filter:过滤数组中的元素
    // let filterNums = nums.filter(function(n){
    // 	return n < 50;
    // });

    // 这是箭头函数的简便写法
    let filterNums = nums.filter(n => n < 50);
    console.log(filterNums)

    // map:操作数组元素
    // let mapNums = nums.map(function(n){
    // 	return n * 2;
    // });

    // 这是箭头函数的简便写法
    let mapNums = nums.map(n => n * 2);
    console.log(mapNums)

    // reduce:对数组中的元素汇总
    // preValue 是初始值(计算结束之后的返回值)，n 表示当前元素，0 表示传递给函数的初始值
    // let sum = nums.reduce(function(preValue,n){
    // 	return preValue + n;
    // },0);

    // 这是箭头函数的简便写法
    let sum = nums.reduce(((preValue,n) => preValue + n),0);
    console.log(sum)

</script>
```



#### 5.4 动态参数

用 [] 括起来的参数

可以将指令的参数或者标签的属性括起来，动态进行改变

我现在还没看到这个有什么作用，得以后看一看

```html
<!-- 
	这里需要注意的事情：vue 会把 [] 中定义的参数全部识别为小写，然后再从 data 中查找匹配项
	为了防止出错，用小写就完事了，如果觉得不好看，那一定也得把 [] 在 data 中对应的属性名变成小写
-->
<div id="app">
    <p v-bind:[ATTRIbuteName]="ck">{{message}}</p>
</div>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el: '#app',
        data: {
            message: 'Hello',
            attributename: 'align',
            ck: 'right'
        }
    })
</script>
```



#### 5.5 key

key ：管理可复用的元素，更高效的更新虚拟 DOM

Vue 本身就会尽可能的高效地渲染元素，通常都会复用已经存在的元素而不是从头渲染，这使得 Vue 很高效

例如下面的例子，改变了 login 的类型实现用不同的方式登录，但是输入框的内容不会清空，因为这两个模板使用了相同的元素

为了保持高效，input 标签不会被替换掉，这里只是改变了它的 placeholder 内容

什么意思呢，就是文本框的输入依然保存着，改变的只是默认显示的 placeholder 的内容

```html
<div id="app">
    <div v-if="login === 'username'">
        <label>Username</label>
        <input placeholder="输入名字">
    </div>
    <div v-else>
        <label>Email</label>
        <input placeholder="输入邮箱">
    </div>
    <button @click="change">切换</button>
</div>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el: '#app',
        data: {
            login:''
        },
        methods:{
            change(){
                // 如果 login===username,就赋值为空，否则就赋值为username
                // 简单点说就是通过点击按钮，切换登录的方式
                this.login = this.login === 'username' ? '' : 'username';
            }
        }
    })
</script>
```



官网里面说，Vue 通过 key 来表示两个元素是相互独立的，不要复用它们

所以，相同的组件定义了不同的 key ，vue 就不会复用该标签了

用在我这里，就表示两个 input 是相互独立的，不要复用，具体表现就是点击按钮切换之后，文本框的内容会清空

```html
<!-- 这里只需要在上面的代码中给 input 标签添加不同的 key 即可，key 相同的话就是告诉 vue 这俩货一样了，它就又会复用 -->
<input placeholder="输入名字" key="a">
<input placeholder="输入邮箱" key="b">
```



#### 5.6 const

- const 定义的时候，必须赋值

- const 定义的内容被赋值后不能被更改

- const 定义对象的时候，对象不能更改，但是对象的属性可以更改

```html
<script>
    // 下面这行定义的时候没有赋值，会报错
    // const name;
    
    const age = 100;

    const obj = {
        name:'a',
        age:18
    }
    console.log(obj)

    // 不能直接修改对象，这样写是改变了对象的指向，是修改了 obj 保存的地址值，会报错
    // obj = {
    // 	name: 'b',
    // 	age:19
    // }

    // 不过可以对对象的属性进行修改
    obj.name = 'b'
    obj.age = 19

    console.log(obj)
</script>
```



### 6、计算属性

对于任何复杂的逻辑，都应刚使用计算属性，以保证 vue 的标签部分只是为了显示结果，更加直观

可能使用了计算属性使得代码量变多了，但是页面其实更清晰了，有条理了，这算是另一种简洁吧



#### 6.1 简单使用

将一个字符串进行反转显示在页面上

```html
<!-- 没有使用计算属性时候 -->
<div id="app">
    <p>反转前：{{message}}</p>
    <p>反转后：{{message.split('').reverse().join('')}}</p>
</div>

<!-- 使用了计算属性 -->
<div id="app">
    <p>反转前：{{message}}</p>
    <p>反转后：{{anotherMessage}}</p>
</div>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el: '#app',
        data: {
            message: 'Hello'
        },
        computed:{
            anotherMessage(){
                return this.message.split('').reverse().join('');
            }
        }
    })
</script>
```



#### 6.2 计算属性和方法的区别

通过下面的代码来看，好像本质上没有什么区别，实际上也是这样子的哈哈哈

实际上这俩的区别之处在于 **性能**

- 计算属性是会基于响应式依赖进行缓存的
- 方法则是调用一次就会执行一次
- 可以把计算属性当作一个属性直接使用，但是调用方法的时候需要加 ()，虽然也可以不加，这一点参考 **4.7 v-on**

这意味着只要源头的 message 不发生变化，多次获得 anotherMessage 值，计算属性会立即返回之前的计算结果

而通过方法获得的 another 值，每次执行都会执行方法才能获得结果

```html
<div id="app">
    <p>反转前：{{message}}</p>
    <p>使用计算属性反转后：{{anotherMessage}}</p>
    <p>使用方法反转后：{{another()}}</p>
</div>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el: '#app',
        data: {
            message: 'Hello'
        },
        computed:{
            anotherMessage(){
                return this.message.split('').reverse().join('');
            }
        },
        methods:{
            another(){
                return this.message.split('').reverse().join('')
            }
        }
    })
</script>
```



#### 6.3 计算属性的 setter

计算属性默认是 getter 方法，但是有些情况可能要用到 setter 进行赋值(开发人员想的挺周到)

```html
<div id="app">
    <p>English Name: {{fullName}}</p>
</div>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el: '#app',
        data: {
            firstName: 'Bob',
            lastName: 'Sam'
        },
        computed:{
            // 这个 fullName 相当于是一个属性
            fullName: {
                // 这里是 getter 方法，获取计算后的结果
                get(){
                    return this.firstName + ' ' + this.lastName;
                },
                // 这里是 setter 方法，进行赋值操作
                set(name){
                    let names = name.split(',');
                    this.firstName = names[0];
                    this.lastName = names[names.length-1];
                }
            }
        }
    })
    
    // 在 console 输入：app.fullName="Ha,ha";
    // 页面会发生变化，显示 Ha ha
</script>
```


### 7、监视属性

#### 7.1 vue 通过 watch 提供了一个通用的办法来响应数据的变化，具体表现在数据变化时候就触发 watch 中的代码

数据变化时执行异步或开销较大的操作，数据一旦发生了变化就 通知侦听器所绑定的方法。

监听单个变量的变化

```html
<div id="app">
    {{message}}
    <button @click="change">改变</button>
</div>

<script src="../resources/vue.js"></script>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            message: "Hello"
        },
        methods:{
            change(){
                this.message = "haha";
            }
        },
        // message 发生变化时会触发 watch
        watch:{
            message(newV,oldV){
                console.log(newV,oldV)
            }
        }
    })	
</script>
```

#### 7.2 监听对象的单个属性的变化

```html
<div id="app">
    {{obj.name}} + {{obj.age}}
    <button @click="change">改变</button>
</div>

<script src="../resources/vue.js"></script>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            obj:{
                name:'aa',
                age:18
            }
        },
        methods:{
            change(){
                this.obj.name='hh'
                this.obj.age=16
            }
        },
        watch:{
            'obj.name'(newValue,oldValue){
                console.log(newValue,oldValue)
            },
            'obj.age'(newValue,oldValue){
                console.log(newValue,oldValue)
            }
        }
    })	
</script>
```

#### 7.3 监听一个对象整体的变化

```html
<div id="app">
    {{obj.name}} + {{obj.age}}
    <button @click="change">改变</button>
</div>

<script src="../resources/vue.js"></script>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            obj:{
                name:'aa',
                age:18
            }
        },
        methods:{
            change(){
                this.obj.name='hh'
                this.obj.age=16
            }
        },
        watch:{
            obj:{
                handler(newValue,oldValue){
                    console.log(newValue,oldValue)
                }
            }
        }
    })	
</script>

// 直接更改对象的属性，不会发生变化
// 更改对象的引用后，调用了 watch
// 为了更改对象的属性时，也能触发 watch，可以使用 deep(深入观察)，下面这么写就可以
/*
watch:{
	obj:{
		handler(newValue,oldValue){
		console.log(newValue,oldValue)
		},
		deep:true
	}
}
*/
```

#### 7.4 初始化绑定的时候就触发监听事件，通过 immmediate

```html
watch:{
	obj:{
		handler(newValue,oldValue){
		console.log(newValue,oldValue)
		},
		// 表示初始化的时候就会执行 watch
		immediate:true,
		deep:true
	}
}
```





### 8、组件化

Vue 的组件化是它很重要的一个思想，它是通过一个个独立的可以复用的组件来构造一个应用

- 功能划分，将不同的功能细化为组件
- 可以复用，移植性高，之后如果有需要用到的地方，可以拿直接使用，不用再写一个功能相似的东西



#### 8.1 基本使用

Vue 在之前版本使用组件有三个步骤：

- 创建组件构造器：const name =  Vue.extend({xxx})
- 注册组件：Vue.component("标签名",name)，标签名推荐字母全小写且必须包含一个连字符，类似于：my-comp
- 使用组件：必须在 vue 实例中使用，就好比我下面的例子，写在 div 之外，vue 可不会搭理它

```html
<div id="app">
    <!-- 3.使用组件 -->
    <my-comp></my-comp>
    <my-comp></my-comp>
</div>

<script src="../resources/vue.js"></script>
<script>

    // 1.创建一个组件构造器
    const comp = Vue.extend({
        // 这里用了一个 ` 这个符号，可以实现字符串跨行，很鸡肋，但看起来比较整齐
        template: `
			<div>
				<h2>哈哈</h2>
				<p>这是一句话</p>
				<p>这也是一句话</p>
    		</div>
			`
    })

    // 2.注册组件，这里是注册成了全局组件
    Vue.component("my-comp",comp)

    let app = new Vue({
        el:'#app',
        data: {
        }
        // 2.也可以在这注册成局部组件
        // components:{
       	//	 'my-comp':comp
    	// }
    })
</script>
```



更新版本之后，组件的创建和注册合并了，**我这里之后的组件的例子就使用更新之后的版本**

```html
<div id="app">
    <!-- 2.使用组件 -->
    <my-comp></my-comp>
</div>

<script src="../resources/vue.js"></script>
<script>

    // 1.组件的创建和注册
    //   这是全局组件
    Vue.component("my-comp",{
        data(){
            return{
                count: 0
            }
        },
        template: "<button @click='add'>点击了 {{count}} 次</button>",
        methods:{
            add(){
                this.count++;
            }
        }
    })

    let app = new Vue({
        el: '#app',
        data: {
        }
    })
</script>
```





#### 8.2 全局和局部

全局组件：多个 vue 实例都可以使用

局部组件：只有当前 vue 实例可以使用



通过 Vue.component("xxx",{...}) 注册的方式，注册的是全局组件

当存在多个 vue 实例时，它们都可以使用

```html
<div id="app">
    <my-comp></my-comp>
</div>

<div id="app1">
    <my-comp></my-comp>
</div>

<script src="../resources/vue.js"></script>
<script>

    // 这表示注册全局组件
    Vue.component("my-comp",{
        template: `
            <div>
                <h2>哈哈</h2>
                <p>这是一句话</p>
                <p>这也是一句话</p>
            </div>
            `
    })

    let app = new Vue({
        el:'#app',
        data: {
        }
    })

    let app1 = new Vue({
        el:'#app1',
        data:{
        }
    })
</script>
```



在某个 vue 实例中将组件注册，那个组件就会变成局部组件

局部组件注册的方式：

- 可以先在 script 标签中定义组件，然后在实例中注册组件
- 也可以直接在实例中定义注册组件

对于局部组件，只有注册组件的 vue 实例可以使用它，在其他实例中使用该组件就会报错

```html
<div id="app">
    <my-comp></my-comp>
</div>

<!-- 会报错，提示 my-comp 没注册 -->
<div id="app1">
    <my-comp></my-comp>
</div>
		
<script src="../resources/vue.js"></script>
<script>
			
    const comp = {
        template: `
            <div>
                <h2>哈哈</h2>
                <p>这是一句话</p>
                <p>这也是一句话</p>
            </div>
            `
    }

    let app = new Vue({
        el:'#app',
        data: {
        },
        // 在实例中注册局部组件
        components:{
            'my-comp': comp
        }
    })

    let app1 = new Vue({
        el:'#app1',
        data:{
        }
    })
</script>
```



全局组件和局部组件的另一种写法  ->  简写 + 模板写法

- 简写：
  - 全局简写：组件的创建和注册通过 Vue.component() 完成
  - 局部简写：将组件的创建和注册都在 vue 实例中完成

- 模板：将组件中 template 的内容抽离出来写在上面

```html
<div id="app">
    <!-- 会报错，提示 my-all-comp 没有注册 -->
    <my-all-comp></my-all-comp>
    <my-local-comp></my-local-comp>
</div>

<!-- 定义模板，指定 id -->
<template id="allComp">
    <div>
        <h2>这是一句话</h2>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    // 如果注册全局组件，直接这样写就可以，模板内容是通过 id 获取上面定义的内容
    // Vue.component("my-all-comp",{
    // 	template: '#allComp'
    // })

    let app = new Vue({
        el:'#app',
        data:{
        },
        // 局部组件的写法
        components:{
            'my-local-comp':{
                template:'#allComp'
            }
        }
    })
</script>
```



#### 8.3 父子组件

定义两个组件，在一个组件中注册另一个组件，它们之间就形成了父子关系

然后在 vue 实例中注册父组件，就可以使用父子组件了

虽然在父组件中注册了子组件，但是由于 vue 实例中并没有注册子组件，所以子组件无法在页面使用

```html
<div id="app">
    <my-comp></my-comp>
    <!-- 这里会报错，提示没注册 my-son -->
    <my-son></my-son>
</div>

<template id="son">
    <div>
        <p>我是儿子</p>
    </div>
</template>

<template id="father">
    <div>
        <p>我是爹爹</p>
        <myson></myson>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    // 子组件 (明明敲得例子一样，但是我的没出来,QAQ~ 原来是下面的原因)
    // 必须先定义子组件，否则父组件使用时会提示找不到
    // 这里使用了模板的写法，即将 template 抽离到上面去
    const son = {
        template: '#son'
    }

    // 父组件中注册子组件
    const father = {
        template: '#father',
        components:{
            'my-son': son
        }
    }

    let app = new Vue({
        el:'#app',
        data: {
        },
        // vue 实例中注册父组件
        components:{
            'my-comp': father
        }
    })

    // 上面的代码通过 "模板+简写" 整合起来的究极代码就是下面这样子
    // let app = new Vue({
    //     el: '#app',
    //     data:{
    //     },
    //     components:{
    //         'my-comp': {
    // 			  // 这里也可以直接这么写：template: father(可以直接写 id 名)
    //             template: '#father',
    //             components:{
    //                 'my-son': {
    // 					 // 同上
    //                     template: '#son'
    //                 }
    //             }
    //         }
    //     }
    // })
</script>
```



#### 8.4 组件的 data 数据

组件能否直接使用 vue 实例中的数据吗？ **不能！！！**

虽然是在 vue 的实例中注册的组件，但是组件无法直接使用 vue 实例中的 data

```html
<div id="app">
    <my-comp></my-comp>
</div>

<template id="cc">
    <div>
        <p>我是一句话</p>
        <!-- 这里页面的 console 会报错 -->
        <p>{{message}}</p>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
            message:'hello'
        },
        components:{
            'my-comp': {
                template: cc
            }
        }
    })
</script>
```



> 首先在 **8.3 父子组件** 中，从父子组件的使用方法可以看出，其实对于父组件而言，它相当于是 vue 实例的子组件。

基于上面这句话，可以猜测两个结论：

- 既然 vue 也是一个组件，它有自己的 data，那么组件肯定也有自己的 data

- 既然组件无法直接使用 vue 实例中的 data，那么就表示子组件无法直接使用父组件的 data



> 针对第一个结论的说明

组件中的数据也在 data 中，但是它不像 vue 实例那用使用，它有自己的方式

- 组件的 data 必须是一个函数，这个函数的返回值是一个对象
- 返回值的对象中保存着数据

```html
<div id="app">
    <my-comp></my-comp>
</div>

<template id="cc">
    <div>
        <p>我是一句话</p>
        <p>{{message}}</p>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
            message:'hello'
        },
        components:{
            'my-comp': {
                template: cc,
                data(){
                    return {
                        message: '组件的数据'
                    }
                }
            }
        }
    })
</script>
```



> 为什么组件的 data 需要通过函数使用？

因为如果组件的 data 不是函数，那么多个地方都使用该组件的时候，会公用这个 data，这可不是我们希望看到的；

而当组件的 data 是一个函数的时候，每次使用返回的都是一个新的对象，互不干扰。

```html
<!-- 这里定义了三个计数器 -->
<div id="app">
    <my-comp></my-comp>
    <my-comp></my-comp>
    <my-comp></my-comp>
</div>

<template id="cc">
    <div>
        <p>当前计数：{{count}}</p>
        <button @click="add">+</button>
        <button @click="del">-</button>
    </div>
</template>
<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
        },
        components:{
            'my-comp': {
                template: cc,
                data(){
                    return{
                        count: 0
                    }
                },
                methods:{
                    add(){
                        this.count++;
                    },
                    del(){
                        this.count--;
                    }
                }
            }
        }
    })
</script>
```



> 针对第二个结论

子组件无法直接使用父组件定义的 data 中的内容，会提示 message 没有定义

```html
<div id="app">
    <my-comp></my-comp>
</div>

<template id="cc">
    <div>
        <p>我是一句话</p>
        <p>{{message}}</p>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>
    let app = new Vue({
        el:'#app',
        data: {
            message:"vue"
        },
        components:{
            'my-comp': {
                template: cc
            }
        }
    })
</script>
```

#### 8.5 父子组件通讯

父子组件无法直接访问对方的 data 中的数据，但是间接就可以了，这个就是父子组件之间的通讯

- 父组件向子组件传值：子组件通过 props 接收

- 子组件向父组件传值：通过自定义事件



> 父组件向子组件传值

子组件通过 props 用数组方式接收

```html
<div id="app">
    <!-- 2.将父组件的 lists 传给子组件，子组件通过 v-bind:arr 与 props 中定义的内容绑定，接收父组件的传值 -->
    <my-comp :arr="lists"></my-comp>
</div>

<template id="cc">
    <div>
        <ul>
            <!-- 3.子组件使用父组件传来的值 -->
            <li v-for="(item,index) in arr">{{item}} - {{index}}</li>
        </ul>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
            lists:['a','b','c','d']
        },
        components:{
            'my-comp': {
                // 1.最简单的写法，子组件通过该 props 接受父组件传来的值
                props:['arr'],
                template: cc
            }
        }
    })
</script>
```

props 通过对象接收参数

```html
<div id="app">
    <!-- 父组件没有给它传值，就显示默认值 -->
    <my-comp></my-comp>
    
    <!-- 父组件传值之后，就显示传来的值 -->
    <my-comp :arr="lists"></my-comp>
</div>

<template id="cc">
    <div>
        <ul>
            <li v-for="(item,index) in arr">{{item}} - {{index}}</li>
        </ul>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
            lists:['a','b','c','d']
        },
        components:{
            'my-comp': {
                template: cc,
                // 高级一点的内容，指定必须传入什么类型的值，且如果没有传值，就用指定的默认值
                props:{
                    arr:{
                        type: Array,
                        default(){
                            return ['x','y']
                        }
                    }
                }

            }
        }
    })
</script>
```



**props 注意**：驼峰问题

props 定义接受参数名的时候如果用了驼峰命名，那么在页面接收父组件的参数的那个地方需要将驼峰命名更改

具体更改方式：myInfoList -> my-info-list

```html
<div id="app">
    <my-comp :my-info-list="lists"></my-comp>
</div>

<template id="cc">
    <div>
        <ul>
            <li v-for="item in myInfoList">{{item}}</li>
        </ul>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
            lists:['a','b','c','d'],
            message:'666'
        },
        components:{
            'my-comp': {
                template: cc,
                props:{
                    myInfoList:{
                        type: Array,
                        default(){
                            return ['a','b']
                        }
                    }
                }

            }
        }
    })
</script>
```



> 子组件向父组件传值

子组件通过 this.$emit("xxx",参数) 触发父组件的事件，并传递参数，父组件通过 v-on(@) 监听事件

```html
<div id="app">
    <!-- 3.父函数监听 mclick 事件，调用本身的 hello 方法，并把 item 传入 -->
    <my-comp :arr="lists" @mclick="hello"></my-comp>
</div>

<template id="cc">
    <div>
        <!-- 1.点击子组件的按钮触发子组件的 ccclick 方法 -->
        <button v-for="item in arr" @click="ccclick(item)">{{item.name}}</button>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
            lists:[
                {id:'1',name:'aa'},
                {id:'2',name:'bb'},
                {id:'3',name:'cc'},
                {id:'4',name:'dd'},
                {id:'5',name:'ee'}
            ]
        },
        components:{
            'my-comp':{
                props:['arr'],
                template:cc,
                methods:{
                    ccclick(item){
                        // 2.这个函数中，触发父组件的 mclick 方法，并传递当前 item 项
                        this.$emit("mclick",item);
                    }
                }
            }
        },
        methods:{
            hello(item){
                // 4.完成 hello 方法
                console.log(item.name)
            }
        }
    })
</script>
```
!!!note
    在子组件中使用<code>this.$off('mclick')</code>解绑一个自定义事件  
    将多个事件名放在一个数组中传入可以解绑多个，<code>this.$off(['mclick', 'mclick2'])</code>  
    <code>this.$off()</code>解绑所有自定义事件  

!!!note
    给子组件绑定原生事件时，比如@click, 会被当作自定义事件，需要在后加上修饰符.native  

另一种给子组件绑定自定义事件的方法, 更加灵活，比如可以在3秒后绑定事件
```html
<!-- 父组件 -->
<div id="app">
    <my-comp ref="mycomp"></my-comp>
</div>

<script>
    //....
    mounted(){
        this.$refs.mycomp.$on('mclick', this.hello) // $once 绑定一次
    }
    //....
</script>
```



小例子：父子组件互相修改文本框的值

```html
<div id="app">
    <!-- 父组件显示的值 -->
    <input v-model="message" />
    <h3>{{message}}</h3>

    <!-- 子组件显示的值 -->
    <my-comp
		:msg="message"
         @input="fc"
    >
    </my-comp>

</div>
</div>

<template id="cc">
    <div>
        <!-- 监听输入框改变 -->
        <input :value="msg" @input="change" />
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
            message:'hello'
        },
        components:{
            'my-comp':{
                template: cc,
                props:['msg'],
                methods:{
                    change(e){
                        this.$emit("input",e)
                    }
                }
            }
        },
        methods:{
            fc(e){
                this.message = e.target.value;
            }
        }

    })
</script>
```



#### 8.6 父子组件的访问方式

父组件直接访问子组件：通过 $children 或者 $refs

- 通过 $children 访问时，需要通过 [] 指定第几个子组件，不是很方便
- 通过 $refs 访问时，需要在自定义子组件标签上定义 ref="xxx" 的属性，通过 $refs.xx.属性/方法 访问

子组件直接访问父组件：通过 $parent，直接通过 this.$parent.属性/方法 访问

```html
<!-- 下面是 $children 和 $refs 的使用 -->
<div id="app">
    <my-comp></my-comp>
    <my-comp ref="aa"></my-comp>
    <button @click="btnclick">按钮</button>
</div>

<template id="cc">
    <div>
        <h1>我是子组件</h1>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {

        },
        components:{
            'my-comp':{
                template: cc,
                data(){
                    return {
                        name:'子组件名字'
                    }
                },
                methods:{
                    show(){
                        console.log("子Method")
                    }
                }
            }
        },
        methods:{
            btnclick(){
                // 通过 $children 获得子组件的属性和方法
                // this.$children[0].show();
                // console.log(this.$children[0].name)
                this.$refs.aa.show();
                console.log(this.$refs.aa.name)
            }
        }
    })
</script>
```



子组件访问父组件，跟上面的 $children 类似，应该用的不多

```html
<div id="app">
    <my-comp></my-comp>
</div>

<template id="cc">
    <div>
        <h1>我是子组件</h1>
        <button @click="btnclick">按钮</button>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
            name:'我是父组件'
        },
        components:{
            'my-comp':{
                template: cc,
                methods:{
                    btnclick(){
                        this.$parent.show();
                        console.log(this.$parent.name)
                    }
                }
            }
        },
        methods:{
            show(){
                console.log("父Method")
            }
        }
    })
</script>
```



#### 8.7 动态组件

动态组件，实现不同组件的动态切换，可以通过 `<component>` 添加一个 is attribute 来实现

下面是官网的一个例子，我把那些名字改了改，改成我一眼能看懂的

```html
<div id="app">
    <!-- 1.点击按钮，defaultTab 变化 -->
    <button
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: defaultTab === tab }]"
            v-on:click="defaultTab = tab"
            >
        {{ tab }}
    </button>

    <!-- 3.动态切换，当 chooseWho 改变的时候，显示的组件也会跟着变化 -->
    <component v-bind:is="chooseWho" class="tab"></component>
</div>
<script src="../resources/vue.js"></script>
<script>

    Vue.component("tab-a",{
        template:"<div>这是A组件</div>"
    });
    Vue.component("tab-b",{
        template:"<div>这是B组件</div>"
    });
    Vue.component("tab-c",{
        template:"<div>这是C组件</div>"
    });

    let app = new Vue({
        el: "#app",
        data: {
            defaultTab: "a",
            tabs: ["a","b","c"]
        },
        // 2.defaultTab 变化引起 chooseWho 变化
        computed: {
            chooseWho() {
                return "tab-" + this.defaultTab.toLowerCase();
            }
        }
    });
</script>
<style>
    .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
    }
    .tab-button:hover {
        background: #e0e0e0;
    }
    .tab-button.active {
        background: #e0e0e0;
    }
    .tab {
        border: 1px solid #ccc;
        padding: 10px;
    }
</style>
```



动态切换组件虽然很好用，但是设想一个场景

在网上看书，首页左边是目录列表，右面是内容，顶部有两个按键，对应首页和其他页，你点了一个目录开始看

然后不小心点到其它页，然后你点击首页继续看的时候，发现显示的是默认的内容，不是你之前读的内容

如果是动态组件实现这个场景，就会遇到这种问题

因为动态组件虽然用到了计算属性，但是每次切换的时候，defaultTab 会发生变化，所以创建了新的实例

为了让我们返回首页继续看之前的内容，就需要用到 `keep-alive` 标签了，字面意思：保持活性

```html
<div id="app">
    <!-- 3.点击按钮之后，引起 defaultTab 的变化 -->
    <button
            v-for="tab in tabs"
            :key="tab"
            @click="defaultTab = tab"
            >{{tab}}
    </button>
    
    <!-- 4.保持活性的代码片段，chooseWho 改变的时候，切换按钮对应的页面
		  此时如果返回页面，会保持显示上一次浏览的目录对应的主体内容
	-->
    <keep-alive>
        <component :is="chooseWho"></component>
    </keep-alive>
</div>

<template id="cc">
    <div>
        <div>
            <ul>
                <!-- 1.点击列表项（目录）时，将 item 赋给 selectWho -->
                <li 
                    v-for="item in lists" 
                    :key="item.id"
                    @click="selectWho = item"
                    >
                    {{item.title}}
                </li>
            </ul>
        </div>
        <div>
            <!-- 2.根据 selectWho 来确定显示的内容 -->
            <div v-if="selectWho">
                <h3>{{selectWho.context}}</h3>
            </div>
            <h3 v-else>点击标题开始阅读</h3>
        </div>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    Vue.component("A",{
        template: cc,
        data(){
            return{
                lists:[
                    {id:1,title:'第一个',context:'第一页主体内容第一页主体内容第一页主体内容第一页主体内容'},
                    {id:2,title:'第二个',context:'第二页主体内容第二页主体内容第二页主体内容第二页主体内容'},
                    {id:3,title:'第三个',context:'第三页主体内容第三页主体内容第三页主体内容第三页主体内容'}
                ],
                selectWho: null
            }
        }
    });

    Vue.component("B",{
        template:"<div>其他页面</div>"
    })

    let app = new Vue({
        el:'#app',
        data:{
            defaultTab: 'A',
            tabs:['A','B']
        },
        // 4.defaultTab 的变化引起 chooseWho 的变化
        computed:{
            chooseWho(){
                return this.defaultTab;
            }
        }
    })
</script>	
```



#### 8.8 事件总线

```js
/* main.js */
new Vue({
	/* ----- */
	el: '#app',
	beforeCreate() {
		Vue.prototype.$bus = this // 安装事件总线
	}
	/* ----- */
})
```

```html
<!-- A组件(作为接收信息者) -->
<template>
	<!-- ------ -->
</template>

<script>
/* ----- */
	mounted() {
		this.$bus.$on('hello', (data) => {
			console.log('接收到了数据')
		})
	},
	beforeDestory() {
		this.$bus.$off('hello')
	}
/* ----- */
</script>

<!-- B组件(作为发送信息者) -->
<template>
	<!-- ------ -->
</template>

<script>
/* ----- */
	methods() {
		send() {
			this.$bus.$emit('hello', this.testData)
		}
	}
/* ----- */
</script>
```

### 9、插槽 slot

主要是为了提高组件的扩展性



#### 9.1 基本使用

参考手机 app 顶部的导航栏，它们长得相似但显示内容可能不同，对于它们不同的那一部分，就可以通过 slot 实现

这个玩意，就是把一样的留下，把不同的暴露为插槽，插槽的内容调用的时候再决定，有点像 java 的抽象类了

- 在子组件中定义一个标签：`<slot>`
- 插槽可以有默认值，例如：`<slot><button>按钮</button></slot>`
- 多个值同时放入子组件进行替换时，全部都会显示

```html
<div id="app">
    <!-- 在使用子组件的时候，中间那一部分可以替换插槽的内容 -->
    <my-comp></my-comp>
    <my-comp><p>这里插入p标签</p></my-comp>
    <my-comp></my-comp>
    <my-comp>
        <p>这里插入p标签</p>
        <h2>这里插入h2标签</h2>
    </my-comp>
    <my-comp></my-comp>
</div>

<template id="cc">
    <div>
        <h3>我是子组件，我下面是插槽</h3>
        <!-- 如果没有填写插槽，就默认显示按钮 -->
        <slot><button>按钮</button></slot>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
        },
        components:{
            'my-comp':{
                template: cc
            }
        }
    })
</script>
```



自 vue 2.6.0 起，slot 和 slot-scope 已经废弃，取代它们的是 v-slot

#### 9.2 具名插槽

有些导航栏或者其他东西可能不只是一个东西不一样，它的左边右边中间都可能随机不一样，于是就用到了具名插槽

这里的使用方法

- 在子组件中定义插槽，指定 name 属性
- 在父组件中使用子组件的时候，`<template v-slot:name>` 标签内的内容会替换掉对应 name 的插槽

```html
<div id="app">
    <!-- 这里第一行显示默认的三个插槽 -->
    <my-comp></my-comp>

    <!-- 根据插槽名，对第二行和第三行的插槽进行替换 -->
    <my-comp>
        <template v-slot:center>
            <span>标题</span>
        </template>
        <!-- 简写方式:template #center -->
    </my-comp>
    
    <my-comp>
        <template v-slot:left>
            <button>返回</button>
        </template>

        <template v-slot:center>
            <input placeholder="请输入搜索内容" />
        </template>

        <template v-slot:right>
            <button>详情</button>
        </template>
    </my-comp>
</div>

<template id="cc">
    <div>
        <slot name="left">左边</slot>
        <slot name="center">中间</slot>
        <slot name="right">右边</slot>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
        },
        components:{
            'my-comp':{
                template: cc
            }
        }
    })
</script>
```



#### 9.3 作用域插槽

具体理解，正常情况下是父组件替换插槽的标签，内容是父组件决定的

但是现在想把内容交给子组件决定，就需要用到作用域插槽了



什么意思呢，这首先需要了解一下，在页面使用组件之后，父组件是无法直接拿到子组件中定义的数据的

如果想对子组件中的数据进行不同形式的展现，就可以通过作用域插槽来解决



作用域插槽

- 在子组件中定义插槽模板，同时与子组件中的数据绑定，我这里是 :arr="lists" (这个 arr 可以随意起名)
- 在页面中使用子组件的时，通过 `<template v-slot:default="slot">` 来引用子组件的插槽
- 然后通过绑定的属性就可以获取子组件中的数据了，意思就是可以通过 slot.arr 获取到子组件的数据了

```html
<div id="app">
    <my-comp></my-comp>
    <my-comp>
        <!-- 2.引用子组件插槽 -->
        <template v-slot:default="slot">
            <!-- 3.获取子元素的数据，按需求显示 -->
            <!-- 这里是通过 join('-') 将数组中的元素按 - 分割开来 -->
            <span>{{slot.arr.join('-')}}</span>
        </template>
    </my-comp>

    <my-comp>
        <template v-slot:default="slot">
            <!-- 同上 -->
            <span>{{slot.arr.join('+')}}</span>
        </template>
    </my-comp>
</div>

<template id="cc">
    <div>
        <!-- 1.绑定子元素的数据，这个玩意叫做 插槽prop -->
        <slot :arr="lists">
            <ul>
                <li v-for="item in lists">{{item}}</li>
            </ul>
        </slot>
    </div>
</template>

<script src="../resources/vue.js"></script>
<script>

    let app = new Vue({
        el:'#app',
        data: {
        },
        components:{
            'my-comp':{
                template: cc,
                data(){
                    return{
                        lists:['a','b','c','d','e']
                    }
                }
            }
        }
    })
</script>
```





### 模块化

为什么要模块化一个项目

因为一个项目如果不是一个人开发，那么会引入不同的 js 文件，如果这些文件中使用了相同的变量，加上不同 js 文件导入的先后顺序不同，就会导致不必要的错误

为此，可以使用立即执行函数解决这个问题，在函数内部定义的变量外部无法访问，但这样又会出现一个问题，就是如果我想在函数外面访问这个 js 的方法和变量，就不行了，就需要重写，代码复用性不行，也不好看，甚至可能依旧会出现上面的问题

之后，又出现了一个写法，将自己开发的模块中定义一个变量，在立即执行函数中定义一个对象，在对象中添加变量和方法，将对象返回，之后在其他模块使用的时候，直接通过 变量名.xxx 即可，这种情况下，只需要避免模块名相同即可

最后，前人已经制定了一些模块化的写法，我们只需要按照相应规范即可实现模块化，模块化最主要的就是 导入 和 导出，over~





### 10、Webpack

Webpack 模块化打包工具，依赖于 node.js 环境

node.js 环境为了可以正常执行代码，又会依赖很多个包，为此，node.js 自带了软件包管理工具 npm



#### 10.1 安装

首先在电脑上查看 node.js 版本，cmd 输入：node -v

如果没有就需要先安装 node.js，之后通过命令行安装 webpack

我在 B站 看的视频，安装的是 3.6.0. 版本的，全局安装(在命令行任何地方可以使用)

```bash
npm install webpack@3.6.0 -g
```



#### 10.2 基本使用

首先建立文件夹

- dist：存放打包之后的代码
- src：这在里编写模块代码
- index.html：暂时放在这里运行

这里写一个简单的打包测试一下能否实现模块的导入导出

1.编写 commonJS.js 使用 commonJS 的模块导出

```js
// 这个是 commonJS.js
function add(a,b){
	return a + b
}

function sub(a,b){
	return a - b
}

module.exports = {
	add,
	sub
}
```

2.编写 ES6.js 使用 ES6 的模块导出

```js
let name = "伍六七";
let age = 18;

function show(){
	console.log("ES6 show")
}

export {
	name,
	age,
	show
}
```

3.编写 main.js 导入模块

```js
// 这个是 main.js

// commonJS 的模块导入
const {add, sub} = require('./commonJS.js');
// ES6 的模块导入
import {name,age,show} from "./ES6.js"

// 导入后直接使用
console.log(add(100,23));
console.log(sub(123,23));
show();
```

编写完毕之后，在 cmd 进入当前目录，输入以下代码进行打包，之后会在 dist 目录下生成 bundle.js 文件

```bash
webpack ./src/main.js ./dist/bundle.js
```

之后直接在 index.html 中引入 bundle.js 即可，运行 index.html，查看 console，能看到 main.js 中打印的结果

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<script src="./dist/bundle.js"></script>
	</body>
</html>
```



#### 10.3 配置

每次修改 js 文件之后都需要重新打包，输入那么一长串

为了少些一点后面的路径，可以配置 webpack.config.js 文件

**但要知道** 这个配置文件的作用不止于此，不然就太鸡肋了

> 配置 webpack.config.js

```js
// 导入 node 的 path 模块,下面会通过 path 动态获取当前路径
const path = require("path")

module.exports = {
    // 配置入口(js 文件)和出口(打包的地方)
    entry:'./src/main.js',
    output:{
        // path 中的方法，这里是对两个路径进行拼接
        // __dirname:当前文件所在路径，(可以理解为上级目录)也就是 E:\Demo\VueDemo\webpack
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
}
```

因为我们在 webpack.config.js 中可能会需要使用到 node 的相关内容，所以首先初始化项目

在页面输入下面的代码，之后会生成 package.json 文件，这个文件会保存当前项目的一些信息，是 npm 包管理的文件

```bash
npm init -y
```

之后就可以只用写 webpack 完成打包了，同时目录下会多一个 package.json 的文件



> 配置 package.json

npm run xxx 会对应 package.json 中的 scripts 中定义的键值对

所以可以通过配置下面这样，之后就通过 npm run build 完成打包

而通过 npm run build 运行时，package.json 首先会在本地的 node_mudules 中寻找 webpack，找不到就找全局的

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    "build": "webpack"
},
```



本地安装 webpack，本地安装之后，通过 npm run build 就会优先在本地寻找 webpack，找不到就去全局找

本地安装主要解决项目不使用全局的 webpack，在本地安装之后配合 package.json 实现本地 webpack 版本的打包

```bash
npm install webpack@3.6.0 --save-dev
```

这里遇到错误的话，应该是 package.json 里面的 name 属性对应的是 webpack ，修改掉这个名字就好了



loader

之前说过，只是通过 webpack 打包很鸡肋，它其实还有更高级的操作

例如将 ES6 和 TypeScript 转化成 ES5，将 less scss 转化成 css，将 .vue 文件转化成 .js 文件等

那要实现这些功能，就需要用到 loader 了

loader 使用步骤：

- 通过 npm 安装
- 在 webpack.config.js 配置



例如这里使用 css-loader 和 style-loader

安装：npm install --save-dev css-loader

npm install --save-dev style-loader

配置：

```js
module:{
    rules:[
        {
            test:/\.css$/,
            // css-loader 只负责加载 css 文件
            // style-loader 负责将样式添加到 DOM 中生效
            use:['style-loader','css-loader']
        }
    ]
}
```



处理图片

- 安装：npm install --save-dev url-loader@1.1.2

- 配置：

  ```js
  {
      test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 图片小于 limit ，会被编译成 base64 字符串形式
              // 图片大于 linit ，会采用 file-loader 模块加载，此时图片会被打包进 dist 目录中并重新命名
              // 
              limit: 20000
            }
          }
        ]
  }
  ```

- 添加背景图片

  ```css
  body{
      background: url("../img/123.jpg");
  }
  ```

- 通过 npm run build 运行，在页面即可看到图片

针对图片大小大于 limit 指定的大小时，直接通过上面方式就会报错

此时在上一步的基础上，需要继续安装 file-loader，并进行相关配置

安装：npm install --save-dev file-loader@3.0.1

配置：

- 这里为什么配置？因为图片大于 limit 时，不再使用 url-loader，而是会使用 file-loader，此时图片会被打包到 dist 目录

  中，然后浏览器访问图片的那个样式会变成 background: url(xxxx.png)，相当于在项目路径下找这个图片，那肯定是找不到的呀

  为了让浏览器能找到，所以需要配置

- 在 webpack.config.js 中配置：

  ```js
  output:{
      path: path.resolve(__dirname,'dist'),
      filename: 'bundle.js',
          
      // 这里是在 output 中配置 publicPath，之后涉及到 url 的内容，都会在前面拼接上一个 dist
      // 这样，大一些的图片也可以加载了
      publicPath: 'dist/'
  }
  ```



修改图片名字：

在 webpack.config.js 中进行配置，修改大图片打包之后的图片名字

```js
{
    test: /\.(png|jpg|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 20000,
                    
                    // 在这里配置，生成的图片会在 dist/img 目录下，名字是图片名字.hash值前八位.图片后缀名
                    name: 'img/[name].[hash:8].[ext]'
                }
            }
        ]
}
```



配置 vue

安装：npm install --save vue

配置：

- 在 main.js 中引入 vue

  ```js
  import Vue from 'vue'
  
  const app = new Vue({
      el: '#app',
      data: {
          message: 'Hello,世界'
      }
  })
  ```

- 在 webpack.config.js 配置 vue

  ```js
  resolve:{
      alias:{
          // vue 从这个文件中加载
          'vue$':'vue/dist/vue.esm.js'
      }
  }
  ```

- 在 index.html 中使用，不需要引入 vue.js 了

  ```html
  <div id="app">
      <h2>{{message}}</h2>
  </div>
  ```

  

那之后总不能一直在 index.html 和 main.js 中写代码吧，不方便而且代码多了会很臃肿

于是就开始抽离，怎么抽离呢？

- 1.刚开始是把 index.html 中的内容全部写在 main.js 中

  实现方法就是：在 main.js 中定义一个组件，然后在 vue 实例中直接注册使用组件就好了

  ```js
  import Vue from 'vue'
  
  // 定义一个组件，完成之前 vue 实例中的代码
  const App = {
      template: `
  		<div>
  			<h2>{{message}}</h2>
  			<button @click='btn'>按钮</button>
  		</div>
  		`,
      data(){
          return{
              message: 'Hello,世界'
          }
      },
      methods:{
          btn(){
              console.log(this.message);
          }
      }
  }
  
  // 在 vue 实例中使用上面定义的组件
  new Vue({
      el: '#app',
      // 在页面中使用子组件
      template: '<App/>',
      // 注册子组件
      components:{
          App
      }
  })
  ```

- 2. index.html 是简洁了，但是 main.js 又变复杂了，下一步就是把 main.js 再变的简洁一些

     实现方法就是：将子组件再抽离出去，然后将子组件导出，在 main.js 中导入子组件

     子组件使用 .vue 文件，将页面展现(模板中的 html 代码)和数据(写在 data 那部分的 js 代码)分离

     ```vue
     <template>
     	<div>
         	<h2>{{message}}</h2>
         	<button @click='btn'>按钮</button>
         </div>
     </template>
     
     <script>
         export default{
             name: 'App',
             data(){
                 return{
                     message: 'Hello,世界'
                 }
             },
             methods:{
                 btn(){
                     console.log(this.message);
                 }
             }
         }
     
     </script>
     
     <style>
     </style>
     ```

     main.js 导入并修改之后

     ```js
     import Vue from 'vue'
     import App from '../vue/App.vue'
     
     new Vue({
     	el: '#app',
     	template: '<App/>',
     	components:{
     		App
     	}
     })
     ```

     此时还需要导入两个 loader 才行

     注意 vue 和 vue-template-compiler 版本保持一致(可以在 package.json 中查看版本信息)

     ```bash
     npm install --save-dev vue-loader vue-template-compiler
     ```

     在 webpack.config.js 中配置

     ```js
     // 引入这个模块
     const VueLoaderPlugin = require('vue-loader/lib/plugin')
     
     // 在 module 的 rules 中配置 vue-loader
     {
         test:/\.vue$/,
             use:['vue-loader']
     }
     
     // 在 module 同级引入这个插件，就是上面引入的模块
     plugins: [
         // 请确保引入这个插件！
         new VueLoaderPlugin()
     ]
     ```

     运行项目，打开网页查看结果

     ```bash
     npm run build
     ```

经历上面两个步骤，就可以在 vue 目录下创建 .vue 文件，然后在 App.vue 中导入使用

例如这里创建一个 MyView.vue

```vue
<template>
<div>
    <h2>{{name}}</h2>
    <h2>{{age}}</h2>
    </div>
</template>

<script>
    export default{
        name: 'MyView',
        data(){
            return{
                name:'刺客',
                age:18
            }
        },
        methods:{
            btn(){
                console.log(this.message);
            }
        }
    }

</script>

<style>
</style>
```

在 App.vue 中导入

```vue
<template>
	<div>
		<h2>{{message}}</h2>
		<button @click='btn'>按钮</button>
         <!-- 使用，注意大写要变成 -小写 -->
		<my-view></my-view>
	</div>
</template>

<script>
    // 导入
    import MyView from './MyView.vue'

    export default{
        name: 'App',
        // 注册
        components:{
            MyView
        },
        data(){
            return{
                message: 'Hello,世界'
            }
        },
        methods:{
            btn(){
                console.log(this.message);
            }
        }
    }
</script>
```



#### 10.4 Plugin

plugin 使用步骤：

- 安装插件
- 在 webpack.config.js 中配置

在文件头生成版权信息

在 webpack.config.js 中引入相关插件，并在其中的 plugins 中配置，然后打包发布之后

```js
const webpack = require('webpack')
...中间省略...
new webpack.BannerPlugin('最终版权归xx所有')
```



htmlWebpackPlugin

发布项目的时候，发布的是打包在 dist 文件夹中的内容，很显然没有 index.html

而我们都是通过 index.html 引入的 js 文件，index.html 都没有，那那些 js 文件也就没用了

所以发布的时候也需要把 index.html 文件打包到 dist 文件夹中

安装

```bash
npm install --save-dev html-webpack-plugin@3.2.0
```

配置

```js
const htmlwebpackplugin = require('html-webpack-plugin')
...中间省略...
new htmlwebpackplugin()
```

运行

```bash
npm run build
```

结果：dist 目录下会生成 index.html 文件，并自动引入 bundle.js





uglifyjs-webpack-plugin

压缩打包后的 js 代码

安装

```bash
npm install --save-dev uglifyjs-webpack-plugin@1.1.1
```

配置

```js
const uglifyjswebpackplugin = require('uglifyjs-webpack-plugin')
...中间省略...
new uglifyjswebpackplugin()
```

运行

```bash
npm run build
```

结果：bundle.js 已经被压缩了，同时，BannerPlugin 注释的内容也会被删掉



#### 10.5、搭建本地服务器

实现"伪·热部署"

安装 npm install --save-dev webpack-dev-server@2.9.3

配置 在 webpack.config.js 中 module 的同级下配置

```js
devServer:{
    contentBase: './dist',
    inline:true
}
```







### 11、混入

Mixin：对于 data 和 methods 中定义的内容，如果混入和组件同名，优先选择组件中定义的内容

```vue
<div id="app">
    <h2>{{message}}</h2>
    <h2>{{name}}</h2>
    <h2>{{age}}</h2>
    <h2>{{author}}</h2>
</div>

<script src="../resources/vue.js"></script>
<script>
    let mixin = {
        data() {
            return {
                message: 'Hello,Mixin',
                name: 'Mr.z',
                age: '20'
            }
        },
        methods:{
            show(){
                console.log(this.message,this.name,this.age)
            },
            showInfo(){
                console.log("Haha~")
            }
        }
    }

    let app = new Vue({
        el:'#app',
        // 注册混入
        mixins:[mixin],
        data:{
            message: 'Hello,Vue',
            author: 'zxd'
        },
        created(){
            this.show();
            this.showInfo();
        },
        methods:{
            show(){
                console.log(this.message,this.author)
            }
        }
    })
</script>
```



生命钩子函数：同名时，两者地生命周期钩子函数会被合并为数组，同时混入先调用，组件后调用

```vue
<div id="app">
</div>

<script src="../resources/vue.js"></script>
<script>
    let mixin = {
        created(){
            console.log("Mixin,created~")
        }
    }

    let app = new Vue({
        el:'#app',
        mixins:[mixin],
        created(){
            console.log("Vue,created~")
        },
        mounted() {
            console.log("Vue,mounted~")
        }
    })
</script>
```
### 12、如何在vue中同时使用某插件的两个不同版本

以d3.js举例

```bash
npm install d3v3@npm:d3@3.5.17 --save-dev
npm install d3v4@npm:d3@4.13.0 --save-dev
```

```js
import * as d3v3 from 'd3v3'
import * as d3v4 from 'd3v4'
```