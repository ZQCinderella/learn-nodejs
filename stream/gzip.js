const fs = require('fs');
const zlib = require('zlib'); 
const file = process.argv[2];

//压缩  使用big.file可以看到进度条效果
fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .on('data', chunk => process.stdout.write('.'))
  .pipe(fs.createWriteStream(file + '.gz'))
  .on('finish', () => console.log('done'));

//解压

// fs.createReadStream(file + '.gz')
//   .pipe(zlib.createGunzip())
//   .pipe(fs.createWriteStream(file));
