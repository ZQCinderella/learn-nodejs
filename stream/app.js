const stream = require('stream');
const fs = require('fs');

const pass = stream.PassThrough();
//pass.pipe(process.stdout);
pass.on('data', chunk => {
  console.log(chunk.toString());
});
pass.write('ok');
pass.resume();


//创建一个大文件
const file = fs.createWriteStream('./big.file');
for (let i = 0; i <= 1e6; i++) {
  file.write('hello nodejs, I am coming to learn from you. hello nodejs, I am coming to learn from you.\n');
}
file.end();
