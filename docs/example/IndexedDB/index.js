const list = document.querySelector('ul')
const titleInput = document.querySelector('#title')
const bodyInput = document.querySelector('#body')
const form = document.querySelector('form')
const submitBtn = document.querySelector('form button')

// Create an instance of a db object for us to store the open database in
let db

window.onload = function () {
  // Open our database
  let request = window.indexedDB.open('notes', 1)

  request.onerror = function () {
    console.log('Database failed to open')
  }

  request.onsuccess = function () {
    console.log('Database opened successfully')
    db = request.result
    displayData()
  }

  // 如果尚未设置数据库，或者使用比现有存储数据库更大的版本号打开数据库（执行升级时），则运行此处理程序
  request.onupgradeneeded = function (e) {
    // 获取对打开的数据库的引用
    let db = e.target.result
    // 创建一个新的对象库。相当于传统数据库系统中的单个表
    let objectStore = db.createObjectStore('notes', {
      keyPath: 'id',
      autoIncrement: true
    })
    // 创建另外两个索引（字段）
    objectStore.createIndex('title', 'title', { unique: false })
    objectStore.createIndex('body', 'body', { unique: false })
    console.log('Database setup complete')
  }

  form.onsubmit = addData

  function addData(e) {
    // 停止以传统方式实际提交的表单（这将导致页面刷新）
    e.preventDefault()
    // 创建一个输入数据库的记录的对象, id值自动填充
    let newItem = { title: titleInput.value, body: bodyInput.value }
    // 打开对象存储的readwrite事务
    let transaction = db.transaction(['notes'], 'readwrite')
    // 使用IDBTransaction.objectStore()方法访问对象库
    let objectStore = transaction.objectStore('notes')
    let request = objectStore.add(newItem)
    request.onsuccess = function () {
      titleInput.value = ''
      bodyInput.value = ''
    }
    transaction.oncomplete = function () {
      console.log('Transaction completed: database modification finished.')
      displayData()
    }
    transaction.onerror = function () {
      console.log('Transaction not opened due to error')
    }
  }

  function displayData() {
    // 清空列表
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }
    // 使用IDBDatabase.transaction()和IDBTransaction.objectStore()得到对象存储的引用
    let objectStore = db.transaction('notes').objectStore('notes')
    // 使用IDBObjectStore.openCursor()方法打开对游标的请求
    objectStore.openCursor().onsuccess = function (e) {
      // 获取对游标本身（对象）的引用
      let cursor = e.target.result
      if (cursor) {
        let listItem = document.createElement('li')
        let h3 = document.createElement('h3')
        let para = document.createElement('p')

        listItem.appendChild(h3)
        listItem.appendChild(para)
        list.appendChild(listItem)

        h3.textContent = cursor.value.title
        para.textContent = cursor.value.body
        listItem.setAttribute('data-note-id', cursor.value.id)

        let deleteBtn = document.createElement('button')
        listItem.appendChild(deleteBtn)
        deleteBtn.textContent = 'Delete'
        deleteBtn.onclick = deleteItem

        // 将游标前进到数据存储区中的下一条记录
        cursor.continue()
      } else {
        if (!list.firstChild) {
          let listItem = document.createElement('li')
          listItem.textContent = 'No notes stored.'
          list.appendChild(listItem)
        }

        console.log('Notes all displayed')
      }
    }
  }

  function deleteItem(e) {
    let noteId = Number(e.target.parentNode.getAttribute('data-note-id'))

    let transaction = db.transaction(['notes'], 'readwrite')
    let objectStore = transaction.objectStore('notes')
    // 使用IDBObjectStore.delete()方法从数据库中删除记录
    objectStore.delete(noteId)

    transaction.oncomplete = function () {
      e.target.parentNode.parentNode.removeChild(e.target.parentNode)
      console.log('Note ' + noteId + ' deleted.')

      if (!list.firstChild) {
        let listItem = document.createElement('li')
        listItem.textContent = 'No notes stored.'
        list.appendChild(listItem)
      }
    }
  }
}
