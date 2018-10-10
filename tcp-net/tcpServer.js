const net = require('net');
const PORT = 3002;
const HOST = '127.0.0.1';

//tcp服务
const server = net.createServer(function (socket) {
  //socket是一个双工的对象，发送数据和接收请求都靠socket完成
  console.log('net服务器接收到来自客户端的请求');
  let body = [];
  socket.on('data', function (data) {
    body.push(data);
    socket.write('hello net client');
    socket.end();
  })
  socket.on('close', function () {
    console.log('net服务器接收到的数据为', Buffer.concat(body).toString('utf-8'));
    console.log('net服务器断开连接');
  })
})
server.listen(PORT, HOST, function () {
  console.log('net server listen on port 3002');
})
