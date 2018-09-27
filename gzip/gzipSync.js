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
    res.writeHead(200, {
      'Content-Encoding': 'gzip'
    });
    //const gzip = zlib.gzipSync(fs.createReadStream(filePath));
    //进行gzip压缩
    console.log('进行gzip压缩');
    res.end(zlib.gzipSync('use gzipSync'))
  } else {
    fs.createReadStream(filePath).pipe(res);
  }
  //console.log("ok")
  //res.write('ok')
  //res.end();
})

server.listen('3000')
console.log('listen is on port 3000');
