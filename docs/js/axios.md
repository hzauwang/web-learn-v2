!!!note
    [开放API网站](https://api.apiopen.top/swagger/index.html)


## 基本使用

```js
const btns = document.querySelectorAll('button')

btns[1].addEventListener('click', function() {
  axios({
    method: 'POST',
    url: 'http://127.0.0.1:8888/json-server',
    data: {
      title: 'wang',
      age: 18
    }
  }).then(response => {
    console.log(response)
  })
})
```

```js
axios.post('http://localhost:8888/json-server', {
  title: 'wang'
}).then(response => {
  console.log(response.data)
})
```

## 配置对象

### 请求配置
```js
axios.request({
  method: 'POST',
  url: 'http://127.0.0.1:8888/json-server',
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    title: 'wang'
  },
  data: {
    age: 18
  },
  // `headers` 是即将被发送的自定义请求头
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function(data, headers) {
    console.log('transformRequest', data)
    console.log('transformRequest', headers)
  }],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function(data) {
    console.log('transformResponse', data)
    return data
  }],
  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  /* paramsSerializer: function(params) {
    
  }, */
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求花费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default
  // 具体配置可以查看http://www.axios-js.com/zh-cn/docs/
}).then(response => {
  console.log(response)
})
```

### 响应结构

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

   // `config` 是为请求提供的配置信息
  config: {},
 // 'request'
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
```

### 全局的默认值

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.timeout = 3000
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

## 创建实例对象

```js
//创建实例对象
const axiosTest = axios.create({
  baseURL: 'https://api.apiopen.top/api',
  timeout: 2000
})
// 功能与axios对象的功能基本是一样的
axiosTest({
  url: '/sentences'
}).then(response => {
  console.log(response.data)
})
```

## axios拦截器

```js
// 请求拦截器
// config 配置对象
axios.interceptors.request.use(function(config) {
  console.log('请求拦截器 成功 - 1')
  config.params = { a: 100 } // 修改配置
  config.timeout = 2000
  return config
}, function(error) {
  console.log('请求拦截器 失败 - 1')
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function(response) {
  console.log('响应拦截器 成功 - 1')
  return response.data // 直接返回数据
}, function(error) {
  console.log('响应拦截器 失败 - 1')
  return Promise.reject(error)
})

axios({
  method: 'GET',
  url: '/sentences',
  baseURL: 'https://api.apiopen.top/api'
}).then(response => {
  console.log(response)
})
```

## 取消请求

```js
let cancel = null

btns[0].addEventListener('click', function() {
  // 检测上一次的请求是否完成
  cancel !== null ? cancel() : undefined

  axios({
    method: 'GET',
    url: '/json-server',
    baseURL: 'http://localhost:8888',
    // 添加属性
    cancelToken: new axios.CancelToken(function executor (c) {
      // 将c赋值给cancel
      cancel = c
    })
  }).then(response => {
    // cancel初始化
    cancel = null
    console.log(response.data.result)
  })
})
```

## 源码

### axios对象创建过程

```js
//构造函数
function Axios (config) {
  //初始化
  this.defaults = config;//为了创建 default 默认属性
  this.intercepters = {
    request: {},
    response: {}
  }
}
//原型添加相关的方法
Axios.prototype.request = function(config) {
  console.log('发送 AJAX 请求 请求的类型为 ' + config.method);
}
Axios.prototype.get = function(config) {
  return this.request({ method: 'GET' });
}
Axios.prototype.post = function(config) {
  return this.request({ method: 'POST' });
}

//声明函数
function createInstance (config) {
  //实例化一个对象
  let context = new Axios(config);// context.get()  context.post()  但是不能当做函数使用 context() X
  //创建请求函数
  let instance = Axios.prototype.request.bind(context);// instance 是一个函数 并且可以 instance({})  此时 instance 不能 instance.get X
  //将 Axios.prototype 对象中的方法添加到instance函数对象中
  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context);// this.default  this.interceptors
  });
  //为 instance 函数对象添加属性 default 与 interceptors
  Object.keys(context).forEach(key => {
    instance[key] = context[key];
  });
  return instance;
}

let axios = createInstance();
//发送请求
// axios({method:'POST'});
axios.get({});
axios.post({});
```

### 模拟实现axios发送请求

```js
// axios 发送请求   axios  Axios.prototype.request  bind
//1. 声明构造函数
function Axios(config){
    this.config = config;
}
Axios.prototype.request = function(config){
    //发送请求
    //创建一个 promise 对象
    let promise = Promise.resolve(config);
    //声明一个数组
    let chains = [dispatchRequest, undefined];// undefined 占位
    //调用 then 方法指定回调
    let result = promise.then(chains[0], chains[1]);
    //返回 promise 的结果
    return result;
}

//2. dispatchRequest 函数
function dispatchRequest(config){
    //调用适配器发送请求
    return xhrAdapter(config).then(response => {
        //响应的结果进行转换处理
        //....
        return response;
    }, error => {
        throw error;
    });
}

//3. adapter 适配器
function xhrAdapter(config){
  console.log('xhrAdapter 函数执行');
  return new Promise((resolve, reject) => {
    //发送 AJAX 请求
    let xhr = new XMLHttpRequest();
    //初始化
    xhr.open(config.method, config.url);
    //发送
    xhr.send();
    //绑定事件
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        //判断成功的条件
        if(xhr.status >= 200 && xhr.status < 300){
          //成功的状态
          resolve({
              //配置对象
              config: config,
              //响应体
              data: xhr.response,
              //响应头
              headers: xhr.getAllResponseHeaders(), //字符串  parseHeaders
              // xhr 请求对象
              request: xhr,
              //响应状态码
              status: xhr.status,
              //响应状态字符串
              statusText: xhr.statusText
          });
        }else{
          //失败的状态
          reject(new Error('请求失败 失败的状态码为' + xhr.status));
        }
      }
    }
  });
}


