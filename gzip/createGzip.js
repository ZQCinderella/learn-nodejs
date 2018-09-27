const fs = require('fs');
const http = require('http');
const zlib = require('zlib');
const filePath = '../data/zlib.json';
const gzipedPath = '../data/test.json';

const server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  const acceptEncoding = req.headers['accept-encoding'];
  console.log('接收的编码方式: ', acceptEncoding);
  console.log('headers', req.headers);
  console.log('req.url', req.url);
  if (acceptEncoding.indexOf('gzip') > -1) {
    const gzip = zlib.createGzip();
    const gunzip = zlib.createGunzip();
    res.writeHead(200, {
      'Content-Encoding': 'gzip' //告诉前端使用gzip压缩， 如果设置了该属性，但是res应答不使用gzip压缩则会报错
    });
    //进行gzip压缩
    console.log('进行gzip压缩');
    //fs.createReadStream(filePath).pipe(gzip).pipe(fs.createWriteStream('../data/test.json')); //讲文件压缩后保存在本地，看是否与压缩前大小有区别
    //fs.createReadStream(filePath).pipe(res);    //不压缩
    fs.createReadStream(filePath).pipe(gzip).pipe(res);    //压缩,客户端需要能解压
    //fs.createReadStream(gzipedPath).pipe(gunzip).pipe(res);  //解压
  } else {
    fs.createReadStream(filePath).pipe(res);
  }
  //console.log("ok")
  //res.write('ok')
  //res.end();
})

server.listen('3000')
console.log('listen is on port 3000');
