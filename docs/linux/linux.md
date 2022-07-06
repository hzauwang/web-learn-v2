# Linux

## 电子书

[鸟哥的Linux私房菜](https://pan.baidu.com/s/1mUo4oa1WPnoFdg7Of93TyA) (提取码: 99oy)  

## 作重集群

[作重计算平台用户手册](http://211.69.140.142:8000/linux/047-grep/)

## 常用命令

### vim删除文件中的空行
```shell
:g/^$/d
```

### awk删除某一列
```shell
#删除第一列
awk '{$1=null;print $0}' filename
```

### awk中匹配正则表达式
```shell
#输出第一列匹配到scaffold*的行
awk '{if($1~/scaffold*/) print $0}' filename
```

### 删除字符串中的换行符
```shell
echo $var |tr -d '\n\r'
```

### 免输入密码进行scp传输
```shell
#-p 指定密码
sshpass -p '123456' scp root@host_ip:/home/test/t ./tmp/
```

### 创建新用户
```shell
#添加用户
useradd user_name
#添加密码
passwd user_name
#修改用户登入后所使用的shell
usermod -s /bin/bash user_name
#添加用户到组
gpasswd -a user_name group_name
#指定用户家目录
usermod -d /store/user_name user_name
#修改uid
usermod -u 1095 user_name
#修改gid
groupmod -g 1007 group_name
```