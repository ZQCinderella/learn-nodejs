/**
 * 实现可读流
 */
const { Readable } = require('stream');
const read = new Readable({
  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 100) {
      this.push(null);  //当给push方法传入null时， 即发出了流结束(EOF)的信号
    }
  }
});

read.currentCharCode = 60;
read.pipe(process.stdout);
