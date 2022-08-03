## util.promisify方法进行promise风格转换

node.js环境

```js
const util = require('util')
const fs = require('fs')

let mineReadFile = util.promisify(fs.readFile)

mineReadFile('./infile.txt').then(value => {
  console.log(value)
})
```

## 封装Ajax请求

```js
function sendAJAX(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', url)
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
  })
}

sendAJAX('https://api.apiopen.top/api/sentences').then(
  (value) => {
    console.log(value)
  },
  (error) => {
    console.log(error)
  }
)
```

## Promise状态

实例中的一个属性 PromiseState

* pending 未决定
* resolved/fullfilled 成功
* rejected 失败

!!!note
    除了resolve和reject可以改变promise的状态之外，throw也可以改变

## Promise对象的值

PromiseResult

对象成功或失败的结果

* resolve
* reject

## Promise 函数对象的方法

### Promise.resolve

```js
// 传入的参数为非Promise类型的对象，则返回的结果为成功的promise对象
let p1 = Promise.resolve(521)
console.log(p1)
// 传入的参数为promise对象，则参数的结果决定resolve的结果
let p2 = Promise.resolve(new Promise((resolve, reject) => {
  resolve(123)
}))
console.log(p2)
```

### Promise.reject

```js
// 无论传入的参数是什么，返回的都是失败的promise对象
let p = Promise.reject(512)
console.log(p)
```

### Promise.all

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('OK1')
  }, 1000);
})
let p2 = Promise.resolve('error')
let p3 = Promise.resolve('OK3')

const result = Promise.all([p1, p2, p3])

console.log(result)
```

### Promise.race

```js
// 谁先改变状态，就返回谁的结果
let p1 = new Promise((resolve, reject) => {
  resolve('OK1')
})
let p2 = Promise.resolve('error')
let p3 = Promise.resolve('OK3')

const result = Promise.race([p1, p2, p3])

console.log(result)
```

## 如何中断promise链

```js
let p1 = Promise.resolve('error')

p1.then((value) => {
  console.log(111)
}).then((value) => {
  console.log(222)
  // 返回一个pending状态的promise对象，因为状态没有改变，后续代码都无法执行
  return new Promise(() => {})
}).then(value => {
  console.log(333)
}).catch(error => {
  console.log('err')
})
```

## 自定义Promise

### 定义整体结构

```js
function Promise(executor) {
  
}

Promise.prototype.then = function(onResolved, onRejected) {
  
}
```

### resolve与reject结构搭建

```js
function Promise (executor) {

  function resolve (data) {}

  function reject(data) {}
  
  executor(resolve, reject)
}

Promise.prototype.then = function(onResolved, onRejected) {
  
}
```

### resolve与reject代码实现

```js
function Promise (executor) {
  this.promiseState = 'pending'
  this.promiseResult = null

  const self = this

  function resolve (data) {
    self.promiseState = 'fullfilled'
    self.promiseResult = data
  }

  function reject (data) {
    self.promiseState = 'rejected'
    self.promiseResult = data
  }
  
  executor(resolve, reject)
}