//4. 创建 axios 函数
let axios = Axios.prototype.request.bind(null);
axios({
    method:'GET',
    url:'http://localhost:3000/posts'
}).then(response => {
    console.log(response);
});
```

### axios拦截器原理

```js
//构造函数
function Axios (config) {
  this.config = config;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  }
}
//发送请求  难点与重点
Axios.prototype.request = function(config) {
  //创建一个 promise 对象
  let promise = Promise.resolve(config);
  //创建一个数组
  const chains = [dispatchRequest, undefined];
  //处理拦截器
  //请求拦截器 将请求拦截器的回调 压入到 chains 的前面  request.handles = []
  this.interceptors.request.handlers.forEach(item => {
    chains.unshift(item.fulfilled, item.rejected);
  });
  //响应拦截器
  this.interceptors.response.handlers.forEach(item => {
    chains.push(item.fulfilled, item.rejected);
  });

  // console.log(chains);
  //遍历
  while (chains.length > 0) {
    promise = promise.then(chains.shift(), chains.shift());
  }

  return promise;
}

//发送请求
function dispatchRequest (config) {
  //返回一个promise 队形
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      statusText: 'OK'
    });
  });
}

//创建实例
let context = new Axios({});
//创建axios函数
let axios = Axios.prototype.request.bind(context);
//将 context 属性 config interceptors 添加至 axios 函数对象身上
Object.keys(context).forEach(key => {
  axios[key] = context[key];
});

//拦截器管理器构造函数
function InterceptorManager () {
  this.handlers = [];
}
InterceptorManager.prototype.use = function(fulfilled, rejected) {
  this.handlers.push({
    fulfilled,
    rejected
  })
}


//以下为功能测试代码
// 设置请求拦截器  config 配置对象
axios.interceptors.request.use(function one (config) {
  console.log('请求拦截器 成功 - 1号');
  return config;
}, function one (error) {
  console.log('请求拦截器 失败 - 1号');
  return Promise.reject(error);
});

axios.interceptors.request.use(function two (config) {
  console.log('请求拦截器 成功 - 2号');
  return config;
}, function two (error) {
  console.log('请求拦截器 失败 - 2号');
  return Promise.reject(error);
});

// 设置响应拦截器
axios.interceptors.response.use(function(response) {
  console.log('响应拦截器 成功 1号');
  return response;
}, function(error) {
  console.log('响应拦截器 失败 1号')
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
  console.log('响应拦截器 成功 2号')
  return response;
}, function(error) {
  console.log('响应拦截器 失败 2号')
  return Promise.reject(error);
});


//发送请求
axios({
  method: 'GET',
  url: 'http://localhost:3000/posts'
}).then(response => {
  console.log(response);
});
```

### axios 取消请求工作

```js
//构造函数
function Axios (config) {
  this.config = config;
}
//原型 request 方法
Axios.prototype.request = function(config) {
  return dispatchRequest(config);
}
//dispatchRequest 函数
function dispatchRequest (config) {
  return xhrAdapter(config);
}
//xhrAdapter
function xhrAdapter (config) {
  //发送 AJAX 请求
  return new Promise((resolve, reject) => {
    //实例化对象
    const xhr = new XMLHttpRequest();
    //初始化
    xhr.open(config.method, config.url);
    //发送
    xhr.send();
    //处理结果
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        //判断结果
        if (xhr.status >= 200 && xhr.status < 300) {
          //设置为成功的状态
          resolve({
            status: xhr.status,
            statusText: xhr.statusText
          });
        } else {
          reject(new Error('请求失败'));
        }
      }
    }
    //关于取消请求的处理
    if (config.cancelToken) {
      //对 cancelToken 对象身上的 promise 对象指定成功的回调
      config.cancelToken.promise.then(value => {
        xhr.abort();
        //将整体结果设置为失败
        reject(new Error('请求已经被取消'))
      });
    }
  })
}

//创建 axios 函数
const context = new Axios({});
const axios = Axios.prototype.request.bind(context);

//CancelToken 构造函数
function CancelToken (executor) {
  //声明一个变量
  var resolvePromise;
  //为实例对象添加属性
  this.promise = new Promise((resolve) => {
    //将 resolve 赋值给 resolvePromise
    resolvePromise = resolve
  });
  //调用 executor 函数
  executor(function() {
    //执行 resolvePromise 函数
    resolvePromise();
  });
}

//获取按钮 以上为模拟实现的代码
const btns = document.querySelectorAll('button');
//2.声明全局变量
let cancel = null;
//发送请求
btns[0].onclick = function() {
  //检测上一次的请求是否已经完成
  if (cancel !== null) {
    //取消上一次的请求
    cancel();
  }

  //创建 cancelToken 的值
  let cancelToken = new CancelToken(function(c) {
    cancel = c;
  });

  axios({
    method: 'GET',
    url: 'http://localhost:3000/posts',
    //1. 添加配置对象的属性
    cancelToken: cancelToken
  }).then(response => {
    console.log(response);
    //将 cancel 的值初始化
    cancel = null;
  })
}

//绑定第二个事件取消请求
btns[1].onclick = function() {
  cancel();
}
```