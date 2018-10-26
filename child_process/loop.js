const fs = require('fs');
const crypto = require('crypto');   //内置转换流
const zlib = require('zlib');   //内置转换流

function doAsyncOperation(cb) {
  fs.readFile('./big.file', cb);
}

const timeScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeScheduled;
  console.log(`${delay} ms have passed since i was scheduled`);     //401 ms have passed since i was scheduled
}, 300);

doAsyncOperation((error, chunk) => {
  console.log(`异步文件读取结束: 耗时${Date.now() - timeScheduled}`);
  fs.readFileSync('./big.file');     //同步的io事件是会阻塞的，会影响node的事件循环
  fs.readFileSync('./big.file');
  fs.readFileSync('./big.file');
  fs.readFileSync('./big.file');
  console.log(`同步读取文件结束: 耗时${Date.now() - timeScheduled}`);
});
console.log(`同步读取文件结束: 耗时${Date.now() - timeScheduled}`);

var startCallback = Date.now();

while (Date.now() - startCallback > 10) {
  console.log('strat callback');
}