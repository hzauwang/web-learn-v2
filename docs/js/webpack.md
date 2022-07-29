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


## 处理字体图标资源

下载：[阿里巴巴矢量图标库](https://www.iconfont.cn/)  
```js
{
  test: /\.(ttf|woff2?)$/,
  type: "asset/resource",
  // 修改字体图标资源的输出目录
  generator: {
    filename: "static/media/[hash:8][ext][query]",
  },
}
```

## 处理其他资源

```js
{
  test: /\.(ttf|woff2?|map4|map3|avi)$/, // 此处添加文件后缀名
  type: "asset/resource",
  generator: {
    filename: "static/media/[hash:8][ext][query]",
  },
},
```

## Eslint 代码格式检测

配置文件的写法：  

- .eslintrc.*,  新建文件，位于项目根目录
    - .eslintrc
    - .eslintrc.js
    - .eslintrc.json
- package.json 中 eslintConfig：不需要创建文件，在原有文件基础上写  

使用:

1. 下载包
    <code>npm i eslint-webpack-plugin eslint -D</code>
2. 定义 Eslint 配置文件, <code>.eslintrc.js</code>
    ```js
    module.exports = {
      // 继承 Eslint 规则, vue的官方规则:plugin:vue/essential
      extends: ["eslint:recommended"],
      env: {
        node: true, // 启用node中全局变量
        browser: true, // 启用浏览器中全局变量
      },
      // 解析选项
      parserOptions: {
        ecmaVersion: 6, // ES 语法版本
        sourceType: "module",  // ES 模块化
      },
      rules: {
        "no-var": 2, // 不能使用 var 定义变量
        semi: "error", // 禁止使用分号
         'array-callback-return': 'warn', // 强制数组方法的回调函数中有 return 语句，否则警告
        'default-case': [
          'warn', // 要求 switch 语句中有 default 分支，否则警告
          { commentPattern: '^no default$' } // 允许在最后注释 no default, 就不会有警告了
        ],
        eqeqeq: [
          'warn', // 强制使用 === 和 !==，否则警告
          'smart' // https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
        ],
      },
    };
    ```
3. 配置, <code>webpack.config.js</code>
    ```js
    const ESLintWebpackPlugin = require("eslint-webpack-plugin");

    plugins: [
      new ESLintWebpackPlugin({
        // 指定检查文件的根目录
        context: path.resolve(__dirname, "src"),
      }),
    ],
    ```
!!!note
    具体规则查看[https://eslint.bootcss.com/docs/user-guide/configuring](https://eslint.bootcss.com/docs/user-guide/configuring)

## Babel JavaScript编译器

可选配置文件的类型

- babel.config.*：新建文件，位于项目根目录  
    - babel.config.js
    - babel.config.json
- .babelrc.*：新建文件，位于项目根目录
    - .babelrc
    - .babelrc.js
    - .babelrc.json
- package.json 中 babel：不需要创建文件，在原有文件基础上写

使用

1. 下载包
    <code>npm i babel-loader @babel/core @babel/preset-env -D</code>
2. <code>babel.config.js</code>
    ```js
    module.exports = {
      // 预设， 一组 Babel 插件, 扩展 Babel 功能
      presets: ["@babel/preset-env"],
    };
    ```
3. <code>webpack.config.js</code>,rules中添加
    ```js
    {
      test: /\.js$/,
      exclude: /node_modules/, // node_modules中的代码不编译
      loader: "babel-loader",
    },
    ```

## 处理HTML资源

1. 下载包  
    <code>npm i html-webpack-plugin -D</code>
2. 配置<code>webpack.config.js</code>
    ```js
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    /* 在plugins中新增 */
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
    ```

## devServer 开发服务器&自动化

1. 下载包  
    <code>npm i webpack-dev-server -D</code>
2. 配置<code>webpack.config.js</code>
    ```js
    module.exports = {
      /* ------ */
      
      // 开发服务器
      devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
      },

      /* ------ */
    }
    ```

## 生产模式

1. 文档目录
    ```
    ├── webpack-test (项目根目录)
    ├── config (Webpack配置文件目录)
    │    ├── webpack.dev.js(开发模式配置文件)
    │    └── webpack.prod.js(生产模式配置文件)
    ├── node_modules (下载包存放目录)
    ├── src (项目源码目录，除了html其他都在src里面)
    │    └── 略
    ├── public (项目html文件)
    │    └── index.html
    ├── .eslintrc.js(Eslint配置文件)
    ├── babel.config.js(Babel配置文件)
    └── package.json (包的依赖管理配置文件)
    ```
2. 修改 webpack.dev.js, 开发模式配置文件  

    - entry入口文件路径无需改变
    - 所有绝对路径需要回退一层目录
    - 开发模式没有输出，所以修改了output中的属性值
    ```js
    const path = require("path");
    const ESLintWebpackPlugin = require("eslint-webpack-plugin");
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
      entry: "./src/main.js",
      output: {
        path: undefined, // 开发模式没有输出，不需要指定输出目录
        filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
        // clean: true, // 开发模式没有输出，不需要清空输出结果
      },
      module: {
        rules: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          {
            test: /\.s[ac]ss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.styl$/,
            use: ["style-loader", "css-loader", "stylus-loader"],
          },
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
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            loader: "babel-loader",
          },
        ],
      },
      plugins: [
        new ESLintWebpackPlugin({
          // 指定检查文件的根目录
          context: path.resolve(__dirname, "../src"),
        }),
        new HtmlWebpackPlugin({
          // 以 public/index.html 为模板创建文件
          // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
          template: path.resolve(__dirname, "../public/index.html"),
        }),
      ],
      // 其他省略
      devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
      },
      mode: "development",
    };
    ```
    配置完成后通过 <code>npx webpack serve --config ./config/webpack.dev.js</code> 来运行

3. 修改 webpack.prod.js, 生产模式配置文件  

    - 绝对路径需要回退一层目录
    - 删除devServer
    - 修改mode为production
    ```js
    const path = require("path");
    const ESLintWebpackPlugin = require("eslint-webpack-plugin");
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
      entry: "./src/main.js",
      output: {
        path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
        filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
        clean: true,
      },
      module: {
        rules: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          {
            test: /\.s[ac]ss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.styl$/,
            use: ["style-loader", "css-loader", "stylus-loader"],
          },
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
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            loader: "babel-loader",
          },
        ],
      },
      plugins: [
        new ESLintWebpackPlugin({
          // 指定检查文件的根目录
          context: path.resolve(__dirname, "../src"),
        }),
        new HtmlWebpackPlugin({
          // 以 public/index.html 为模板创建文件
          // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
          template: path.resolve(__dirname, "../public/index.html"),
        }),
      ],
      // devServer: {
      //   host: "localhost", // 启动服务器域名
      //   port: "3000", // 启动服务器端口号
      //   open: true, // 是否自动打开浏览器
      // },
      mode: "production",
    };
    ```
    配置完成后通过 <code>npx webpack --config ./config/webpack.prod.js</code> 来运行
4. 为了方便运行不同模式的指令，将指令定义在 <code>package.json</code> 的 scripts 里面
    ```js
    // package.json
    {
      // 其他省略
      "scripts": {
        "start": "npm run dev",
        "dev": "npx webpack serve --config ./config/webpack.dev.js",
        "build": "npx webpack --config ./config/webpack.prod.js"
      }
    }
    ```
    以后启动指令：

    - 开发模式：npm start 或 npm run dev
    - 生产模式：npm run build

## 提取 CSS 成单独文件

上面的配置会将css文件打包到js里，当 js 文件加载时，会创建一个 style 标签来生成样式，下述配置会将css通过 link 标签加载

1. 下载包  
    <code>npm i mini-css-extract-plugin -D</code>
2. 配置 <code>webpack.prod.js</code> (生产环境下的配置)
   ```js
   /* 引入插件 */
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    /* 将文件中的"style-loader"替换为MiniCssExtractPlugin.loader,注意这是loader，不是字符串 */
    module.exports = {
      // 省略
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
          },
          {
            test: /\.s[ac]ss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
          {
            test: /\.styl$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
          },
        ]
      },
      // 省略
      plugins: [
        // 提取css成单独文件
        new MiniCssExtractPlugin({
          // 定义输出文件名和目录
          filename: "static/css/main.css",
        }),
      ]
      // 省略
    }
    
   ```

## CSS 兼容性处理

1. 下载包  
    <code>npm i postcss-loader postcss postcss-preset-env -D</code>
2. 配置<code>webpack.prod.js</code>, 修改rules中的配置
    ```js
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          "stylus-loader",
        ],
      },
    ]
    ```
3. 控制兼容性
    在 <code>package.json</code> 文件中添加 <code>browserslist</code> 控制样式的兼容性做到什么程度
    ```js
    {
      // 其他省略
      "browserslist": ["last 2 version", "> 1%", "not dead"]
    }
    ```
4. 封装配置，减少代码量
    ```js
    function getStyleLoaders = (preProcessor) => {
      return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                "postcss-preset-env", // 能解决大多数样式兼容性问题
              ],
            },
          },
        },
        preProcessor
      ].filter(Boolean)
    }
    module.exports = {
      module: {
        rules: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: getStyleLoaders()
          },
          {
            test: /\.less$/,
            use: getStyleLoaders('less-loader')
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders('sass-loader')
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders('stylus-loader')
          },
        ]
      }
    }
    ```

## CSS压缩

1. 下载包
    <code>npm i css-minimizer-webpack-plugin -D</code>
2. 配置 <code>webpack.prod.js</code>
    ```js
    /* 引入插件 */
    const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

    module.exports = {
      plugins: [
        // css压缩
        new CssMinimizerPlugin(),
      ]
    }
    ```

## SourceMap

SourceMap（源代码映射）会生成一个 xxx.map 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。当构建后代码出错了，会通过 xxx.map 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助更快的找到错误根源。

SourceMap 的值的详细介绍查看[Webpack DevTool 文档](https://webpack.docschina.org/configuration/devtool/)

具体配置  

- 开发模式使用 <code>cheap-module-source-map</code>  
    优点：打包编译速度快，包含行映射  
    缺点：没有列映射
    ```js
    module.exports = {
      // 其他省略
      mode: "development",
      devtool: "cheap-module-source-map",
    };
    ```
- 生产模式使用 <code>source-map</code>  
    优点：包含行/列映射  
    缺点：打包编译速度更慢
    ```js
    module.exports = {
      // 其他省略
      mode: "production",
      devtool: "source-map",
    };
    ```

## 提升打包构建速度

### HotModuleReplacement

HotModuleReplacement（HMR/热模块替换）：在程序运行中，替换、添加或删除模块，而无需重新加载整个页面。

```js
module.exports = {
  // 其他省略
  devServer: {
    // 其他省略
    hot: true, // 开启HMR功能(默认是开启的)
  },
};
```

此时 css 样式经过 style-loader 处理，已经具备 HMR 功能了。 但是 js 还不行。

```js
/* main.js */
import count from "./js/count";
import sum from "./js/sum";

// 其他省略

// 判断是否支持HMR功能
if (module.hot) {
  module.hot.accept("./js/count.js");

  module.hot.accept("./js/sum.js", function (sum) {
    const result2 = sum(1, 2, 3, 4);
    console.log(result2);
  });
}
```

!!!note
    实际开发我们会使用其他 loader 来解决, 比如[vue-loader](https://vue-loader.vuejs.org/zh/)

### OneOf

打包时每个文件都会经过所有 loader 处理，虽然因为 test 正则原因实际没有处理上，但是都要过一遍。比较慢。

```js
module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
          // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          {
            test: /\.s[ac]ss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.styl$/,
            use: ["style-loader", "css-loader", "stylus-loader"],
          },
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
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            loader: "babel-loader",
          },
        ]
      }
    ]
  }
}
```

### Include/Exclude

开发时我们需要使用第三方的库或插件，所有文件都下载到 node_modules 中了。而这些文件是不需要编译可以直接使用的。

所以我们在对 js 文件处理时，要排除 node_modules 下面的文件。

```js
module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          // 省略
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            loader: "babel-loader",
          },
        ]
      }
    ]
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
    }),
  ]
}
```

### Cache

缓存之前的 Eslint 检查 和 Babel 编译结果，这样第二次打包时速度就会更快了。

```js
module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
  ]
}
```

### Thead

我们想要提升打包速度，其实就是要提升 js 的打包速度，因为其他文件都比较少。

而对 js 文件处理主要就是 eslint 、babel、Terser 三个工具，所以我们要提升它们的运行速度。

多进程打包：开启电脑的多个进程同时干一件事，速度更快。

!!!note
    每个进程启动有大约为 600ms 左右开销

获取cpu的核数
```js
// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;
```

1. 下载包  
    <code>npm i thread-loader -D</code>
2. 新增配置
    ```js
    const os = require("os");
    const TerserPlugin = require("terser-webpack-plugin");

    // cpu核数
    const threads = os.cpus().length;

    module.exports = {
      module: {
        rules: [
          {
            oneOf: [
              // 省略
              {
                test: /\.js$/,
                // exclude: /node_modules/, // 排除node_modules代码不编译
                include: path.resolve(__dirname, "../src"), // 也可以用包含
                use: [
                  {
                    loader: "thread-loader", // 开启多进程
                    options: {
                      workers: threads, // 数量
                    },
                  },
                  {
                    loader: "babel-loader",
                    options: {
                      cacheDirectory: true, // 开启babel编译缓存
                    },
                  },
                ],
              },
            ]
          }
        ]
      },
      plugins: [
        new ESLintWebpackPlugin({
          // 指定检查文件的根目录
          context: path.resolve(__dirname, "../src"),
          exclude: "node_modules", // 默认值
          cache: true, // 开启缓存
          // 缓存目录
          cacheLocation: path.resolve(
            __dirname,
            "../node_modules/.cache/.eslintcache"
          ),
          threads, // 开启多进程
        }),
        new HtmlWebpackPlugin({
          // 以 public/index.html 为模板创建文件
          // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
          template: path.resolve(__dirname, "../public/index.html"),
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
          // 定义输出文件名和目录
          filename: "static/css/main.css",
        }),
        // css压缩
        // new CssMinimizerPlugin(),
      ],
      optimization: {
        minimize: true,
        minimizer: [
          // css压缩也可以写到optimization.minimizer里面，效果一样的
          new CssMinimizerPlugin(),
          // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
          new TerserPlugin({
            parallel: threads // 开启多进程
          })
        ],
      }
    }
    ```

## 减少代码体积

### Tree Shaking

Tree Shaking 是一个术语，通常用于描述移除 JavaScript 中的没有使用上的代码。它依赖 ES Module。

Webpack 已经默认开启了这个功能，无需其他配置。

### Babel

Babel 为编译的每个文件都插入了辅助代码，使代码体积过大！

Babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。默认情况下会被添加到每一个需要它的文件中。

你可以将这些辅助代码作为一个独立模块，来避免重复引入。

@babel/plugin-transform-runtime: 禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用。

1. 下载包
    <code>npm i @babel/plugin-transform-runtime -D</code>
2. 配置
    ```js
    module.exports = {
      module: {
        rules: [
          {
            oneOf: [
              // 省略
              {
                test: /\.js$/,
                // exclude: /node_modules/, // 排除node_modules代码不编译
                include: path.resolve(__dirname, "../src"), // 也可以用包含
                use: [
                  {
                    loader: "thread-loader", // 开启多进程
                    options: {
                      workers: threads, // 数量
                    },
                  },
                  {
                    loader: "babel-loader",
                    options: {
                      cacheDirectory: true, // 开启babel编译缓存
                      cacheCompression: false, // 缓存文件不要压缩
                      plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                    },
                  },
                ],
              },
            ]
          }
        ]
      }
    }
    ```

### Image Minimizer

开发如果项目中引用了较多图片，那么图片体积会比较大，将来请求速度比较慢。

我们可以对图片进行压缩，减少图片体积。

!!!note
    如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。

1. 下载包  
    <code>npm i image-minimizer-webpack-plugin imagemin -D</code>  
    还有剩下的包需要下载，有两种模式：  
    - 无损压缩  
    <code>npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D</code>
    - 有损压缩  
    <code>npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D</code>
2. 以无损压缩配置为例：
    ```js
    const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

    module.exports = {
      // 省略
      optimization: {
        minimizer: [
          // 压缩图片
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminGenerate,
              options: {
                plugins: [
                  ["gifsicle", { interlaced: true }],
                  ["jpegtran", { progressive: true }],
                  ["optipng", { optimizationLevel: 5 }],
                  [
                    "svgo",
                    {
                      plugins: [
                        "preset-default",
                        "prefixIds",
                        {
                          name: "sortAttrs",
                          params: {
                            xmlnsOrder: "alphabetical",
                          },
                        },
                      ],
                    },
                  ],
                ],
              },
            },
          }),
        ]
      }
    }
    ```
3. 打包时可能会出现报错：
    ```
    Error: Error with 'src\images\1.jpeg': '"C:\Users\86176\Desktop\webpack\webpack_code\node_modules\jpegtran-bin\vendor\jpegtran.exe"'
    Error with 'src\images\3.gif': spawn C:\Users\86176\Desktop\webpack\webpack_code\node_modules\optipng-bin\vendor\optipng.exe ENOENT
    ```
    我们需要安装两个文件到 node_modules 中才能解决：
    - jpegtran.exe  
      在[jpegtran 官网地址](http://jpegclub.org/jpegtran/)下载  
      需要复制到 <code>node_modules\jpegtran-bin\vendor</code> 下面  
    - optipng.exe  
      在[OptiPNG 官网地址](http://optipng.sourceforge.net/)下载  
      需要复制到 <code>node_modules\optipng-bin\vendor</code> 下面  

## 优化代码运行性能

### Code Split

单入口+代码分割+动态导入方式来进行配置

1. main.js
```js
document.getElementById("btn").onClick = function () {
  // eslint会对动态导入语法报错，需要修改eslint配置文件
  // webpackChunkName: "math"：这是webpack动态导入模块命名的方式
  // "math"将来就会作为[name]的值显示。
  import(/* webpackChunkName: "math" */ "./js/math.js").then(({ count }) => {
    console.log(count(2, 1));
  });
};
```
2. eslint 配置
      - 下载包: <code>npm i eslint-plugin-import -D</code>
      - 配置: 
        ```js
        // .eslintrc.js
        module.exports = {
          // 继承 Eslint 规则
          extends: ["eslint:recommended"],
          env: {
            node: true, // 启用node中全局变量
            browser: true, // 启用浏览器中全局变量
          },
          plugins: ["import"], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
          parserOptions: {
            ecmaVersion: 6,
            sourceType: "module",
          },
          rules: {
            "no-var": 2, // 不能使用 var 定义变量
          },
        };
        ```  

3. 配置webpack.config.js
```js
// webpack.config.js
const os = require("os");
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// cpu核数
const threads = os.cpus().length;

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/[name].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader"),
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            // generator: {
            //   // 将图片文件输出到 static/imgs 目录中
            //   // 将图片文件命名 [hash:8][ext][query]
            //   // [hash:8]: hash值取8位
            //   // [ext]: 使用之前的文件扩展名
            //   // [query]: 添加之前的query参数
            //   filename: "static/imgs/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            // generator: {
            //   filename: "static/media/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),
    // css压缩
    // new CssMinimizerPlugin(),
  ],
  optimization: {
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads, // 开启多进程
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 其他内容用默认配置即可
    },
  },
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  mode: "production",
  devtool: "source-map",
};
```

### Preload / Prefetch

- Preload: 告诉浏览器立即加载资源。
- Prefetch: 告诉浏览器在空闲时才开始加载资源。

1. 下载包  
    <code>npm i @vue/preload-webpack-plugin -D</code>
2. 配置webpack.prod.js
    ```js
    const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

    module.exports = {
      plugins: [
        new PreloadWebpackPlugin({
          rel: "preload", // preload兼容性更好
          as: "script",
          // rel: 'prefetch' // prefetch兼容性更差
        }),
      ]
    }
    ```

### Network Cache

- fullhash（webpack4 是 hash）  
    每次修改任何一个文件，所有文件名的 hash 值都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效。
- chunkhash  
    根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。我们 js 和 css 是同一个引入，会共享一个 hash 值。
- contenthash  
    根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的。

```js
module.exports = {
  output: {
    // [contenthash:8]使用contenthash，取8位长度
    filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
  ]
}
```

### Core-js

core-js 是专门用来做 ES6 以及以上 API 的 polyfill。

polyfill翻译过来叫做垫片/补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性。

使用Promise测试

Eslint 会对 Promise 报错, 解决方法：
1. 下载包
    <code>npm i @babel/eslint-parser -D</code>
2. .eslintrc.js
    ```js
    module.exports = {
      // 省略
      parser: "@babel/eslint-parser", // 支持最新的最终 ECMAScript 标准
    };
    ```

使用core-js:

- 下载包
    <code>npm i core-js</code>
- 自动按需引入
    ```js
    /* babel.config.js */
    module.exports = {
      // 智能预设：能够编译ES6语法
      presets: [
        [
          "@babel/preset-env",
          // 按需加载core-js的polyfill
          { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
        ],
      ],
    };
    ```

### PWA

渐进式网络应用程序(progressive web application - PWA)：是一种可以提供类似于 native app(原生应用程序) 体验的 Web App 的技术。

其中最重要的是，在 离线(offline) 时应用程序能够继续运行功能。

内部通过 Service Workers 技术实现的。

1. 下载包
    <code>npm i workbox-webpack-plugin -D</code>
2. 修改配置文件
    ```js
    const WorkboxPlugin = require("workbox-webpack-plugin");

    module.exports = {
      plugins: [
        new WorkboxPlugin.GenerateSW({
          // 这些选项帮助快速启用 ServiceWorkers
          // 不允许遗留任何“旧的” ServiceWorkers
          clientsClaim: true,
          skipWaiting: true,
        }),
      ]
    }
    ```
3. 修改 main.js
    ```js
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }
    ```
4. 运行指令
    <code>npm run build</code>  
    此时如果直接通过 VSCode 访问打包后页面，在浏览器控制台会发现 SW registration failed。

    因为我们打开的访问路径是：http://127.0.0.1:5500/dist/index.html。此时页面会去请求 service-worker.js 文件，请求路径是：http://127.0.0.1:5500/service-worker.js，这样找不到会 404。

    实际 service-worker.js 文件路径是：http://127.0.0.1:5500/dist/service-worker.js。

5. 解决路径问题
    - 下载包
        <code>npm i serve -g</code>
    - 运行指令
        <code>serve dist</code>

