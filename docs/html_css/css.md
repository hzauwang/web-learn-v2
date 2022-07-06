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
* 邻接兄弟 <code>p + img</code>
* 通用兄弟(选中一个元素的兄弟元素，即使它们不直接相邻) <code>p ~ img</code>

## 盒模型

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

### 盒模型
![盒模型](../images/box-model.png)  
1. 标准盒模型  
  在标准模型中，如果你给盒设置 width 和 height，实际设置的是 content box。 padding 和 border 再加上设置的宽高一起决定整个盒子的大小  
2. 替代（IE）盒模型