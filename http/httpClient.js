const http = require('http');
const querystring = require('querystring');

//get请求
http.get('http://localhost:3002/getUser?name=fet&age=10', function (res) {
  console.log('响应状态码和信息: ', res.statusCode, res.statusMessage);
  console.log('响应正文: ');
  res.pipe(process.stdout);
})

//post
const client = http.request({
  method: 'POST',
  protocol: 'http:',
  port: '3002',
  hostname: '127.0.0.1',
  path: '/',
  headers: {
    'Content-Type': 'application/json',
    'connection': 'keep-alive'
  }
}, function (res) {
  console.log('post响应状态码和信息: ', res.statusCode, res.statusMessage);
  console.log('post响应正文: ');
  console.log(querystring.parse('gender=male'));
  res.pipe(process.stdout);
})
client.write(JSON.stringify({ from: 'china'}));
client.end();
