const fs = require('fs');
const crypto = require('crypto');   //内置转换流
const zlib = require('zlib');   //内置转换流
const file = process.argv[2];   //读取命令行的第三个参数
const { Transform } = require('stream');

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
  }
});

//压缩+加密
// fs.createReadStream(file)
//   .pipe(zlib.createGzip())
//   .pipe(crypto.createCipher('aes192', 'fethunter'))
//   .pipe(reportProgress)
//   .pipe(fs.createWriteStream(file + '.zz'))
//   .on('finish', () => console.log('done'));


//解密+解压
fs.createReadStream(file)
  .pipe(crypto.createDecipher('aes192', 'fethunter'))
  .pipe(zlib.createGunzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file.slice(0, -3)))
  .on('finish', () => console.log('done'))

