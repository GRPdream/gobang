 //创建棋盘的对应二维数组
var chess = new Array()
for (let i = 0; i < 13; i++) {
  chess[i] = new Array()
  for (let j = 0; j < 13; j++) {
    chess[i][j] = 0
  }
}
export {chess}