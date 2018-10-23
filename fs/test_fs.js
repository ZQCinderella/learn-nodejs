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
reader.pipe(fs.createWriteStream(path.resolve(__dirname, 'test/test.js')))