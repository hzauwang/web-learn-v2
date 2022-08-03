MongoDB的数据模型是面向文档的，所谓文档是一种类似于JSON的结构(BSON)。

具体使用查看[官方文档](https://www.mongodb.com/docs/manual/)

## 基本操作

```sql
/* 显示所有数据库 */
show dbs

use 数据库名
/* 显示当前所处的数据库 */
db
/* 显示数据库中所有集合 */
show collections
```

### 插入文档

当向集合中插入文档时，如果没有指定_id，数据库会自动生成

<code>db.collection.insertOne(doc)</code> 插入单个文档  
例子：
  
  ```sql
  db.students.insertOne(
    {
      name:"wang",
      age:18,
      gender:"male"
    }
  )
  ```
<code>db.collection.insertMany()</code> 插入多个文档  

```sql
  db.students.insertMany([
    {
      name:"wang",
      age:18,
      gender:"male"
    },
    {
      name:"zhao",
      age:22,
      gender:"male"
    }
  ])
```

### 查询文档

<code>db.collection.find()</code> 查找集合中所有符合条件的文档,返回数组  
例子:  

  ```sql
  db.students.find()

  db.students.find({
    name: "wang"
  })
  
  db.students.find({
    name: "wang"
  })[0] /* 可以添加索引，指定第几条 */

  db.students.find().count() /* 所有结果的数量 */
  ```

<code>db.collection.findOne()</code> 查找第一个,返回文档对象

### 修改文档

<code>db.collection.updateOne(查询条件, 新对象)</code>

- $set 修改文档中的指定属性
- $unset 删除文档的指定属性

例子:  
```sql
db.students.updateOne(
  {name: "wang"},
  {
    $set:{
      name: "wang2"
    }
  }
)
```

<code>db.collection.updateMany(查询条件, 新对象)</code>

<code>db.collection.replaceOne()</code> 替换文档

### 删除文档

<code>db.collection.deleteMany()</code>  
<code>db.collection.deleteOne()</code>  
<code>db.collection.drop()</code>  
<code>db.dropDatabase()</code> 删除数据库  

```sql
db.students.deleteMany({name: "wang"})

/* 清空集合,性能差 */
db.students.deleteMany({})
/* 以下语句可以删除集合 */
db.students.drop()
```

!!!note
    一般使用一个字段来表示是否删除(逻辑删除)，而不是直接使用delete方法

## 练习

```sql
use my_test
db.users.insertOne({
  username: 'wang'
})
db.users.find()
db.users.insertOne({
  username: 'zhang'
})
db.users.find().count()
db.users.find({
  username: 'wang'
})
db.users.updateOne(
  {username: 'wang'},
  {
    $set: {
      address: 'shanxi'
    }
  }
)
db.users.replaceOne(
  {username: 'zhang'},
  {username: 'zhang2'}
)
db.users.updateOne(
  {username: 'wang'},
  {
    $unset: {
      address: 1
    }
  }
)
db.users.updateOne(
  {username: 'wang'},
  {
    $set: {
      hobby: {
        cities: ['beijing', 'shanghai', 'shenzhen'],
        movies: ['sanguo', 'hero']
      }
    }
  }
)
db.users.updateOne(
  {username: 'zhang2'},
  {
    $set: {
      hobby: {
        movies: ['movie1', 'movie2']
      }
    }
  }
)
/* 内嵌文档查询时必须使用引号 */
db.users.find(
  {'hobby.movies': 'hero'}
)
/* $push向数组中添加一个新的元素 */
/* $addToSet 也是向数组中添加一个新元素, 如果数组中已经存在该元素, 则不会添加 */
db.users.updateOne(
  {username: 'zhang2'},
  {
    $push: {
      'hobby.movies': 'new movie'
    }
  }
)
db.users.deleteOne({'hobby.cities': 'beijing'})
db.users.drop()

/* 插入多条数据 */
var arr = []
for(var i = 1; i < 20000; i++){
  arr.push({num: i})
}
db.numbers.insertMany(arr)
db.numbers.find({num: 500})
/* x>=500 */
db.numbers.find(
  {num: {$gte: 500}}
)
/* x<30 */
db.numbers.find(
  {num: {$lt: 30}}
)
/* 50>x>40 */
db.numbers.find(
  {
    num: {
      $gt: 40,
      $lt: 50
    }
  }
)
/* x<10 || x>19990 */
db.numbers.find(
  {
    $or: [
      {num: {$lt: 10}},
      {num: {$gt: 19990}}
    ]
  }
)
/* 大于19990的增加0.1 */
db.numbers.updateMany(
  {num: {$gt: 19990}},
  {
    $inc: {
      num: 0.1
    }
  }
)
/* 前十条数据 */
db.numbers.find().limit(10)
/* 11条到20条 */
db.numbers.find().skip(10).limit(10)
/* 21到30 */
db.numbers.find().skip(20).limit(10)
/* skip((页码 - 1) * 每页的条数).limit(每页的条数) */
/* skip 和 limit 的顺序对结果没有影响 */
```

## sort

```sql
/* 1表示升序 -1表示降序 */
/* limit skip sort的顺序对结果没有影响 */
db.numbers.find().sort({num:1, num2:-1})
```

## 投影

```sql
/* 第二个参数，类似于MySQL指定字段 */
db.numbers.find({}, {number:1, _id:0})
```

## Mongoose

通过node来操作MongoDB  
[官网](http://mongoosejs.net/)

<code>npm i mongoose --save</code>

### 基本操作
```js
const mongoose = require('mongoose')

/* 
  mongodb://ip地址:端口号/数据库名
  端口号为27017则可以省略
*/
mongoose.connect('mongodb://localhost/test')

/* 
  mongoose对象中的connection表示的是数据库连接，通过监视它的状态，可以监听数据库的连接和断开
*/
mongoose.connection.once('open', function () {
  console.log('数据库连接了')
})
mongoose.connection.once('close', function () {
  console.log('数据库关闭了')
})

/* 
  创建Schema对象
*/
const Schema = mongoose.Schema
const stuSchema = new Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: 'female'
  },
  address: String
})

/* 
  通过Schema来创建Model
  第一个是集合名, 第二个是创建的Schema对象
  mongoose将会自动将集合名改为复数，下列语句创建了students的集合
*/
const StuModel = mongoose.model('student', stuSchema)

/* 
  插入文档
*/
StuModel.create(
  {
    name: 'wang',
    age: 18,
    gender: 'male',
    address: 'shanxi'
  },
  function (err) {
    if (!err) {
      console.log('插入成功')
    }
  }
)
StuModel.create({
  name: 'zhang',
  age: 23,
  gender: 'male',
  address: 'shanxi'
}).then(() => {
  console.log('插入成功')
})

/* 
  查询
    - Model.find(conditions, [projection], [options], [callback])
      - conditions 查询条件
      - projection 投影 { name: 1, _id: 0 }和'name -_id'效果一致
      - options 查询选项(skip, limit)
      - callback
    - Model.findById()
    - Model.findOne()
  返回的doc是Model的实例 (doc instanceof StuModel) === true
*/
StuModel.find(
  { name: 'wang' },
  'name -_id',
  { skip: 1, limit: 1 },
  function (err, docs) {
    if (!err) {
      console.log('查询成功', docs)
    }
  }
)

/* 
  修改
    - Model.update() //废弃
    - Model.updateMany()
    - Model.updateOne()
    - Model.replaceOne()
*/
StuModel.updateMany(
  { name: 'wang' },
  {
    $set: {
      age: 20
    }
  },
  function (err) {
    if (!err) {
      console.log('修改成功')
    }
  }
)

/* 
  删除
    - Model.remove() // 废弃
    - Model.deleteOne()
    - Model.deleteMany()
*/
StuModel.deleteMany({}, function (err) {
  if (!err) {
    console.log('删除成功')
  }
})

/* 
  统计文档数量
    - Model.count()
*/
StuModel.count({}, function (err, count) {
  if (!err) {
    console.log(count)
  }
})

/* 
  断开连接
*/
//mongoose.disconnect()
```

### Document的方法

```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')
mongoose.connection.once('open', function () {
  console.log('数据库连接了')
})
mongoose.connection.once('close', function () {
  console.log('数据库关闭了')
})
const Schema = mongoose.Schema
const stuSchema = new Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: 'female'
  },
  address: String
})
const StuModel = mongoose.model('student', stuSchema)

/* 
  Document和集合中的文档一一对应，Document是Model的实例，通过Model查询到的结果都是Document
*/

const stu = new StuModel({
  name: 'liu',
  age: 5,
  gender: 'female',
  address: 'unknown'
})

stu.save(function (err) {
  if (!err) {
    console.log('保存成功')
  }
})

StuModel.findOne({ name: 'wang' }, function (err, doc) {
  if (!err) {
    doc.update({ $set: { age: 28 } }, function (err) {
      if (!err) {
        console.log('修改成功')
      }
    })
  }
})
```