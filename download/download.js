const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req, res) {
  console.log(req.url, req.method);
  if (req.url === '/') {
    const file = fs.createReadStream('./index.html');
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    file.pipe(res);
  } else if (req.url === '/download') {
    res.writeHead(200, {
      'Content-Type': 'image/jpg',
      'Content-Disposition': 'attachment; filename=bz.jpg'   //文件名， 需要动态写入
    });
    const url = path.join(__dirname, 'bz.jpg');   //文件源是本地文件
    console.log('下载地址: ', url);
    fs.createReadStream(url).pipe(res);

    //如果文件源是网络地址, 可以使用request, 都需要设置head中的Content-Type和Content-Disposition
    //1、 npm install request
    /*
    const request = require('request');
    res.writeHead(200, {
      'Content-Type': 'image/jpg',
      'Content-Disposition': 'attachment; filename=bz.jpg'   //文件名， 需要动态写入
    });
    request('https://xxxxx/file/a.png').pipe(res);
    */


    //如果文件源是buffer
    /*
    const stream = require('stream');
    const bfStream = new stream.PassThrough();
    bfStream.end(buffer);
    res.writeHead(200, {
      'Content-Type': 'image/jpg',
      'Content-Disposition': 'attachment; filename=bz.jpg'   //文件名， 需要动态写入
    });
    bfStream.pipe(res);
    */
  }
})
server.listen('3000', function () {
  console.log('server listen on port 3000');
});