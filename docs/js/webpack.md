## 基本使用

### 资源目录
```
webpack_code # 项目根目录（所有指令必须在这个目录运行）
    └── src # 项目源码目录
        ├── js # js文件目录
        │   ├── count.js
        │   └── sum.js
        └── main.js # 项目主文件
```

### 创建文件

- count.js
    ```js
    export default function count(x, y) {
      return x - y;
    }
    ```
- sum.js
    ```js
    export default function sum(...args) {
      return args.reduce((p, c) => p + c, 0);
    }
    ```
- main.js
    ```js
    import count from "./js/count";
    import sum from "./js/sum";

    console.log(count(2, 1));
    console.log(sum(1, 2, 3, 4));
    ```

### 下载依赖

<code>npm init -y</code>  
<code>npm i webpack webpack-cli -D</code>

### 启用 Webpack

开发模式  
<code>npx webpack ./src/main.js --mode=development</code>  
生产模式  
<code>npx webpack ./src/main.js --mode=production</code>

## 基本配置

在项目根目录下新建文件：<code>webpack.config.js</code>  

```js
// Node.js的核心模块，专门用来处理文件路径
const path = require("path")

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/main.js",
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "dist"),
    // filename: 输出文件名
    filename: "main.js",
  },
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development", // 开发模式
}
```

## 处理样式资源

### 处理css资源

#### 1. 下载包

<code>npm i css-loader style-loader -D</code>

#### 2. 配置

```js
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [],
  mode: "development",
};
```

### 处理less资源

<code> npm install less less-loader --save-dev</code>

```js
const path = require('path') // nodejs模块，处理路径问题

module.exports = {
  // 入口
  entry: './src/main.js',
  // 输出
  output: {
    // 文件的输出路径，需要绝对路径
    // __dirname nodejs的变量，代表当前文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 文件名
    filename: 'main.js'
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/i, // 只检测.css文件
        use: ['style-loader', 'css-loader'] // 执行顺序为从右向左
      },
      {
        test: /\.less$/,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // plugins的配置
  ],
  // 模式
  mode: 'development'
}
```

### 处理sass、scss资源

<code>npm i sass-loader sass -D</code>  

```js
const path = require('path') // nodejs模块，处理路径问题

module.exports = {
  // 入口
  entry: './src/main.js',
  // 输出
  output: {
    // 文件的输出路径，需要绝对路径
    // __dirname nodejs的变量，代表当前文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 文件名
    filename: 'main.js'
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/i, // 只检测.css文件
        use: ['style-loader', 'css-loader'] // 执行顺序为从右向左
      },
      {
        test: /\.less$/,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // compiles sass,scss to CSS
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // plugins的配置
  ],
  // 模式
  mode: 'development'
}
```

### 处理Styl 资源

<code>npm install stylus stylus-loader --save-dev</code>  

```js
const path = require('path') // nodejs模块，处理路径问题

module.exports = {
  // 入口
  entry: './src/main.js',
  // 输出
  output: {
    // 文件的输出路径，需要绝对路径
    // __dirname nodejs的变量，代表当前文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 文件名
    filename: 'main.js'
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/i, // 只检测.css文件
        use: ['style-loader', 'css-loader'] // 执行顺序为从右向左
      },
      {
        test: /\.less$/,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader' // compiles stylus to CSS
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // plugins的配置
  ],
  // 模式
  mode: 'development'
}
```

## 处理图片资源

相较之前的配置资源，rules新增
```js
{
  test: /\.(png|jpe?g|gif|webp)$/,
  type: "asset",
  parser: {
    dataUrlCondition: {
      /* 
      小于4kb的图片会被base64处理
          优点：减少请求数量
          缺点：体积会增大
      */
      maxSize: 4 * 1024
    }
  }
}
```

## 修改输出资源的名称和路径

修改配置

```js
/* 修改output.filename，将 js 文件输出到 static/js 目录中 */
filename: "static/js/main.js"

/* 添加generator属性，修改图片资源的输出目录 */
{
  test: /\.(png|jpe?g|gif|webp)$/,
  type: "asset",
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
    },
  },
  generator: {
    // 将图片文件输出到 static/imgs 目录中
    // 将图片文件命名 [hash:8][ext][query]
    // [hash:8]: hash值取8位
    // [ext]: 使用之前的文件扩展名
    // [query]: 添加之前的query参数
    filename: "static/imgs/[hash:8][ext][query]",
  },
}
```

## 自动清空上次打包资源

```js
{
  output: {
    clean: true, // 自动将上次打包目录资源清空
  },
}
```

