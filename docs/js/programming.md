## 修改 this 指向

- 封装函数 f，使 f 的 this 指向指定的对象

```js
function bindThis(f, oTarget) {
    return function(...args) {
        //return f.apply(oTarget, args)
        //return f.call(oTarget, ...args)
        return f.bind(oTarget)(...args)
    }
}
```

## dom 节点查找

查找两个节点的最近的一个共同父节点，可以包括节点自身

```js
function commonParentNode(oNode1, oNode2) {
    while(true){
        oNode1 = oNode1.parentNode;
        if(oNode1.contains(oNode2)){
            return oNode1;
        }
    }
}
```

## 根据包名，在指定空间中创建对象

输入: namespace({a: {test: 1, b: 2}}, 'a.b.c.d')

输出: {a: {test: 1, b: {c: {d: {}}}}}

```js
function namespace(oNamespace, sPackage) {
    const packageList = sPackage.split('.')
    let returnObj = oNamespace
    packageList.forEach(item => {
        if(!(item in returnObj)){
            returnObj[item] = {}
        }
        returnObj = returnObj[item]
    })
    return returnObj
}
```

## 数组去重

为 Array 对象添加一个去除重复项的方法

```js
Array.prototype.uniq = function () {
    return [... new Set(this)]
}
```

## 斐波那契数列

用 JavaScript 实现斐波那契数列函数,返回第n个斐波那契数。 f(1) = 1, f(2) = 1 等

```js
function fibonacci(n) {
    if(n === 1){
        return 1
    }
    if(n === 2){
        return 1
    }
    return fibonacci(n-1) + fibonacci(n-2)
}
```