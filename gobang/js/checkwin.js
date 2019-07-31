export default function checkwin(chess, i, j, flag) {  //flag是判断白子和黑子的标志
  if( i == 0 | i == 12 | j == 0 | j == 12 ) {
    //棋子在边界上的情况
    if( i == 0 && j == 0 ) {  //左上角边界
      if (chess[i + 1][j + 1] == flag && chess[i + 2][j + 2] == flag && chess[i + 3][j + 3] == flag && chess[i + 4][j + 4] == flag) {
        return true
      } else if (chess[i][j + 1] == flag && chess[i][j + 2] == flag && chess[i][j + 3] == flag && chess[i][j + 4] == flag) {
        return true
      } else if (chess[i + 1][j] == flag && chess[i + 2][j] == flag && chess[i + 3][j] == flag && chess[i + 4][j] == flag) {
        return true
      }else { return false }
    }

    if (i == 0 && j == 12) {  //右上角边界
      if (chess[i + 1][j - 1] == flag && chess[i + 2][j - 2] == flag && chess[i + 3][j - 3] == flag && chess[i + 4][j - 4] == flag) {
        return true
      } else if (chess[i][j - 1] == flag && chess[i][j - 2] == flag && chess[i][j - 3] == flag && chess[i][j - 4] == flag) {
        return true
      } else if (chess[i + 1][j] == flag && chess[i + 2][j] == flag && chess[i + 3][j] == flag && chess[i + 4][j] == flag) {
        return true
      } else { return false }
    }

    if (i == 12 && j == 0) {  //左下角边界
      if (chess[i - 1][j + 1] == flag && chess[i - 2][j + 2] == flag && chess[i - 3][j + 3] == flag && chess[i - 4][j + 4] == flag) {
        return true
      } else if (chess[i][j + 1] == flag && chess[i][j + 2] == flag && chess[i][j + 3] == flag && chess[i][j + 4] == flag) {
        return true
      } else if (chess[i - 1][j] == flag && chess[i - 2][j] == flag && chess[i - 3][j] == flag && chess[i - 4][j] == flag) {
        return true
      } else { return false }
    }

    if (i == 12 && j == 12) {  //右下角边界
      if (chess[i - 1][j - 1] == flag && chess[i - 2][j - 2] == flag && chess[i - 3][j - 3] == flag && chess[i - 4][j - 4] == flag) {
        return true
      } else if (chess[i][j - 1] == flag && chess[i][j - 2] == flag && chess[i][j - 3] == flag && chess[i][j - 4] == flag) {
        return true
      } else if (chess[i - 1][j] == flag && chess[i - 2][j] == flag && chess[i - 3][j] == flag && chess[i - 4][j] == flag) {
        return true
      } else { return false }
    }

    if( i == 0 ) {  //上边界
      for (let row = 0; row < 2; row++) {
        for (let col = -1; col < 2; col++) {
          if (row == 0 && col == 0) { continue }
          if (chess[i + row][j + col] == flag) {  //所下的棋子周围有同色棋子的情况
            if (row == 0 && chess[i - row][j - col] == flag) {  //同色棋子的镜像位置有棋子的情况
              if (chess[i + 2 * row][j + 2 * col] == flag && chess[i - 2 * row][j - 2 * col] == flag) {  //三点一线且下子在中间的情况
                return true
              } else if (chess[i + 2 * row][j + 2 * col] == flag && chess[i + 3 * row][j + 3 * col] == flag) {  //三点一线下子在下方的情况
                return true
              } else if (chess[i - 2 * row][j - 2 * col] == flag && chess[i - 3 * row][j - 3 * col] == flag) {  //三点一线下子在上方的情况
                return true
              }
            } else if (chess[i + 2 * row][j + 2 * col] == flag && chess[i + 3 * row][j + 3 * col] == flag && chess[i + 4 * row][j + 4 * col] == flag) {
              return true
            }
          }
        }
      }
      return false
    }

    if (i == 12) {  //下边界
      for (let row = -1; row < 1; row++) {
        for (let col = -1; col < 2; col++) {
          if (row == 0 && col == 0) { continue }
          if (chess[i + row][j + col] == flag) {  //所下的棋子周围有同色棋子的情况
            if (row == 0 && chess[i - row][j - col] == flag) {  //同色棋子的镜像位置有棋子的情况
              if (chess[i + 2 * row][j + 2 * col] == flag && chess[i - 2 * row][j - 2 * col] == flag) {  //三点一线且下子在中间的情况
                return true
              } else if (chess[i + 2 * row][j + 2 * col] == flag && chess[i + 3 * row][j + 3 * col] == flag) {  //三点一线下子在下方的情况
                return true
              } else if (chess[i - 2 * row][j - 2 * col] == flag && chess[i - 3 * row][j - 3 * col] == flag) {  //三点一线下子在上方的情况
                return true
              }
            } else if (chess[i + 2 * row][j + 2 * col] == flag && chess[i + 3 * row][j + 3 * col] == flag && chess[i + 4 * row][j + 4 * col] == flag) {
              return true
            }
          }
        }
      }
      return false
    }

    if (j == 0) {  //左边界
      for (let row = -1; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
          if (row == 0 && col == 0) { continue }
          if (chess[i + row][j + col] == flag) {  //所下的棋子周围有同色棋子的情况
            if ( col == 0 && chess[i - row][j - col] == flag) {  //同色棋子的镜像位置有棋子的情况
              if (chess[i + 2 * row][j + 2 * col] == flag && chess[i - 2 * row][j - 2 * col] == flag) {  //三点一线且下子在中间的情况
                return true
              } else if (chess[i + 2 * row][j + 2 * col] == flag && chess[i + 3 * row][j + 3 * col] == flag) {  //三点一线下子在下方的情况
                return true
              } else if (chess[i - 2 * row][j - 2 * col] == flag && chess[i - 3 * row][j - 3 * col] == flag) {  //三点一线下子在上方的情况
                return true
              }
            } else if (chess[i + 2 * row][j + 2 * col] == flag && chess[i + 3 * row][j + 3 * col] == flag && chess[i + 4 * row][j + 4 * col] == flag) {
              return true
            }
          }
        }
      }
      return false
    }

    if (j == 12) {  //右边界
      for (let row = -1; row < 2; row++) {
        for (let col = -1; col < 1; col++) {
          if (row == 0 && col == 0) { continue }
          if (chess[i + row][j + col] == flag) {  //所下的棋子周围有同色棋子的情况
            if (col == 0 && chess[i - row][j - col] == flag) {  //同色棋子的镜像位置有棋子的情况
              if (chess[i + 2 * row][j + 2 * col] == flag && chess[i - 2 * row][j - 2 * col] == flag) {  //三点一线且下子在中间的情况
                return true
              } else if (chess[i + 2 * row][j + 2 * col] == flag && chess[i + 3 * row][j + 3 * col] == flag) {  //三点一线下子在下方的情况
                return true
              } else if (chess[i - 2 * row][j - 2 * col] == flag && chess[i - 3 * row][j - 3 * col] == flag) {  //三点一线下子在上方的情况
                return true
              }
            } else if (chess[i + 2 * row][j + 2 * col] == flag && chess[i + 3 * row][j + 3 * col] == flag && chess[i + 4 * row][j + 4 * col] == flag) {
              return true
            }
          }
        }
      }
      return false
    }
    
  }else {
    //棋子的普通情况
    for(let row = -1;row < 2;row++) {
      for(let col = -1;col < 2;col++) {
        if( row == 0 && col == 0 ) { continue }
        if( chess[i + row][j + col] == flag ) {  //所下的棋子周围有同色棋子的情况
          if (chess[i - row][j - col] == flag) {  //同色棋子的镜像位置有棋子的情况
            if ( i < 11 && i > 1 && j < 11 && j > 1 && chess[i + 2 * row][j + 2 * col] == flag && chess[i - 2 * row][j - 2 * col] == flag) {  //三点一线且下子在中间的情况
              return true
            } else if (i + 3*row > -1 && i + 3*row < 13 && j + 3*col < 13 && j + 3*col > -1 && chess[i + 2 * row][j + 2 * col] == flag && chess[i + 3 * row][j + 3 * col] == flag ) {  //三点一线下子在下方的情况
              return true
            } else if (i + 3*row > -1 && i + 3*row < 13 && j + 3*col < 13 && j + 3*col > -1 && chess[i - 2 * row][j - 2 * col] == flag && chess[i - 3 * row][j - 3 * col] == flag) {  //三点一线下子在上方的情况
              return true
            }
          }else {  //两点一线，即所下子在中子边上的情况
            if (i + 4 * row > -1 && i + 4 * row < 13 && j + 4 * col < 13 && j + 4 * col > -1  && chess[i + 2 * row][j + 2 * col] == flag && chess[i + 3 * row][j + 3 * col] == flag && chess[i + 4 * row][j + 4 * col] == flag) {
              return true
            }
          }
        }
      }
    }
    return false
  }
}