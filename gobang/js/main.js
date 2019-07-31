import draw  from './draw'
import { chess } from './chessinit'
import checkwin from './checkwin'
const Bmob = require('./libs/Bmob-1.7.0.min.js')

//console.log(chess)

/*   游戏主函数  */
export default class Main {
  constructor() {
    //构造函数
    //canvas = wx.createCanvas()
    //这里 weapp-adapter 自主创建了一个上屏 canvas 并作为全局变量暴露了出来，所以之后
    //我们自己创建的 canvas 都作为离屏 canvas 存在，如果想要将其显示出来，需要将其绘制
    //在上屏 canvas 中
    this.context = canvas.getContext('2d')
    this.height = canvas.height    //获得画布的宽高
    this.width = canvas.width
    this.widthStart = (this.width - 300) / 2
    this.heightStart = (this.height - 300) / 2
    this.widthEnd = (this.width + 300) / 2
    this.heightEnd = (this.height + 300) / 2
    this.flag  // flag 为真时为白子，为假时为黑子
    //this.start = false //开始标志

    //打开抗锯齿
    canvas.width = canvas.width * window.devicePixelRatio
    canvas.height = canvas.height * window.devicePixelRatio
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio)

    draw(this.width, this.height, this.context, chess, "还未开始", 0)
    this.paly()
  }

  paly() {
    var start = false
    var time = 30
    var turn = true

    wx.connectSocket({
      url: 'ws://192.168.137.1:8080/',
      success: function(res) {
        wx.showLoading({
          title: "匹配对手中···",
        })
      }
    })

    wx.onSocketOpen( () => {
    console.log("连接已打开")

    wx.onSocketMessage( (res) => {
      let servermsg = JSON.parse(res.data)
      if (servermsg.status == 0) { 
        console.log(servermsg)
        wx.hideLoading()
        if (servermsg.flag) {  //白子执先
          start = true 
        }
        draw(this.width, this.height, this.context, chess, "白棋落子", time)
        this.flag = servermsg.flag
        this.interval = setInterval( () => {
          if(time == 0) {
            wx.sendSocketMessage({
              data: JSON.stringify([this.flag]),
              success: (res) => console.log("超时发送成功")
            })
            time = 30
            //clearInterval(interval)
          }
          time -= 1
          if(turn == true) {
            draw(this.width, this.height, this.context, chess, "白棋落子", time)
          }else {
            draw(this.width, this.height, this.context, chess, "黑棋落子", time)
          }
        },1000)
      } else if (servermsg.status == 1) {
        console.log(servermsg)
        chess[servermsg.i][servermsg.j] = 1 + servermsg.flag
        if (servermsg.flag) {
          turn = false
          draw(this.width, this.height, this.context, chess, "黑棋落子", time)
        }else {
          turn = true
          draw(this.width, this.height, this.context, chess, "白棋落子", time)
        }
        wx.vibrateShort()
        start = true
        time = 30
      } else if (servermsg.status == 2) {
        if (servermsg.flag == true) {  //白棋赢了
          wx.showToast({
            title: 'WhiteWin',
            duration: 3000
          })
        } else {
          wx.showToast({
            title: 'BlackWin',
            duration: 3000
          })
        }
        wx.closeSocket()
      } else if (servermsg.status == 3) {
        if (servermsg.flag == true) {  //白方超时，黑方获胜
          wx.showToast({
            title: '白超时，黑获胜',
            duration: 3000
          })
        } else {
          wx.showToast({
            title: '黑超时，白获胜', 
            duration: 3000
          })
        }
        clearInterval(this.interval)
        wx.closeSocket()
      }
    })

    //监听触摸事件  
    wx.onTouchStart((changedTouches) => {  //这里用 onTouchStart 或是 onTouchEnd 还要考虑,这里必须用箭头函数
      if( start ) {
        let x = Math.round(changedTouches.touches[0].clientX)
        let y = Math.round(changedTouches.touches[0].clientY)
        if (x > this.widthStart && x < this.widthEnd && y > this.heightStart && y < this.heightEnd) {
          //判断是否在棋盘内
          let j = Math.round((x - this.widthStart) / 25)
          let i = Math.round((y - this.heightStart) / 25)
          //console.log(i, j)
          if (chess[i][j] == 0) {
            chess[i][j] = 1 + this.flag
            if(this.flag) {
              draw(this.width, this.height, this.context, chess, "黑棋落子", time)
              turn = false
            }else{
              draw(this.width, this.height, this.context, chess, "白棋落子", time)
              turn = true
            }
            //发送落子位置给服务端
            wx.sendSocketMessage({
              data: JSON.stringify([i, j, this.flag]),   //这里不使用stringify会报错 
              sucess: (res) => console.log("发送成功"),
              fail: (res) => console.log("发送失败"),
            })
            start = false
            time = 30
          }
        }
      }
    })

    })


    wx.onSocketClose( () => console.log("连接已关闭") )
  
    
    //console.log(chess)
    
    /*wx.onTouchEnd( () => {
      wx.showToast({
        title: 'ok',
        duration: 1000
      })
    })*/
  }
}
