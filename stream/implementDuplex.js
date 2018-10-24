/**
 * 实现双向流
 */
const { Duplex } = require('stream');
const duplex = new Duplex({   //双向流即可读可写，需要实现两个内部方法
  write(chunk, encoding, callback){
    console.log('writing');
    console.log(chunk.toString());
    callback();
  },
  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});

duplex.currentCharCode = 65;   //65-90是ABCDEFGHIJKLMNOPQRSTUVWXYZ
// const b = duplex.resume();   //返回流
// console.log(b);

duplex.setEncoding('utf-8');

const a = duplex.read();   //默认返回buffer， 除非设置了readable.setEncoding();
console.log(a);   //A   本次read已经从缓存区中读取了A

//readable.read()方法只应该在暂停模式下的可读流上运行。在流模式下，readable.read()自动调用直到内部缓冲区的数据完全耗尽。
duplex.on('readable', function () {
  let chunk;
  while(null !== (chunk = duplex.read())) {  //当再次读取时，就从缓存中的B开始读, 一次读完，因为是在流模式中
    console.log(`\nreceive chunk: ${chunk}`);   //BCDEFGHIJKLMNOPQRSTUVWXYZ 
  }
})
//duplex.pipe(process.stdout);    //调用read
//process.stdin.pipe(duplex);     //调用write
process.stdin.pipe(duplex).pipe(process.stdout); //read和write都调用