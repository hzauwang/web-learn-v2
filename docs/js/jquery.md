# jQuery

## jQuery介绍
jQuery 库主要包含:  

* HTML 元素选取与操作, 类似于js中的DOM  
* AJAX: 与后端交换数据  
* 制作动画和特效  
* 大量的第三方插件也会使用到jquery，例如后续介绍的Datatables

## 在线学习网站  

* [jQuery官网](https://jquery.com/)  
* [菜鸟教程](https://www.runoob.com/jquery/jquery-tutorial.html)  
* [W3school](https://www.w3school.com.cn/jquery/index.asp)  

!!! note
    了解jQuery操作html元素的方法, 学习AJAX异步通信。

## Datatables
Datatables是一款jquery表格插件, 详细配置选项介绍见[官网](http://datatables.club/)。

### DataTables的简单使用  
```html
<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="http://cdn.datatables.net/1.10.21/css/jquery.dataTables.css">
<!-- jQuery -->
<script type="text/javascript" charset="utf8" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<!-- DataTables -->
<script type="text/javascript" charset="utf8" src="http://cdn.datatables.net/1.10.21/js/jquery.dataTables.js"></script>

<table id="table_id_example" class="display">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row 1 Data 1</td>
            <td>Row 1 Data 2</td>
        </tr>
        <tr>
            <td>Row 2 Data 1</td>
            <td>Row 2 Data 2</td>
        </tr>
    </tbody>
</table>

<script>
$(document).ready( function () {
    //初始化datatables表格
    $('#table_id_example').DataTable();
} );
</script>
  ```

### 使用对象初始化Datatables表格  
```html
<table id="table" class="display">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

<script>
  var data = [
    {
      col1: 'Row 1 Data 1',
      col2: 'Row 1 Data 2'
    },
    {
      col1: 'Row 2 Data 1',
      col2: 'Row 2 Data 2'
    }
  ]
  $('#table').DataTable( {
    data: data,
    //使用对象数组，一定要配置columns，告诉 DataTables 每列对应的属性
    //data 这里是固定不变的，name，position，salary，office 为你数据里对应的属性
    columns: [
      { data: 'col1' },
      { data: 'col2' }
    ]
  } )
</script>
```

### 表格中加入选择框
```html
<!-- 除了创建Datatables时所引用的，还需引入以下文件 -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/select/1.3.3/css/select.dataTables.min.css">
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/select/1.3.3/js/dataTables.select.min.js"></script>

<table id="example" class="display">
  <thead>
    <tr>
      <th>
        <!-- 全选框 -->
        <input id="checkbox" class="select-checkbox" type="checkbox">
      </th>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td>Row 1 Data 1</td>
      <td>Row 1 Data 2</td>
    </tr>
    <tr>
      <td></td>
      <td>Row 2 Data 1</td>
      <td>Row 2 Data 2</td>
    </tr>
  </tbody>
</table>

  <script>
  $(document).ready(function() {
    var table = $('#example').DataTable({
      columnDefs: [{
        orderable: false,
        className: 'select-checkbox',
        targets: 0
      }],
      select: {
        style: 'os',
        //多选 style: 'multiple',
        selector: 'td:first-child'
      },
      //按第一列升序排序
      order: [[1, 'asc']]
    });

    //设置全选框事件
    $("#hap_checkbox").change(function() {
      if ($("#hap_checkbox").is(':checked')) {
        table.rows().select();
      } else {
        table.rows().deselect();
      }
    })

    //自动选择第一行
    table.row(':eq(0)', { page: 'current' }).select()

    //获取被选择的数据
    var selected_data = table.rows('.selected').data()
  })
  });
</script>
```

### 增加表格下载插件
```html
<!-- 除了创建Datatables时所引用的，还需引入以下文件 -->
<!-- 按输出格式，自行选择需要的js文件 -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/2.0.1/css/buttons.dataTables.min.css">
<script type="text/javascript" src="https://cdn.datatables.net/buttons/2.0.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/2.0.1/js/buttons.html5.min.js"></script>
<table id="example" class="display">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1 Data 1</td>
      <td>Row 1 Data 2</td>
    </tr>
    <tr>
      <td>Row 2 Data 1</td>
      <td>Row 2 Data 2</td>
    </tr>
  </tbody>
</table>

<script>
  $(document).ready(function() {
    var table = $('#example').DataTable({
      dom: 'Bfrtip',
      buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
      ]
    });
  });
</script>
```

### 使用搜索框对表格进行筛选，获取筛选后的数据
```JavaScript
//table变量同上
table.rows({search:'applied'} ).data()
```

### 修复Datatables表头的列宽与表格内部的列宽不符
```JavaScript
  $('#example').DataTable({
    //...
    "fnInitComplete": function() {
      this.fnAdjustColumnSizing(true)
    },
    //...
  })
```

## 基于jQuery的多级选择框

css、js文件下载页面: [https://www.jq22.com/jquery-info17813](https://www.jq22.com/jquery-info17813)  
API文档: [Selectivity.js](https://www.jq22.com/yanshi17813)
!!! Tip
    在使用Vue搭建的页面中可直接使用[Element](https://element.eleme.cn/#/zh-CN/component/cascader#cascader-ji-lian-xuan-ze-qi)提供的选择器。
    
### 示例

```html
  <link rel="stylesheet" type="text/css" href="http://yanglab.hzau.edu.cn/static/css/selectivity-jquery.css">
  <script type="text/javascript" charset="utf8" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
  <script type="text/javascript" charset="utf8" src="http://yanglab.hzau.edu.cn/static/js/selectivity-jquery.js"></script>

  <div style="width:300px">
    <div id="selectivity"></div>
  </div>

  <script>
    $(document).ready(function() {
      $('#selectivity').selectivity({
        allowClear: true,
        items: [
          {
            id: 'item1',
            text: 'item1',
            submenu: {
              items: [
                { id: 'item1-1', text: 'item1-1' },
                { id: 'item1-2', text: 'item1-2' },
                { id: 'item1-3', text: 'item1-3' },
                { id: 'item1-4', text: 'item1-4' }
              ]
            }
          },
          {
            id: 'item2',
            text: 'item2',
            submenu: {
              items: [
                {
                  id: 'item2-1',
                  text: 'item2-1',
                  submenu: {
                    items: [
                      {
                        id: 'item2-1-1',
                        text: 'item2-1-1',
                        submenu: {
                          items: [
                            { id: 'item2-1-1-1', text: 'item2-1-1-1' }
                          ]
                        }
                      },
                      {
                        id: 'item2-1-2',
                        text: 'item2-1-2',
                        submenu: {
                          items: [
                            { id: 'item2-1-2-1', text: 'item2-1-2-1' },
                            { id: 'item2-1-2-2', text: 'item2-1-2-2' }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  id: 'item2-2',
                  text: 'item2-2',
                  submenu: {
                    items: [
                      {
                        id: 'item2-2-1',
                        text: 'item2-2-1',
                        submenu: {
                          items: [
                            { id: 'item2-2-1-1', text: 'item2-2-1-1' }
                          ]
                        }
                      },
                      {
                        id: 'item2-2-2',
                        text: 'item2-2-2',
                        submenu: {
                          items: [
                            { id: 'item2-2-2-1', text: 'item2-2-2-1' },
                            { id: 'item2-2-2-2', text: 'item2-2-2-2' }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        placeholder: 'No item selected',
        showSearchInputInDropdown: false
      })
    })
  </script>
```
### 常用函数

```JavaScript
  //可在生成选择框后使用，来自动选择某一项
  $('#selectivity').selectivity('value', 'item2-2-2-1')

  //获取被选择的值
  $('#selectivity').selectivity('value')

  //获取被选择的text属性
  $('#selectivity').selectivity('data').text
```

## 输入框禁用

[输入框禁用](../more/user_inter.md#_2)