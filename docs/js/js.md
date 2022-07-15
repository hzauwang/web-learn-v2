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
