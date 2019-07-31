const http = require('http')
const WebSocketServer = require('websocket').server
const checkwin = require("./checkwin")

var cons = []  //创建一个连接数组
var chess = new Array()  //创建棋盘
for (let i = 0; i < 13; i++) {
    chess[i] = new Array()
    for (let j = 0; j < 13; j++) {
        chess[i][j] = 0
    }
} 

const httpServer = http.createServer((request, response) => {
    console.log('[' + new Date + '] Received request for ' + request.url)
    response.writeHead(404)
    response.end()
})

const wsServer = new WebSocketServer({
    httpServer,
    autoAcceptConnections: true
})

wsServer.on('connect', connection => { 
    var isWin = false
    var timeOver = 2
    cons.push(connection)
    if(cons.length == 2) {
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 13; j++) {
                chess[i][j] = 0
            }
        }      
        cons[0].send(JSON.stringify({ status:0, flag:true }))  //0指准备完毕 , 1指正在下棋中, 2指游戏结束
        cons[1].send(JSON.stringify({ status:0, flag:false })) 
    } 
    connection.on('message', message => {
        if (message.type === 'utf8') {
            //接收到客户端的信息
            let clientmsg = JSON.parse(message.utf8Data)
            console.log('>> message content from client: ' + message.utf8Data)

            if(clientmsg.length == 1) {
                timeOver -= 1
                if(timeOver == 0) {
                    for(let h=0;h < cons.length;h++) {
                        cons[h].sendUTF(JSON.stringify({ status:3, flag:clientmsg[0] }))
                    }
                }
            }else {
                //将棋子加载到服务器上，并处理数据
                chess[clientmsg[0]][clientmsg[1]] = 1 + clientmsg[2]
                isWin = checkwin(chess, clientmsg[0], clientmsg[1], 1 + clientmsg[2])
                
                //将信息传回客户端
                for(let h=0;h < cons.length;h++) {
                    if(cons[h] != connection) {
                        cons[h].sendUTF(JSON.stringify({ status:1, flag:clientmsg[2], i:clientmsg[0], j:clientmsg[1] }))
                    }
                }
                if(isWin) {
                    for(let h=0;h < cons.length;h++) {
                        cons[h].sendUTF(JSON.stringify({ status:2, flag:clientmsg[2] }))
                    }
                }
            }
        }
    })
    connection.on('close', (reasonCode, description) => {
        cons.map((item,index) => {
            if(item == connection) {
                cons.splice(index,1)
            }
        })
        //cons.pop()
        console.log('[' + new Date() + '] Peer ' + connection.remoteAddress + ' disconnected.')
    })
})

httpServer.listen(8080, () => {
    console.log('[' + new Date() + '] Serveris listening on port 8080')
})