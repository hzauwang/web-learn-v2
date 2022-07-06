## 输入值异常检测

* 检查空输入以及错误输入
* 输入后的反馈
  ```html
  <!-- bootstrap3的警告框 -->
  <div class="alert alert-success" role="alert">...</div>
  <div class="alert alert-info" role="alert">...</div>
  <div class="alert alert-warning" role="alert">...</div>
  <div class="alert alert-danger" role="alert">...</div>
  ```
  ```html
  <!-- element的警告框 -->
  <template>
    <el-alert title="成功提示的文案" type="success"></el-alert>
    <el-alert title="消息提示的文案" type="info"></el-alert>
    <el-alert title="警告提示的文案" type="warning"></el-alert>
    <el-alert title="错误提示的文案" type="error"> </el-alert>
  </template>
  ```

## 输入框禁用
  ```html
  <input id="input1">
  <input id="input2">
  <input id="input3">

  <script>
    //input1绑定输入事件: input1为空时，启用input2与input3，否则禁用input2和input3
    $('#input1').bind('input propertychange', function() {
      if($('#input1')[0].value == ''){
          $('#input2').removeAttr("disabled");
          $('#input3').removeAttr("disabled");
      }else{
          $('#input2').attr("disabled", "disabled");
          $('#input3').attr("disabled", "disabled");
      }
    })
  </script>
  ```

## 用户提交数据后

### 在提交的数据结果返回前禁用提交按钮并给出加载中反馈

=== "JavaScript"

    ```html
    <!-- bootstrap3 -->
    <button type="button" id="myButton" data-loading-text="Loading..." class="btn btn-primary">
      Loading state
    </button>

    <script>
      $('#myButton').on('click', function () {
        var $btn = $(this).button('loading')
        // business logic...
        $btn.button('reset')
      })
    </script>
    ```
    详细效果请查看[Bootstrap3](https://v3.bootcss.com/javascript/#buttons)

=== "Vue"

    使用element中的组件, 具体效果请查看[Element](https://element.eleme.cn/#/zh-CN/component/button#jia-zai-zhong)
    ```html
    <!-- Element -->
    <el-button type="primary" :loading="true">加载中</el-button>
    ```

  
### 使用css3实现加载中  
  [https://www.webhek.com/post/css-loaders.html](https://www.webhek.com/post/css-loaders.html)  
  [https://www.jianshu.com/p/9b0e83281d70](https://www.jianshu.com/p/9b0e83281d70)