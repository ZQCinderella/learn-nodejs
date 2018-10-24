const fs = require('fs');
const path = require('path');

const reader = fs.createReadStream(path.resolve(__dirname, './fileForCompress_1.txt'));
const creatFolder = function (floder) {
  try {
    //fs.accessSync(path, mode)方法, 如果文件或者文件夹不存在即可访问性检查失败，会抛出异常，否则返回undefined
    const a = fs.accessSync(floder, fs.constants.R_OK | fs.constants.W_OK);
    console.log('a: ', a);
  } catch (error) {
    console.log(error);
    fs.mkdirSync(floder);
  }
}
const checkFile = function (floder) {
  //也可以使用fs.existsSync检查
  if (!fs.existsSync(floder)) {
    fs.mkdirSync(floder);
  }
}
const filePath = path.resolve(__dirname, 'test');
creatFolder(filePath);

//写入文件
//reader.pipe(fs.createWriteStream(path.resolve(__dirname, 'test/test.js')))

const re = fs.createWriteStream(path.resolve(__dirname, 'test/test_drain1.js'));
re.on('pipe', function () {
  //当调用reader.pipe()时触发
  console.log('有数据流入');
})
//使用 'drain' 事件来防止背压与避免内存问题
function write(data, cb) {
  if (!re.write(data)) {
    re.once('drain', cb);
  } else {
    process.nextTick(cb);
  }
}

// 在回调函数被执行后再进行其他的写入。
write('hello', () => {
  console.log('完成写入，可以进行更多的写入');
});
// reader.on('data', function (chunk) {
//   // re.write(chunk, function () {
//   //   console.log('write ok');
//   // });
//   write(chunk, function () {
//     console.log('write ok');
//   });
// })
reader.resume();
console.log(reader.readableFlowing);   //当监听data, 调用resume, 或者pipe时，会将,readableFlowing这个属性值置为true
reader.pipe(re);