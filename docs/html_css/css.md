## 在线学习网站  

* [菜鸟教程](https://www.runoob.com/)  
* [W3school](https://www.w3school.com.cn/h.asp)  
* [Mozilla 开发者社区](https://developer.mozilla.org/zh-CN/docs/Web)  

## 视频教程  

[黑马前端](https://www.bilibili.com/video/BV14J4114768)  

## 电子书  

[Head First HTML与CSS](https://pan.baidu.com/s/1EeKVMuZWzvHCDw7I6EO0mw) (提取码: eplw)  

## HTML/CSS训练

[freeCodeCamp](https://chinese.freecodecamp.org/learn/responsive-web-design/)  

## 代码编辑

代码编辑器可以使用[Visual Studio Code](https://code.visualstudio.com/),可以安装插件以支持各种编程语言(js、python、R等)语法高亮以及可以安装[remote-ssh](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)以进行ssh远程连接等。
    
## 使用css3实现加载中动态样式

[使用css3实现加载中动态样式](../more/user_inter.md#css3)

## 实现方式

- 内联样式（行内样式）：标签中的style属性设置
- 内部样式：head中的style标签中
- 外部样式：link引入外部css文件

## 优先级

* 一个元素选择器不是很具体 — 会选择页面上该类型的所有元素 — 所以它的优先级就会低一些。
* 一个类选择器稍微具体点 — 它会选择该页面中有特定 class 属性值的元素 — 所以它的优先级就要高一点。

<div id="css-page">
  <h1 class="main-heading">This is my heading.</h1>
</div>

```css
.main-heading { 
  color: red; 
}
        
h1 { 
  color: blue;
}
```
```html
<h1 class="main-heading">This is my heading.</h1>
```

## 选择器

### 复合选择器

#### 交集选择器
选择器1选择器2选择器3{}  
注意：交集选择器中如果有元素选择器，必须元素选择器开头

#### 选择器分组（并集选择器）
选择器1,选择器2{}

### 全局选择器

全局选择器，是由一个星号（*）代指的，它选中了文档中的所有内容（或者是父元素中的所有内容，比如，它紧随在其他元素以及邻代运算符之后的时候）。

```css
* {
  margin: 0;
}
```

!!! note
    使用全局选择器，让选择器更易读. <code>article :first-child</code> 与 <code>article *:first-child</code> 相同, 表示选中任何<code>article</code>元素的第一子元素, <code>article:first-child</code>表示选择了作为其他元素的第一子元素的<code>article</code>元素。

### 属性选择器
| 选择器 | 示例 | 具体元素 | 描述 |
| ---- | ---- | ---- | ---- |
| <code>\[attr]</code> | a\[title] | &lt;a title&gt; | 匹配带有一个名为attr的属性的元素——方括号里的值。 |
| <code>\[attr=value]</code> | a\[href="https://example.com"] | &lt;a href="https://example.com"&gt; | 匹配带有一个名为attr的属性的元素，其值正为value——引号中的字符串。 |
| <code>\[attr~=value]</code> | p\[class~="special"] | &lt;p class=" … special … "&gt; | 匹配带有一个名为attr的属性的元素，其值正为value，或者匹配带有一个attr属性的元素，其值有一个或者更多，至少有一个和value匹配。<br>注意，在一列中的好几个值，是用空格隔开的。 |
| <code>\[attr\|=value]</code> | div\[lang\|="zh"] | &lt;div lang="zh-…"&gt; | 	匹配带有一个名为attr的属性的元素，其值可正为value，或者开始为value，后面紧随着一个连字符。 |
| <code>\[attr^=value]</code> | li\[class^="box-"] | &lt;li class="box-…"&gt; | 匹配带有一个名为attr的属性的元素，其值开头为value子字符串。 |
| <code>\[attr$=value]</code> | li\[class$="-box"] | &lt;li class="…-box"&gt; | 匹配带有一个名为attr的属性的元素，其值结尾为value子字符串。 |
| <code>\[attr*=value]</code> | li\[class*="box"] | &lt;li class="…box…"&gt; | 匹配带有一个名为attr的属性的元素，其值的字符串中的任何地方，至少出现了一次value子字符串。 |

### 大小写不敏感

<div id="css-page-1">
  <ul>
      <li class="a">Item 1</li>
      <li class="A">Item 2</li>
      <li class="Ab">Item 3</li>
  </ul>
</div>

```css
  li[class^="a"] {
    background-color: yellow;
  }

  li[class^="a" i] {
    color: red;
  }
```
```html
<ul>
    <li class="a">Item 1</li>
    <li class="A">Item 2</li>
    <li class="Ab">Item 3</li>
</ul>
```

### 伪类和伪元素
<code>article p:first-child::first-line</code>表示选择一个<code>&lt;article&gt;</code>元素里面的第一个<code>&lt;p&gt;</code>元素的第一行。  
其中，伪类为单冒号，伪元素为双冒号。

#### 伪类选择器

- <code>:first-child</code>  
- <code>:last-child</code>  
- <code>:nth-child</code>, 选择第n个子元素
    - 特殊值：
        - n: 第n个，n的范围0到正无穷
        - 2n(或even): 选择偶数位的元素
        - 2n+1(或odd): 奇数位

以上这些伪类都是根据所有的子元素排序

- <code>:first-of-type</code>  
- <code>:last-of-type</code>  
- <code>:nth-of-type</code>  
  
以上这些伪类是在同类型元素的排序

- <code>:not()</code>, 例 <code>ul>li:not(:nth-of-type(3)){}</code> 表示除了第三个li不选，其他都选中

超链接的伪类：

1. 没有访问过的链接, <code>:link</code>
2. 访问过的链接, <code>:visited</code> , 只能改变颜色  
3. 鼠标移入, <code>:hover</code>  
4. 鼠标点击, <code>:active</code>

#### 伪元素选择器

- <code>::first-letter</code>, 第一个字母  
- <code>::first-line</code>
- <code>::selection</code>, 选中的元素  
- <code>::after</code>, 结合content使用
- <code>::before</code>


!!! note
    <code>::before</code>和<code>::after</code>通过使用 CSS 将内容插入到文档中。

<div id="css-page-2">
  <p class="box">Content in the box in my HTML page.</p>
</div>
```css
.box::after {
  content: " ➥"
}
```
```html
<p class="box">Content in the box in my HTML page.</p>
```
[伪类和伪元素的参考列表](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#参考节)

### 关系选择器

* 后代选择器 <code>.box p</code>
* 子代关系选择器 <code>article > p</code>
* 邻接（下一个）兄弟 <code>p + img</code>
* 通用兄弟(选中一个元素的下方兄弟元素，即使它们不直接相邻) <code>p ~ img</code>

### 选择器的权重

- 内联样式  1, 0, 0, 0  
- id选择器  0, 1, 0, 0  
- 类和伪类选择器  0, 0, 1, 0  
- 元素选择器  0, 0, 0, 1  
- 统配选择器 0, 0, 0, 0  
- 继承的样式 没有优先级  

比较优先级时，需要将所有的选择器的优先级进行相加计算  
分组(并集)选择器的优先级分开计算  
选择器的累加不会超过其最大的数量级，类选择器再高也不会超过ID选择器  
如果优先级相同, 后面的覆盖前面的  
!important, 或获取到最高的优先级

## 单位

- px 像素  
- % 相对于父元素属性的百分比  
- em 相对于自身元素的字体大小来计算，1em = 1 font-size  
- rem 相对于根元素(html)的字体大小计算
- vw 表示视口的宽度，100vw等于一个视口的宽度

## 文档流(normal flow)

网页是多层结构，通过css分别为每一层设置样式，用户只能看到最顶一层，最底下一层称为文档流  

元素在文档流中的特点：  

- 块元素
    - 独占一行  
    - 自上向下
    - 宽度为父元素的100%
    - 默认高度是内容撑开
- 行内元素
    - 只占自身大小
    - 自左向右水平排列
    - 默认宽度和高度是内容撑开

## 盒模型

### 水平方向的布局

元素在其父元素中水平方向的位置有以下几个属性共同决定

- margin-left
- border-left
- padding-left
- width
- padding-right
- border-right
- margin-right

- 上述加起来等于其父元素的内容区的宽度，如果加起来不等于父元素的宽度，则称为过渡约束，等式会自动调整， 调整的情况：
    - 如果这七个值没有auto，则浏览器会自动调整margin-right的值
- 这七个值有三个可以设置为auto，width、margin-left、margin-right
    - 如果某个值为auto，则会自动调整auto的值使等式成立
    - 一个宽度和一个外边距为auto，则宽度会最大，外边距为0
    - 三个值为auto，则外边距都是0，宽度最大
    - 两个外边距为auto，宽度固定值，将外边距设置为相同的值

### 垂直方向的布局

overflow: 

- visible, 默认值, 子元素会溢出
- hidden, 溢出的内容会被裁剪
- scroll, 生成滚动条
- auto, 根据需要生成滚动条

垂直外边距的重叠

- <strong>相邻</strong>的<strong>垂直</strong>方向的外边距会发生重叠现象
- 兄弟元素
    - 兄弟元素间的相邻垂直外边距会取最大值(两者都是正值)
    - 特殊情况：
        - 如果相邻的外边距一正一负，则取两者的和
        - 如果相邻的外边距都是负值，则取绝对值较大的
- 父子元素
    - 父子元素间相邻外边距，子元素的外边距会传递给父元素(上外边距)

### 块级盒子和内联盒子

1. 一个被定义成块级的（block）盒子会表现出以下行为  
    - 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽  
    - 每个盒子都会换行  
    - width 和 height 属性可以发挥作用  
    - 内边距（padding）, 外边距（margin）和 边框（border）会将其他元素从当前盒子周围“推开”  
2. 一个盒子对外显示为 inline，那么他的行为如下  
    - 盒子不会产生换行。  
    - width 和 height 属性将不起作用。  
    - 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。  
    - 水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。  

### 内部和外部显示类型
<code>display: flex</code> 外部显示类型是 <code>block</code>，但是内部显示类型修改为 <code>flex</code>  
<code>display: inline-flex</code> 外部显示类型是 <code>inline</code>，但是内部显示类型修改为 <code>flex</code>

### 替代盒模型
![盒模型](../images/box-model.png)  
1. 标准盒模型  
  在标准模型中，如果你给盒设置 width 和 height，实际设置的是 content box。 padding 和 border 再加上设置的宽高一起决定整个盒子的大小。  
2. 替代（IE）盒模型
  使用<code>box-sizing: border-box</code>来实现，替代模型中所有宽度都是可见宽度，内容宽度是该宽度减去边框和填充部分。

!!! note
    下方示例可以看到，上面的box实际宽度为390（300 + 40 * 2 + 5 * 2），下面的box宽度为300
<div id="css-page-3">
  <div class="box">I use the standard box model.</div>
  <div class="box alternate">I use the alternate box model.</div>
</div>
```css
.box {
  border: 5px solid rebeccapurple;
  background-color: lightgray;
  padding: 40px;
  margin: 40px;
  width: 300px;
  height: 150px;
}

.alternate {
  box-sizing: border-box;
}
```
```html
<div class="box">I use the standard box model.</div>
<div class="box alternate">I use the alternate box model.</div>
```

### 外边距折叠

顶部段落的页 margin-bottom为 50px，第二段的margin-top 为 30px，框之间的实际外边距是 50px，而不是两个外边距的总和。

<div id="css-page-4">
  <div class="container">
    <p class="one">I am paragraph one.</p>
    <p class="two">I am paragraph two.</p>
  </div>
</div>

```css
.one {
  margin-bottom: 50px;
}

.two {
  margin-top: 30px;
}
```
```html
<div class="container">
  <p class="one">I am paragraph one.</p>
  <p class="two">I am paragraph two.</p>
</div>
```

### display: inline-block
* 设置width 和height 属性会生效。  
* padding, margin, 以及border 会推开其他元素。

<div id="css-page-5">
  <nav>
    <ul class="links-list">
      <li><a href="">Link one</a></li>
      <li><a href="">Link two</a></li>
      <li><a href="">Link three</a></li>
    </ul>
  </nav>
</div>

```css
.links-list a {
  display: inline-block;
  background-color: rgb(179,57,81);
  color: #fff;
  text-decoration: none;
  padding: 1em 2em;
}

.links-list a:hover {
  background-color: rgb(66, 28, 40);
  color: #fff;
}
```
```html
<nav>
  <ul class="links-list">
    <li><a href="">Link one</a></li>
    <li><a href="">Link two</a></li>
    <li><a href="">Link three</a></li>
  </ul>
</nav>
```

### 轮廓，阴影，圆角

<code>outline</code> 用来设置元素的轮廓线，用法和border类似，与border不同的是，轮廓不会影响到可见框的大小。

<code>box-shadow: 10px 10px 20px black;</code> 设置阴影效果，不会影响页面布局, 前两个参数是偏移量, 第三个是阴影的模糊半径，越大越模糊

<code>border-top-left-radius: 50px 100px;</code>, 设置两个不同的值圆角可以显示为椭圆; <code>border-radius: 20px / 40px;</code>设置椭圆

## 背景

### 背景

```css
*{
  /* 
  背景图片小于元素，则图片会自动平铺
  背景图片大于元素，部分北京无法显示
  */
  background-image: url("path/to/img");

  /* 
  背景的重复方式
  repeat 默认值 背景沿着x轴y轴方向重复
  repeat-x 沿x轴重复
  repeat-y 
  no-repeat 不重复
  */
  background-repeat: no-repeat;

  /* 
  背景图片的位置
    - 通过top left bottom right center 设置, 必须指定两个值，只写一个第二个是center
    - 通过偏移量设置
  */
  background-position: center center;
  background-position: 10px 10px;

  /* 
  背景的范围
    - background-clip 裁剪范围
      - border-box 默认值，背景会出现在边框的下方
      - padding-box 背景出现在内容区和内边距
      - content-box 背景出现在内容区
    - background-origin 背景图片偏移量计算的原点，配合background-position使用
      - padding-box 默认值，从内边距处开始计算
      - content-box 内容区开始计算
      - border-box 从边框处开始计算
  */
  background-clip: content-box;
  background-origin: padding-box;
  
  /*
    background-size 背景图片的大小
    第一个值为宽度 第二个为高度
    可设置百分比
    设置为cover 表示图片比例不变，将元素铺满
    contain 图片比例不变，但图片完整显示
  */
  background-size: 100% auto;
  background-size: cover;

  /* 
  背景图片是否会跟随元素移动
    - scroll
    - fixed 固定在页面中
  */
  background-attachment: scroll;
}
```

### 渐变背景

```css
*{
  /* to ... 设定渐变方向 */
  background-image: linear-gradient(to top right,red,yellow);
  /* xxxdeg deg表示度数 */
  /* xxxturn 圈 */
  background-image: linear-gradient(50deg,red,yellow);

  background-image: repeating-linear-gradient(red,yellow);

  /* 径向渐变 */
  background-image: radial-gradient(red,yellow);
}
```
[在线CSS渐变生成器](https://cssgradient.io/)

## 调整图片大小

* <code>max-width: 100%</code>,允许图片尺寸上小于但不大于盒子。  
* 使用<code>object-fit</code>后替换元素可以以多种方式被调整到合乎盒子的大小。  

## 样式化表格

* <code>table-layout: fixed;</code>, 根据列标题的宽度来规定列的宽度。  
* <code>border-spacing</code>, 单元格边框的距离
* <code>border-collapse: collapse;</code>, 让边框合为一条。  

## 字体

<code>serif</code>: 带衬线  
<code>sans-serif</code>: 非衬线  
<code>monospace</code>: 等宽字体  

```css
/* 将服务器中的字体提供给用户 */
@font-face{
  /* 指定字体名字 */
  font-family: 'myFont';
  src: url(path/to/fontFile.ttf) format("truetype");
}
/* 使用字体 */
p{
  font-family: 'myFont';
}
```

字体属性简写:  
<code>font: 字体大小/行高 字体族</code>

### 图标字体(iconfont)

#### font awesome

1. 下载[font awesome](https://fontawesome.com/)
2. 将css和webfonts目录移至项目中
3. 页面中引入all.css
4. 使用
    ```html
    <i class="fas fa-bell" style="color:red;"></i>
    <i class="fab fa-accessible-icon" style="font-size:20px;"></i>
    ```

#### iconfont

[https://www.iconfont.cn/](https://www.iconfont.cn/)

## 文本样式

```css
text-align: center; /* 水平对齐 */
vertical-align: middle; /* 垂直对齐 */
text-decoration: underline; /* 文本修饰，可以用来加下划线或删除线 */
/* 
  设置页面空白：
    nowrap 不换行
    pre 保留空白 
*/
white-space: nowrap;
text-overflow: ellipsis; /* 文本溢出内容显示为省略号，配合overflow为hidden使用 */
```

## CSS排版

### 正常布局流
在没有改变默认布局规则情况下的页面元素布局方式。

### 弹性盒子<code>display: flex;</code>

```less
@a:#bfa;

*{
  margin: 0;
  padding: 0;
  list-style: none;
}

ul{
  width: 800px;
  height: 200px;
  border: 10px solid red;
  display: flex;
  /* 
    flex-direction
      - row 默认值
      - row-reverse 右向左
      - column
      - column-reverse
      主轴：元素的排列方向
      侧轴: 与主轴垂直方向
      
    flex-wrap 是否自动换行
      - nowrap 默认值
      - wrap
      - wrap-reverse 辅轴反方向换行

    justify-content 主轴元素如何排列
      - flex-start 默认值 元素沿着主轴起边排列
      - flex-end
      - center
      - space-around 空白分配到元素两侧
      - space-evenly 空白分配到元素单侧
      - space-between 空白分配到元素间

    align-items 元素之间对齐方式
      - stretch 默认值 将元素的长度设置为相同的值
      - flex-start 元素不会拉伸，沿着辅轴起边对齐
      - flex-end
      - center 居中对齐
      - baseline 基线对齐

    align-content 辅轴空白空间的分配

  */
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: baseline;
  align-content: center;
}

li{
  width: 100px;
  background-color: @a;
  font-size: 50px;
  text-align: center;
  line-height: $width;

  /* 
    flex-grow 伸展系数 默认值为0
      - 父元素有多余空间时，子元素如何伸展
      - 父元素的剩余空间，按照比例进行分配
    flex-shrink 收缩系数
      - 父元素的空间不足以容纳子元素时，如何对子元素收缩
    flex-basis 元素在主轴上的基础长度，主轴时横向的，该值指定的是元素的宽度，否则指定的是高度
      - auto 默认值  
    简写 flex 增长 缩减 基础
      - initial 默认值 相当于 '0 1 auto'
      - auto '1 1 auto'
      - none '0 0 auto' 没有弹性
    order 元素顺序
  */
  // flex-grow: 1;
  // flex-shrink: 0;
  // flex-basis: 250px;
  flex: 1 1 auto;
  order: 3;

  &:nth-child(2){
    background-color: pink;
    // flex-grow: 2;
    // flex-shrink: 2;
    order: 1;
  }

  &:nth-child(3){
    background-color: orange;
    // flex-grow: 3;
    // flex-shrink: 3;
    order: 2;
  }
}
```

#### 例子  
<div id="css-page-6">
  <header>
      <h1>Sample flexbox example</h1>
    </header>
    <section>
      <article>
        <h2>First article</h2>
        <p>p1</p>
      </article>
      <article>
        <h2>Second article</h2>
        <p>p2</p>
      </article>
      <article>
        <h2>Third article</h2>
        <p>p3</p>
        <p>p4</p>
      </article>
      <article>
        <h2>Fourth article</h2>
        <p>p5</p>
      </article>
      <article>
        <h2>Fifth article</h2>
        <p>p6</p>
      </article>
      <article>
        <h2>Six article</h2>
        <p>p7</p>
        <p>p8</p>
      </article>
      <article>
        <h2>Seventh article</h2>
        <p>p9</p>
        <p>p10</p>
      </article>
    </section>
</div>
html:

```html
<header>
  <h1>Sample flexbox example</h1>
</header>
<section>
  <article>
    <h2>First article</h2>
    <p>p1</p>
  </article>
  <article>
    <h2>Second article</h2>
    <p>p2</p>
  </article>
  <article>
    <h2>Third article</h2>
    <p>p3</p>
    <p>p4</p>
  </article>
  <article>
    <h2>Fourth article</h2>
    <p>p5</p>
  </article>
  <article>
    <h2>Fifth article</h2>
    <p>p6</p>
  </article>
  <article>
    <h2>Six article</h2>
    <p>p7</p>
    <p>p8</p>
  </article>
  <article>
    <h2>Seventh article</h2>
    <p>p9</p>
    <p>p10</p>
  </article>
</section>
```
css:
```css
section{
  display: flex;
  flex-wrap: wrap;/* 溢出的元素将被移到下一行 */
}
article {
  flex: 200px; /* 每个元素的宽度至少是 200px */
}
```

#### 属性
!!! note
    可使用F12开发者工具在上述例子上更改css属性

* <code>flex: 1 200px;</code>: 每个 flex 项将首先给出 200px 的可用空间，然后，剩余的可用空间将根据分配的比例共享  
* <code>justify-content: space-around;</code>: justify-content控制 flex 项在主轴上的位置  
* <code>align-items: center;</code>: align-items控制交叉轴上的位置  
* <code>order</code>:
    * 所有 flex 项默认的 order 值是 0。
    * order 值大的 flex 项比 order 值小的在显示顺序中更靠后。
    * 可以为负数。

### 网格布局<code>display: grid;</code>

#### 例子

<div id="css-page-7">
  <div class="container">
      <div class="first-div">One</div>
      <div>Two</div>
      <div>Three</div>
      <div>Four</div>
      <div>Five</div>
      <div>Six</div>
      <div>Seven</div>
  </div>
</div>

```html
<div class="container">
    <div class="first-div">One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
    <div>Six</div>
    <div>Seven</div>
</div>
```

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  grid-auto-rows: minmax(100px, auto);
}
.first-div{
  grid-column: 1/3;
  grid-row: 1/3;
}
```

#### 属性

* <code>grid-template-columns: repeat(2, 2fr 1fr)</code>, 表示<code>2fr 1fr 2fr 1fr</code>
* 显式网格是使用<code>grid-template-columns</code> 和 <code>grid-template-rows</code>创建的，隐式网格是为了放显式网格放不下的元素，浏览器根据已经定义的显式网格自动生成的网格部分，可以根据<code>grid-auto-rows</code> 和 <code>grid-auto-columns</code>来手动设置隐式网格的大小。
* <code>minmax(100px, auto)</code>, 尺寸至少为 100 像素，并且如果内容尺寸大于 100 像素则会根据内容自动调整。
* <code>grid-column</code> 和 <code>grid-row</code>，指定从那条线开始到哪条线结束。  
* <code>grid-template-areas</code>:
```css
.container {
  display: grid;
  grid-template-areas:
      "header header"
      "sidebar content"
      "footer footer";
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;
}

header {
  grid-area: header;
}

article {
  grid-area: content;
}

aside {
  grid-area: sidebar;
}

footer {
  grid-area: footer;
}
```

### 浮动

浮动元素会脱离正常的文档布局流，并吸附到其父容器的左边。在正常布局中位于该浮动元素之下的内容，此时会围绕着浮动元素，填满其右侧的空间。

<div id="css-page-8">
  <p>This is my very important paragraph.
  I am a distinguished gentleman of such renown that my paragraph
  needs to be styled in a manner befitting my majesty. Bow before
  my splendour, dear students, and go forth and learn CSS!</p>
</div>

```html
<p>This is my very important paragraph.
I am a distinguished gentleman of such renown that my paragraph
needs to be styled in a manner befitting my majesty. Bow before
my splendour, dear students, and go forth and learn CSS!</p>
```

```css
p {
  width: 400px;
  margin: 0 auto;
}

p::first-line {
  text-transform: uppercase;
}

p::first-letter {
  font-size: 3em;
  border: 1px solid black;
  background: red;
  float: left;
  padding: 2px;
  margin-right: 4px;
}
```

#### 高度塌陷

子元素浮动后，将会无法撑起父元素的高度，导致父元素的高度丢失

#### BFC, Block Formatter Context (块级格式化环境)

- css中的隐含属性，可以为一个元素开启BFC。开启BFC，该元素会变成一个独立的布局区域。  
- 元素开启BFC后的特点：
    - 解决外边距重叠
    - 开启BFC后的元素不会被浮动元素覆盖
    - 开启BFC的元素子元素和父元素外边距不会重叠
    - 开启BFC的元素可以包含浮动的子元素
- 可以通过特殊方式开启BFC
    - 设置元素浮动
    - 将元素设为行内块元素
    - 将元素的overflow设置为非visible的值
        - overflow: hidden或auto

#### clear

清除浮动元素对当前元素所产生的影响  
可选值：

- left 清除左浮动元素对当前元素的影响
- right 清除右浮动元素对当前元素的影响
- both 清除两侧中最大影响的那侧

原理：设置清除浮动后，浏览器会自动为元素添加上外边距，以使其位置不受其他元素的影响

- 使用 <code>clear</code> 和 <code>::after</code>处理高度塌陷问题
```html
<style>
  .box1{
    border: 1px solid red;
  }
  .box2{
    width: 100px;
    height: 100px;
    background-color: green;
    float: left;
  }
  .box1::after {
    clear: both;
    display: block;
    content: '';
  }
</style>
<div class="box1">
  <div class="box2"></div>
</div>
```
- 处理外边距重叠问题
```html
<style>
  .box1 {
    background-color: yellowgreen;
  }

  .box2 {
    width: 100px;
    height: 100px;
    background-color: green;
    margin-top: 50px;
  }

  .box1::before {
    content: '';
    display: table;
  }
</style>
<div class="box1">
  <div class="box2"></div>
</div>
``` 

综合以上代码, 使用 <code>clearfix</code> 解决高度塌陷和外边距重叠问题
```html
<style>
  .clearfix::before,
  .clearfix::after{
    content: '';
    display: table;
    clear: both;
  }
</style>
<div class="clearfix">
  <div class="box2"></div>
</div>
```

### 定位<code>position</code>

#### 相对定位<code>position: relative;</code>

例子:
<div id="css-page-9">
  <h1>Basic document flow</h1>
  <p>I am a basic block level element. My adjacent block level elements sit on new lines below me.</p>
  <p class="positioned">By default we span 100% of the width of our parent element, and we are as tall as our child content. Our total width and height is our content + padding + border width/height.</p>
  <p>We are separated by our margins. Because of margin collapsing, we are separated by the width of one of our margins, not both.</p>
  <p>inline elements <span>like this one</span> and <span>this one</span> sit on the same line as one another, and adjacent text nodes, if there is space on the same line. Overflowing inline elements will <span>wrap onto a new line if possible (like this one containing text)</span>, or just go on to a new line if not, much like this image will do: <img src="https://mdn.github.io/learning-area/css/css-layout/positioning/long.jpg"></p>
</div>

第二段设置为<code>position: relative;</code>，添加<code>top: 30px;left: 30px;</code>

#### 绝对定位<code>position: absolute;</code>

例子:
<div id="css-page-10">
  <h1>Basic document flow</h1>
  <p>I am a basic block level element. My adjacent block level elements sit on new lines below me.</p>
  <p class="positioned">By default we span 100% of the width of our parent element, and we are as tall as our child content. Our total width and height is our content + padding + border width/height.</p>
  <p>We are separated by our margins. Because of margin collapsing, we are separated by the width of one of our margins, not both.</p>
  <p>inline elements <span>like this one</span> and <span>this one</span> sit on the same line as one another, and adjacent text nodes, if there is space on the same line. Overflowing inline elements will <span>wrap onto a new line if possible (like this one containing text)</span>, or just go on to a new line if not, much like this image will do: <img src="https://mdn.github.io/learning-area/css/css-layout/positioning/long.jpg"></p>
</div>

第二段设置为<code>position: absolute;</code>, 父元素设置为<code>position: relative;</code>, 添加<code>top: 30px;left: 30px;</code>

#### 固定定位<code>position: fixed;</code>

与绝对定位的工作方式完全相同，只有一个主要区别：绝对定位固定元素是相对于 <code>&lt;html&gt;</code> 元素或其最近的定位祖先，而固定定位固定元素则是相对于浏览器视口本身。

查看[例子](https://mdn.github.io/learning-area/css/css-layout/positioning/6_fixed-positioning.html)

#### 粘性定位<code>position: sticky;</code>

是相对位置和固定位置的混合体，它允许被定位的元素表现得像相对定位一样，直到它滚动到某个阈值点（例如，从视口顶部起 1​​0 像素）为止，此后它就变得固定了。

查看[例子](../example/position_sticky.html)

#### z-index

对于开启了定位的元素，可以通过z-index指定元素的层级

祖先元素层级再高，也不会盖住后代元素

### 多列布局
<code>column-count: 3;</code> 将创建指定数量的列  
<code>column-width: 200px;</code> 将按照指定的宽度尽可能多的创建列, 任何剩余的空间之后会被现有的列平分。这意味着可能无法期望得到指定的宽度，除非容器的宽度刚好可以被你指定的宽度除尽。  
<code>column-gap: 20px;</code> 改变列间间隙。  
<code>column-rule: 4px dotted rgb(79, 185, 227);</code> 在列间加入一条分割线。  
<code>break-inside: avoid;</code> 避免列与内容折断。  

### 媒体查询

```css
@media media-type and (media-feature-rule) {
  /* CSS rules go here */
}
```

媒体类型:   

* <code>all</code>  
* <code>print</code>  
* <code>screen</code>  
* <code>speech</code>  

媒体特征规则:  

* 宽和高: <code>min-width</code>, <code>max-width</code>, <code>width</code>  
* 朝向: <code>orientation</code> 竖放(portrait),横放(landscape)  
* 使用指点设备: <code>hover: hover</code> 触摸屏和键盘导航没法实现悬浮，用户不能悬浮的话，可以默认显示一些交互功能  


```css
/*  body 的文字只会在视口至少为 400 像素宽，且设备横放时变为蓝色 */
@media screen and (min-width: 400px) and (orientation: landscape) { 
  body {
    color: blue;
  }
}
/* 文本会在视口至少为 400 像素宽的时候或者设备处于横放状态的时候变为蓝色 */
@media screen and (min-width: 400px), screen and (orientation: landscape) { 
  body {
    color: blue;
  }
}
/* 文本只会在朝向为竖着的时候变成蓝色 */
@media not all and (orientation: landscape) {
  body {
    color: blue;
  }
}
```

## animation

### 过渡
通过过渡(transition)可以指定一个属性发生变化时的切换方式

```css
*{
  /* 
    transition-property 指定要执行过渡的属性, 所有属性用all
  */
  transition-property: width, height;

  /* transition-duration 过渡效果的持续时间, 单位 1s 1000ms */
  transition-duration: 2s;

  /* 
    过渡执行方式 
    可选值: ease 默认值; linear 匀速; ease-in 加速; ease-out 减速
  */
  transition-timing-function: ease;

  /* 过渡时间的延迟 */
  transition-delay: 2s;

  /* 设置所有相关属性 */
  transition: margin-left 2s steps(3);
}
```

### 动画

```css
/* 关键帧 */
@keyframes test{
  /* 动画开始位置,from可以替换为0% */
  from{
    margin-left: 0;
  }

  /* 可以设置其他百分比 */

  /* 动画结束位置,to可以替换为100% */
  to{
    margin-left: 700px;
  }
}

.box{
  animation-name: test;
  animation-duration: 2s;
  /* 动画执行次数 */
  animation-iteration-count: infinite;
  /* 动画运行的方向,alternate表示从from到to，再从to到from */
  animation-direction: alternate;
  /* 动画运行状态,可以设置为running和paused */
  animation-play-state: paused;
  /* forwards表示动画执行完毕停在to的位置，而不是元素原来的位置 */
  animation-fill-mode: forwards;
}
```

### 变形

变形不会影响页面布局
```css
.box{
  /* 实现水平垂直居中 */
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
}
```

### 缩放

```css
.box{
  /* 
    scaleX() 水平方向缩放
    scaleY() 垂直方向缩放
    scale() 双方向缩放
  */
  transform: scaleX(2);
}
```

## less

```less
// 引入
@import 'syntax2.less';

// less 单行注释
.box1{
  background-color: #bfa;

  .box2{
    background-color: #ff0;

    .box3{
      background-color: orange;
    }
  }
}

// 变量
@a:100px;
@b:#bfa;
@c:box6;

.box5{
  width: @a;
  color: @b;
}

// 作为类名或者值的一部分使用变量
.@{c}{
  width: @a;
  background-color: url("@{c}/1.png");
}


@d:200px;
@d:300px;

div{
  width: @d; // 300px
  height: @e; // 335px
}

@e:335px;

div{
  width: @e;
  height: $width; //使用width中的值
}

// 子元素选择器
.box11{
  >.box21{
    color: red;
  }
  //& 表示外层的父元素
  &:hover{
    color: #bfa;
  }
}

.p1{
  width: 100px;
  height: 200px;
}
//:extend() 对当前选择器扩展指定选择器的样式
.p2:extend(.p1){
  color: red;
}

.p3{
  // 直接对指定样式引用，相当于将p1的样式在这里复制
  .p1();
}

//相当于创建了一个函数(mixins)
.p4(){
  width: 100px;
  height: 100px;
  background-color: #bfa;
}

.p5{
  .p4;
}

// 设置参数
.test(@w:300px){
  width: @w;
  height: 100px;
}
div{
  .test(100px);
}
div{
  .test(@w:200px);
}

span{
  color: average(red,yellow);
}

body{
  width: 100px;
  height: 100px;
  background-color: @b;
  &:hover{
    background-color: darken(@b, 10%);
  }
}

// 数值可以运算
div{
  width: @a + @a + 100px;
}
```
