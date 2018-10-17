/**
 * 将图片读取成流 ---> 转为base64字符 ---> 拼接data:image/png;base64, 成为前端可展示的图片地址
 */

const http = require('http');
const fs = require('fs');
const mineType = require('mime-types');
const { PassThrough, Writable } = require('stream');

http.createServer(function (req, res) {
  if (req.url === '/') {
    fs.createReadStream('./index.html').pipe(res);
  } else if (req.url === '/geturl') {
    const base64 = fs.readFileSync('./bz.jpg').toString('base64');
    //fs.readFileSync(path, options)如果不指定第二个参数的encodeing, 的结果是一个buffer. 可以指定base64, utf-8等
    //const base64_way2 = fs.readFileSync('./bz.jpg', { encoding: 'base64'});
    const datauri = 'data:' + mineType.lookup('./bz.jpg') + ';base64,' + base64;
    console.log('geturl');
    res.end(datauri);
  } else if (req.url === '/geturl2') {
    //如果是用流的方式也可以转为buffer, 再转为base64
    const st = fs.createReadStream('./bz.jpg');
    st.on('data', chunk => {
      res.end('data:' + mineType.lookup('./bz.jpg') + ';base64,' + chunk.toString('base64'));
    });
    st.on('end', () => {
      console.log('end');
    })
  }
}).listen('3000', function() {
  console.log('listen on port 3000');
});

