## commonJS 模块化

- Node中，一个js文件就是一个模块  
- Node中，每个js文件中的js代码都是独立运行在一个函数中  
- Node在执行模块中的代码时，使用<code>function (exports, require, module, __filename, __dirname){}</code>将代码包装起来，在函数执行时，传递进了5个实参  
    - exports, 将变量或函数暴露到外部
    - require，引入外部的模块
    - module，当前模块，exports是module的属性，所以可以使用exports导出，也可以使用module.exports导出
    - __filename, 当前模块的绝对路径
    - __dirname, 当前模块的所在目录名


!!!note
    通过exports只能使用 . 的方式向外暴露变量, module.exports既可以通过 . , 也可以直接赋值。


```js
/* module1.js */
// 暴露
module.exports = {
  a: 10,
  b: '123',
  say() {
    console.log('hello')
  }
}
```
```js
/* module2.js */
// 引入
const m1 = require('./module1')
m1.say()
```

## 包

commonJS的包由包结构和包描述文件组成  

- 包结构，用于组织包中的文件
    - ***package.json 描述文件***
    - bin 可执行二进制文件
    - lib js代码
    - doc 文档
    - test 单元测试
- 包描述文件，描述包的相关信息，供外部读取分析

## npm(Node Package Manager) 

- npm search 包名, 搜索模块包
- npm init -yes, 初始化
- npm install/i 包名, 当前目录下安装
- npm install/i 包名 -g, 全局目录下安装
- npm install/i 包名 --save, 添加到依赖中(目前--save是默认选项)
- npm install, 下载当前项目所依赖的包
- npm remove/r 包名，移除包

!!!note
    配置cnpm  
    npm install -g cnpm --registry=https://registry.npmmirror.com  
    cnpm install [name]

node在使用模块名字引入模块时，首先在当前目录的node_modules中找，没有的话则去上一级目录的node_modules中找，直到找到根目录为止。

## Buffer缓冲区

- Buffer的结构和数组很像，操作方法也类似  
- 数组中不能存储二进制文件
- buffer中存储的都是二进制数据, 但是显示时是以16进制显示的, buffer中的每一个元素的范围是00-ff
- buffer的大小一旦确定，无法修改

```js
let str = 'Hello World!'
// 将字符串保存到buffer中
let buf = Buffer.from(str)
console.log(buf) // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>
console.log(buf.length) // 内存大小(字节)
console.log(buf.toString()) // Hello World!

// Buffer.alloc创建指定大小的buffer
let buf2 = Buffer.alloc(10) // 10字节
buf2[0] = 88
buf2[1] = 255
buf2[2] = 0xaa
console.log(buf2[2].toString(16)) // aa

// Buffer.allocUnsafe创建指定大小的buffer,性能好但是buffer中可能含有敏感数据

let buf3 = Buffer.allocUnsafe(10)

console.log(buf3)
```

## 同步文件写入

```js
//使用文件系统，需要引入fs模块
const fs = require('fs')

/* 
  同步打开文件 fs.openSync(path[, flags[, mode]])
  flags: r, w, a
  mode: 文件操作权限
*/
let fd = fs.openSync('hello.txt', 'w')

/* 
  同步写入文件 fs.writeSync(fd, buffer[, offset[, length[, position]]])
  fd: 文件描述符
*/
fs.writeSync(fd, 'Hello World!')

/* 
  关闭文件 fs.closeSync(fd)
*/
fs.closeSync(fd)
```

## 异步文件写入

```js
const fs = require('fs')

// step1
fs.open('hello.txt', 'w', function (err, fd) {
  /* 
    [Arguments] { '0': null, '1': 3 }
    第一个为错误对象, 没有则为null
    第二个为fd
  */
  if (!err) {
    // step2
    fs.write(fd, 'Hello World!', function (err) {
      if (!err) {
        console.log('写入成功')
      }
      // step3
      fs.close(fd, function (err) {
        if (!err) {
          console.log('文件已关闭')
        }
      })
    })
  }
})
```

## 简单文件写入

```js
const fs = require('fs')

fs.writeFile('hello.txt', 'Hello World!', function (err) {
  if (!err) {
    console.log('写入成功')
  }
})

fs.writeFileSync('hello.txt', 'Hello World!')
```

## 流式文件写入

之前的几种文件写入方法不适用大文件的写入，性能差，容易导致内存溢出

```js
const fs = require('fs')

// 创建可写流
let ws = fs.createWriteStream('hello.txt')

// 通过监听流的open和close事件来监听流的打开和关闭
ws.once('open', function () {
  console.log('流打开了')
})
ws.once('close', function () {
  console.log('流关闭了')
})

// 向文件中输入内容
ws.write('Hello World1!')
ws.write('Hello World2!')
ws.write('Hello World3!')

ws.end()
```

## 简单文件读取

```js
const fs = require('fs')

fs.readFile('hello.txt', function (err, data) {
  if (err) {
    throw err
  }
  console.log(data) // 返回值是Buffer
})

fs.readFileSync('hello.txt')
```

## 流式文件读取

```js
const fs = require('fs')

let rs = fs.createReadStream('hello.txt')

rs.once('open', function () {
  console.log('打开')
})

rs.once('close', function () {
  console.log('关闭')
})

/* 
rs.on('data', function (data) {
  // 大文件会分多次读出
  console.log(data)
}) 
*/

let ws = fs.createWriteStream('hello2.txt')
rs.pipe(ws) // 直接将可读流传到可写流
```

## fs的其他操作

```js
const fs = require('fs')

// 检查文件是否存在
fs.existsSync('hello.txt')

// 获取文件状态
fs.stat('hello.txt', function (err, stat) {
  if (!err) {
    /* 
    stat.
      size 文件大小
      isFile() 是否是一个文件
      isDirectoty() 是否是目录
    */
    console.log(stat.size)
  }
})

// 删除文件
fs.unlinkSync('hello.txt')

// 读取目录中的结构
fs.readdir('.', function (err, files) {
  if (!err) {
    console.log(files) // [ 'js', 'package.json' ]
  }
})

// 截断文件,将文件改变为指定大小
fs.truncateSync('hello.txt', 10) //文件为10个字节

// 创建目录
fs.mkdirSync('hello')

// 删除目录
fs.rmdirSync('hello')

// 重命名文件, 也可以剪切
fs.renameSync('oldFile', 'mewFile')

// 监视文件的修改
fs.watchFile('hello.txt', function (curr, prev) {
  /* 
    curr当前文件的状态
    prev修改前文件的状态
  */
  console.log('修改前文件大小: ' + prev.size)
  console.log('修改后文件大小: ' + curr.size)
})
```