<style>
  .card-container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }
  .card-item{
    padding: 15px;
    cursor: pointer;
    border-radius: 10px;
    background-color: #f6f6f6;
  }
  .card-item:hover{
    background-color: #f1f1f1;
  }
  .card-header{
    color: #4051B5;
    font-weight: bold;
  }
</style>

<div class="card-container">
  <div class="card-item" data-href="/html_css/html/">
    <div class="card-header">
      About HTML
    </div>
    <div class="card-main">
      HTML，即超文本标记语言（Hyper Text Markup Language）
    </div>
  </div>
  <div class="card-item" data-href="/html_css/css/">
    <div class="card-header">
      About CSS
    </div>
    <div class="card-main">
      层叠样式表（Cascading StyleSheet）
    </div>
  </div>
  <div class="card-item" data-href="/js/js/">
    <div class="card-header">
      About JavaScript
    </div>
    <div class="card-main">
      JavaScript 是 Web 的编程语言
    </div>
  </div>
  <div class="card-item" data-href="/js/axios/">
    <div class="card-header">
      About axios
    </div>
    <div class="card-main">
      基于promise 的 HTTP 库
    </div>
  </div>
  <div class="card-item" data-href="/js/nodejs/">
    <div class="card-header">
      About Node.js
    </div>
    <div class="card-main">
      Node.js 是运行在服务端的 JavaScript
    </div>
  </div>
  <div class="card-item" data-href="/js/webpack/">
    <div class="card-header">
      About Webpack
    </div>
    <div class="card-main">
      Webpack 是一个前端资源加载/打包工具。
    </div>
  </div>
  <div class="card-item" data-href="/js/Vue/">
    <div class="card-header">
      About Vue.js
    </div>
    <div class="card-main">
      Vue.js 是一套构建用户界面的渐进式框架。
    </div>
  </div>
  <div class="card-item" data-href="/php/php/">
    <div class="card-header">
      About PHP
    </div>
    <div class="card-main">
      PHP 是一种通用开源脚本语言
    </div>
  </div>
  <div class="card-item" data-href="/mysql/mysql/">
    <div class="card-header">
      About MySQL
    </div>
    <div class="card-main">
      MySQL 是一个关系型数据库管理系统
    </div>
  </div>
  <div class="card-item" data-href="/linux/linux/">
    <div class="card-header">
      About Linux
    </div>
    <div class="card-main">
      Linux是一套免费使用和自由传播的类Unix操作系统
    </div>
  </div>
</div>

<script>
  window.onload = function() {
    document.querySelectorAll('.card-item').forEach(item => {
      item.addEventListener('click', function(){
        let url = this.getAttribute('data-href').split('')
        url.shift()
        window.location += url.join('')
      })
    })
  }
</script>
