const net  = require('net');

const PORT = 3002;
const HOST = '127.0.0.1';

const client = net.createConnection(PORT, HOST);
client.on('connect', function () {
  console.log('net 客户端： 已与服务器建立连接');
})
let body = [];
client.on('data', function (data) {
  console.log('net 客户端：接收到服务器数据', data);
  body.push(data);
})
client.on('end', function (data) {
  body = Buffer.concat(body);
  body = body.toString('utf-8');
  console.log('net 客户端: 连接已断开', body);
})
//client.end('hello net server')   //text/plain
//原生nodejs，传递数据都是用的string或者buffer, 不能直接使用对象发送
client.end(JSON.stringify({ name: 'fet' }));

