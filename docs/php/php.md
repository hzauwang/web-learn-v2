# PHP

## 基础学习

根据[菜鸟教程](https://www.runoob.com/php/php-tutorial.html)了解其基础语法后即可学习[ThinkPHP框架](tp.md)。

## 代码测试在线工具

[http://www.dooccn.com/php5.5/](http://www.dooccn.com/php5.5/)

## 其它

### 使用PHP调用R脚本
1. 首先需要赋予www-data用户在工作目录的读写权限
2. R脚本中如果使用到第三方包，需要引入第三方包所在的库路径
```R
.libPaths(c("/store/dxliu/R/x86_64-pc-linux-gnu-library/3.6/"))
```
3. 使用PHP中的exec函数调用Linux命令, 返回结果解读参考[PHP手册](https://www.php.net/manual/zh/function.exec.php)
```PHP
exec("Rscript example.R", $output, $return_var);
```