Promise.prototype.then = function(onResolved, onRejected) {
  
}
```

### throw抛出异常改变状态

```js
function Promise (executor) {
  this.promiseState = 'pending'
  this.promiseResult = null

  const self = this

  function resolve (data) {
    self.promiseState = 'fullfilled'
    self.promiseResult = data
  }

  function reject (data) {
    self.promiseState = 'rejected'
    self.promiseResult = data
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  
}
```

### promise对象状态只能改变一次

```js
function Promise (executor) {
  this.promiseState = 'pending'
  this.promiseResult = null

  const self = this

  function resolve (data) {
    if(self.promiseState !== 'pending') return
    self.promiseState = 'fullfilled'
    self.promiseResult = data
  }

  function reject (data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'rejected'
    self.promiseResult = data
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  
}
```

### then 方法执行回调

```js
function Promise (executor) {
  this.promiseState = 'pending'
  this.promiseResult = null

  const self = this

  function resolve (data) {
    if(self.promiseState !== 'pending') return
    self.promiseState = 'fullfilled'
    self.promiseResult = data
  }

  function reject (data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'rejected'
    self.promiseResult = data
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  if (this.promiseState === 'fullfilled') {
    onResolved(this.promiseResult)
  } else if (this.promiseState === 'rejected') {
    onRejected(this.promiseResult)
  }
}
```

### 异步任务回调的执行

```js
function Promise (executor) {
  this.promiseState = 'pending'
  this.promiseResult = null
  this.callback = null

  const self = this

  function resolve (data) {
    if(self.promiseState !== 'pending') return
    self.promiseState = 'fullfilled'
    self.promiseResult = data
    if (this.callback.onResolved) {
      this.callback.onResolved(data)
    }
  }

  function reject (data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'rejected'
    self.promiseResult = data
    if (this.callback.onRejected) {
      this.callback.onRejected(data)
    }
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  if (this.promiseState === 'fullfilled') {
    onResolved(this.promiseResult)
  } else if (this.promiseState === 'rejected') {
    onRejected(this.promiseResult)
  } else if (this.promiseState === 'pending') {
    this.callback = {
      onResolved,
      onRejected
    }
  }
}
```

### 指定多个回调的实现

```js
function Promise (executor) {
  this.promiseState = 'pending'
  this.promiseResult = null
  this.callbacks = []

  const self = this

  function resolve (data) {
    if(self.promiseState !== 'pending') return
    self.promiseState = 'fullfilled'
    self.promiseResult = data
    self.callbacks.forEach(callback => {
      if (callback.onResolved) {
        callback.onResolved(data)
      }
    })
  }

  function reject (data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'rejected'
    self.promiseResult = data
    self.callbacks.forEach((callback) => {
      if (callback.onRejected) {
        callback.onRejected(data)
      }
    })
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  if (this.promiseState === 'fullfilled') {
    onResolved(this.promiseResult)
  } else if (this.promiseState === 'rejected') {
    onRejected(this.promiseResult)
  } else if (this.promiseState === 'pending') {
    this.callbacks.push({
      onResolved,
      onRejected
    })
  }
}
```

### 同步修改状态then方法结果返回

```js
function Promise (executor) {
  this.promiseState = 'pending'
  this.promiseResult = null
  this.callbacks = []

  const self = this

  function resolve (data) {
    if(self.promiseState !== 'pending') return
    self.promiseState = 'fullfilled'
    self.promiseResult = data
    self.callbacks.forEach((callback) => {
      if (callback.onResolved) {
        callback.onResolved(data)
      }
    })
  }

  function reject (data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'rejected'
    self.promiseResult = data
    self.callbacks.forEach((callback) => {
      if (callback.onRejected) {
        callback.onRejected(data)
      }
    })
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  return new Promise((resolve, reject) => {
    if (this.promiseState === 'fullfilled') {
      try {
        let result = onResolved(this.promiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (r) => {
              reject(r)
            }
          )
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    } else if (this.promiseState === 'rejected') {
      onRejected(this.promiseResult)
    } else if (this.promiseState === 'pending') {
      this.callbacks.push({
        onResolved,
        onRejected
      })
    }
  })
}
```

### 异步修改状态then方法结果返回

```js
function Promise (executor) {
  this.promiseState = 'pending'
  this.promiseResult = null
  this.callbacks = []

  const self = this

  function resolve (data) {
    if(self.promiseState !== 'pending') return
    self.promiseState = 'fullfilled'
    self.promiseResult = data
    self.callbacks.forEach((callback) => {
      if (callback.onResolved) {
        callback.onResolved(data)
      }
    })
  }

  function reject (data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'rejected'
    self.promiseResult = data
    self.callbacks.forEach((callback) => {
      if (callback.onRejected) {
        callback.onRejected(data)
      }
    })
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  const self = this
  return new Promise((resolve, reject) => {
    if (this.promiseState === 'fullfilled') {
      try {
        let result = onResolved(this.promiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (r) => {
              reject(r)
            }
          )
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    } else if (this.promiseState === 'rejected') {
      onRejected(this.promiseResult)
    } else if (this.promiseState === 'pending') {
      this.callbacks.push({
        onResolved: function() {
          try {
            let result = onResolved(self.promiseResult)
            if (result instanceof Promise) {
              result.then(
                (v) => {
                  resolve(v)
                },
                (r) => {
                  reject(r)
                }
              )
            } else {
              resolve(result)
            }
          } catch (e) {
            reject(e)
          }
        },
        onRejected: function() {
          try {
            let result = onRejected(self.promiseResult)
            if (result instanceof Promise) {
              result.then(
                (v) => {
                  resolve(v)
                },
                (r) => {
                  reject(r)
                }
              )
            } else {
              resolve(result)
            }
          } catch (e) {
            reject(e)
          }
        }
      })
    }
  })
}
```

### then方法完善和优化

```js
function Promise(executor) {
  this.promiseState = 'pending'
  this.promiseResult = null
  this.callbacks = []

  const self = this

  function resolve(data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'fullfilled'
    self.promiseResult = data
    self.callbacks.forEach((callback) => {
      if (callback.onResolved) {
        callback.onResolved(data)
      }
    })
  }

  function reject(data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'rejected'
    self.promiseResult = data
    self.callbacks.forEach((callback) => {
      if (callback.onRejected) {
        callback.onRejected(data)
      }
    })
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        let result = type(self.promiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (r) => {
              reject(r)
            }
          )
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }
    if (this.promiseState === 'fullfilled') {
      callback(onResolved)
    } else if (this.promiseState === 'rejected') {
      callback(onRejected)
    } else if (this.promiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}
```

### catch

```js
function Promise(executor) {
  this.promiseState = 'pending'
  this.promiseResult = null
  this.callbacks = []

  const self = this

  function resolve(data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'fullfilled'
    self.promiseResult = data
    self.callbacks.forEach((callback) => {
      if (callback.onResolved) {
        callback.onResolved(data)
      }
    })
  }

  function reject(data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'rejected'
    self.promiseResult = data
    self.callbacks.forEach((callback) => {
      if (callback.onRejected) {
        callback.onRejected(data)
      }
    })
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  if (typeof onResolved !== 'function') {
    onResolved = (value) => value
  }
  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason
    }
  }
  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        let result = type(self.promiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (r) => {
              reject(r)
            }
          )
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }
    if (this.promiseState === 'fullfilled') {
      callback(onResolved)
    } else if (this.promiseState === 'rejected') {
      callback(onRejected)
    } else if (this.promiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
```

### resolve方法

```js
Promise.resolve = function(value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(v => {
        resolve(v)
      }, e => {
        reject(e)
      })
    } else {
      resolve(value)
    }
  })
}
```

### reject方法

```js
Promise.reject = function(value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}
```

### all方法

```js
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let count = 0
    let arr = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => {
        count++
        arr[i] = value
        if (count === promises.length) {
          resolve(arr)
        }
      }, error => {
        reject(error)
      })
    }
  })
}
```

### race方法

```js
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => {
        resolve(value)
      }, error => {
        reject(error)
      })
    }
  })
}
```

### then方法回调函数是异步执行

```js
function Promise(executor) {
  this.promiseState = 'pending'
  this.promiseResult = null
  this.callbacks = []

  const self = this

  function resolve(data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'fullfilled'
    self.promiseResult = data
    self.callbacks.forEach((callback) => {
      if (callback.onResolved) {
        setTimeout(() => {
          callback.onResolved(data)
        })
      }
    })
  }

  function reject(data) {
    if (self.promiseState !== 'pending') return
    self.promiseState = 'rejected'
    self.promiseResult = data
    self.callbacks.forEach((callback) => {
      if (callback.onRejected) {
        setTimeout(() => {
          callback.onRejected(data)
        })
      }
    })
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(
        (v) => {
          resolve(v)
        },
        (e) => {
          reject(e)
        }
      )
    } else {
      resolve(value)
    }
  })
}

Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0
    let arr = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (value) => {
          count++
          arr[i] = value
          if (count === promises.length) {
            resolve(arr)
          }
        },
        (error) => {
          reject(error)
        }
      )
    }
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (value) => {
          resolve(value)
        },
        (error) => {
          reject(error)
        }
      )
    }
  })
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  if (typeof onResolved !== 'function') {
    onResolved = (value) => value
  }
  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason
    }
  }
  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        let result = type(self.promiseResult)
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v)
            },
            (r) => {
              reject(r)
            }
          )
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }
    if (this.promiseState === 'fullfilled') {
      callback(onResolved)
    } else if (this.promiseState === 'rejected') {
      callback(onRejected)
    } else if (this.promiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          setTimeout(() => {
            callback(onResolved)
          })
        },
        onRejected: function () {
          setTimeout(() => {
            callback(onRejected)
          })
        }
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
```

### class版本

```js
class Promise {
  constructor(executor) {
    this.promiseState = 'pending'
    this.promiseResult = null
    this.callbacks = []

    const self = this

    function resolve(data) {
      if (self.promiseState !== 'pending') return
      self.promiseState = 'fullfilled'
      self.promiseResult = data
      self.callbacks.forEach((callback) => {
        if (callback.onResolved) {
          setTimeout(() => {
            callback.onResolved(data)
          })
        }
      })
    }

    function reject(data) {
      if (self.promiseState !== 'pending') return
      self.promiseState = 'rejected'
      self.promiseResult = data
      self.callbacks.forEach((callback) => {
        if (callback.onRejected) {
          setTimeout(() => {
            callback.onRejected(data)
          })
        }
      })
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(
          (v) => {
            resolve(v)
          },
          (e) => {
            reject(e)
          }
        )
      } else {
        resolve(value)
      }
    })
  }

  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value)
    })
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      let count = 0
      let arr = []
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (value) => {
            count++
            arr[i] = value
            if (count === promises.length) {
              resolve(arr)
            }
          },
          (error) => {
            reject(error)
          }
        )
      }
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (value) => {
            resolve(value)
          },
          (error) => {
            reject(error)
          }
        )
      }
    })
  }

  then(onResolved, onRejected) {
    const self = this
    if (typeof onResolved !== 'function') {
      onResolved = (value) => value
    }
    if (typeof onRejected !== 'function') {
      onRejected = (reason) => {
        throw reason
      }
    }
    return new Promise((resolve, reject) => {
      function callback(type) {
        try {
          let result = type(self.promiseResult)
          if (result instanceof Promise) {
            result.then(
              (v) => {
                resolve(v)
              },
              (r) => {
                reject(r)
              }
            )
          } else {
            resolve(result)
          }
        } catch (e) {
          reject(e)
        }
      }
      if (this.promiseState === 'fullfilled') {
        callback(onResolved)
      } else if (this.promiseState === 'rejected') {
        callback(onRejected)
      } else if (this.promiseState === 'pending') {
        this.callbacks.push({
          onResolved: function () {
            setTimeout(() => {
              callback(onResolved)
            })
          },
          onRejected: function () {
            setTimeout(() => {
              callback(onRejected)
            })
          }
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
}
```

## async和await

### async

```js
async function main() {
  // 1. 返回值是非promise类型的数据
  // return 123
  // 2. 返回的是一个promise对象
  /* return new Promise((resolve, reject) => {
    reject('error')
  }) */
  // 3. 抛出异常
  throw 'error'
}

let res = main()
console.log(res)
```

### await

```js
async function main() {
  let p = new Promise((resolve, reject) => {
    resolve('123')
  })
  // 1. await后是promise
  let res = await p
  // 2. await后是其他类型的数据
  let res2 = await 20
  // 3. promise是失败的
  try {
    let res3 = await Promise.reject('error')
  } catch (e) {
    console.log('##', e)
  }
}
main()
```

### async和await发送Ajax请求

```js
function sendAJAX(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', url)
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
  })
}

let btn = document.querySelector('button')
btn.addEventListener('click', async function() {
  let res = await sendAJAX('https://api.apiopen.top/api/sentences')
  console.log(res)
})
```