const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
//修改并获取画布宽度和高度
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)

//定义随机整数函数
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
//定义随机颜色函数
function randomColor() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
}
//Ball 构造器
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x //球初始x轴位置
    this.y = y //球初始y轴位置
    this.velX = velX //x轴速度，即x轴增量
    this.velY = velY //y轴速度，即y轴增量
    this.color = color //球的颜色
    this.size = size //球的大小
  }
  //画出小球
  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill()
  }
  //更新小球位置
  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX
    }
    if (this.x - this.size <= 0) {
      this.velX = -this.velX
    }
    if (this.y + this.size >= height) {
      this.velY = -this.velY
    }
    if (this.y - this.size <= 0) {
      this.velY = -this.velY
    }
    this.x += this.velX
    this.y += this.velY
  }
  //碰撞检测
  collisionDetect() {
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i]
      if (this !== ball) {
        const dx = this.x - ball.x
        const dy = this.y - ball.y
        const distance = Math.sqrt(dx ** 2 + dy ** 2)
        if (distance <= this.size + ball.size) {
          ball.velX = -ball.velX
          ball.velY = -ball.velY
          this.velX = -this.velX
          this.velY = -this.velY
          this.color = randomColor()
          ball.color = randomColor()
        }
      }
    }
  }
}
//存储所有小球
let balls = []

for (let i = 0; i < 50; i++) {
  let size = random(10, 20)
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size
  )
  balls.push(ball)
}
//运动循环
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 1)'
  ctx.fillRect(0, 0, width, height)
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i]
    ball.draw()
    ball.update()
    ball.collisionDetect()
  }
  requestAnimationFrame(loop)
}

loop()
