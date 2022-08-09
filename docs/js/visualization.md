## canvas

canvas画布，是h5中新增的的特性  
默认宽度高度300*150  
浏览器认为canvas标签是图片，可以右键另存为图片  
canvas标签的宽度和高度必须通过标签属性width和height设置，不要使用样式设置  

```html
<canvas width="600" height="400"></canvas>
```
```js
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
```

### 绘制线段

```js
//绘制线段的起点
ctx.moveTo(100, 100)
//其他点的设置
ctx.lineTo(100, 200)
ctx.lineTo(200, 100)
//填充颜色
ctx.fillStyle = 'red'
ctx.fill()
//线段样式
ctx.strokeStyle = 'blue'
ctx.lineWidth = '5'
//连接起点和终点
ctx.closePath()
//stroke方法绘制
ctx.stroke()
```

### 绘制矩形

```js
//绘制矩形的第一种方式,参数为x, y, width, height
//这种无法设置填充颜色，可以设置线段颜色
ctx.strokeStyle = 'red'
ctx.strokeRect(100, 200, 100, 200)
//第二种方式
//绘制图像之前设置颜色
ctx.fillStyle = 'blue'
ctx.fillRect(300, 200, 100, 200)
```

### 绘制圆形

```js
//开始绘制
ctx.beginPath()
//绘制圆形的方法,参数 x, y, 半径, 起始弧度, 结束弧度, 是否逆时针绘制
ctx.arc(100, 100, 50, 0, 2 * Math.PI, true)
//填充颜色
ctx.fillStyle = 'red'
ctx.fill()
//绘制
ctx.stroke()
```

### 清除画布

```js
ctx.fillRect(100, 100, 100, 100)
//清除画布
ctx.clearRect(0, 0, 600, 400)
//只清除部分区域
ctx.clearRect(100,100,100,100)
```

### 绘制文字

```js
ctx.font = '20px 微软雅黑'
ctx.fillStyle = 'red'
ctx.fillText('text', 50, 20)
```

### 例子

```js
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
ctx.font = '16px 微软雅黑'
ctx.fillText('数据可视化', 50, 20)

ctx.moveTo(100, 100)
ctx.lineTo(100, 400)
ctx.lineTo(700, 400)

ctx.moveTo(100, 100)
ctx.lineTo(700, 100)
ctx.fillText('150', 70, 110)
ctx.moveTo(100, 160)
ctx.lineTo(700, 160)
ctx.fillText('120', 70, 170)
ctx.moveTo(100, 220)
ctx.lineTo(700, 220)
ctx.fillText('90', 70, 230)
ctx.moveTo(100, 280)
ctx.lineTo(700, 280)
ctx.fillText('60', 70, 290)
ctx.fillText('30', 70, 350)
ctx.fillText('0', 80, 410)
ctx.moveTo(100, 340)
ctx.lineTo(700, 340)


ctx.moveTo(250, 400)
ctx.lineTo(250, 410)
ctx.fillText('食品', 170, 415)
ctx.moveTo(400, 400)
ctx.lineTo(400, 410)
ctx.fillText('数码', 310, 415)
ctx.moveTo(550, 400)
ctx.lineTo(550, 410)
ctx.fillText('服饰', 450, 415)
ctx.fillText('箱包', 600, 415)

ctx.stroke()

ctx.fillStyle = 'red'
ctx.fillRect(120, 200, 100, 200)
```

## svg

```html
<svg style="width:800px;height:800px;">
  <!-- x1 y1 第一个点的坐标 x2 y2 第二个点的坐标 -->
  <line x1="100" y1="100" x2="200" y2="200" stroke="red" stroke-width="5"></line>
  <!-- 绘制折线 points参数为所有点的坐标 默认是填充的 使用fill-opacity="0"取消填充 -->
  <polyline points="300 300, 50 100, 120 400, 20 20" fill-opacity="0" stroke="red"></polyline>
  <!-- 绘制矩形 -->
  <rect x="400" y="400" width="100" height="100" fill="pink"></rect>
  <!-- 绘制圆形 -->
  <circle cx="370" cy="95" r="50" style="stroke: cyan;fill: none;"></circle>
  <!-- 绘制椭圆 -->
  <ellipse cx="500" cy="500" rx="100" ry="50"></ellipse>
  <!-- 绘制多边形 -->
  <polygon points="600 100, 700 300, 750 100" stroke="red"></polygon>
  <!-- 绘制任意图形 M 移动到初始位置 L 画线 Z 将结束和开始点闭合 -->
  <path d="M 10 10 L 20 400 L 30 120 L 40 66 Z"></path>
</svg>
```