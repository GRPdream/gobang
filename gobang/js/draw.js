export default function draw(width, height, context, chess, title, time) {


  //清屏
  context.clearRect(0, 0, width, height)

  //绘制棋盘的外边界
  const widthStart = (width - 300) / 2
  const heightStart = (height - 300) / 2
  const widthEnd = (width + 300) / 2
  const heightEnd = (height + 300) / 2
  context.shadowBlur = 2
  context.shadowColor = "black"
  context.shadowOffsetX = 2
  context.shadowOffsetY = 2
  context.fillStyle = 'white'
  context.fillRect(0, 0, width, height)
  context.strokeStyle = "#d6d1d1"
  context.strokeRect(widthStart, heightStart, 300, 300) //创建一个 300*300 的棋盘

  //绘制头部数字
  context.font = "35px Arial"
  context.fillStyle = 'black'
  context.fillText(time, (width - 30) / 2, (height - 400) / 2)

  //绘制底部文字
  context.font = "30px Arial"
  context.fillText(title, (width - 120) / 2, (height + 400) / 2);

  //绘制棋盘的线
  const part = Math.ceil(0.9 / 12 * width)   /* 计算大概每一格的距离，向上取整 */
  for (let i = 1; i < 12; i++) {
    context.beginPath()   //画横线
    context.moveTo(widthStart, heightStart + i * 25)
    context.lineTo(widthEnd, heightStart + i * 25)
    context.stroke()

    context.beginPath()   //画竖线
    context.moveTo(widthStart + i * 25, heightStart)
    context.lineTo(widthStart + i * 25, heightEnd)
    context.stroke()
  }

  //遍历数组，绘制棋子
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 13; j++) {
      if (chess[i][j] == 1) {
        // 1 是黑色棋子，2 是白色
        context.beginPath()
        context.arc(widthStart + j * 25, heightStart + i * 25, 10, 0, 2 * Math.PI)
        var grd = context.createRadialGradient(widthStart + j * 25, heightStart + i * 25, 1, widthStart + j * 25, heightStart + i * 25, 10) //获取渐变色
        grd.addColorStop(0, "#636766")
        grd.addColorStop(1, "#0a0a0a")
        context.fillStyle = grd
        context.fill()
        context.closePath()
      } else if (chess[i][j] == 2) {
        context.beginPath()
        context.arc(widthStart + j * 25, heightStart + i * 25, 10, 0, 2 * Math.PI)
        var grd = context.createRadialGradient(widthStart + j * 25, heightStart + i * 25, 5, widthStart + j * 25, heightStart + i * 25, 10) 
        grd.addColorStop(0, "#f5f5f5")
        grd.addColorStop(1, "#e1e1e1")
        context.fillStyle = grd
        context.fill()
        context.closePath()
      }
    }
  }
}