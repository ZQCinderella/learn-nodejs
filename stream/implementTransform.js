/**
 * 实现转换流， stream.PassThrough类是一个极简的transform流，只是把输入字节原样不动直接输出。
 */
const { Transform, PassThrough } = require('stream');

const transform = new Transform({
  transform(chunk, encoding, callback) {   //transform方法结合了read和write, 所以可以使用push方法像可读流中压入数据
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(transform).pipe(process.stdout);

const pass = new PassThrough();
pass.end(Buffer.from('abc', 'utf-8')).pipe(process.stdout);


//实现一个另一个交换流的例子
const tran2 = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    chunk |= 0;
    const data = chunk.toString(16);

    //push the data onto the readable queue
    const param = '0'.repeat(data.length % 2) + data;
    callback(null, param);
  }
})
tran2.on('data', function (chunk) {
  console.log(`read: ${chunk}`);
});
tran2.write(1);
tran2.write(10);
tran2.write(100);


//在看一个交换流的例子 将'a,b,c,d'改变成{a:b,c:d}
const toArrayTran = new Transform({
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().trim().split(','));
    callback();
  }
})

const toObjectTran = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    const obj = {};
    for(let i = 0; i < chunk.length; i += 2){
      obj[i] = obj[i+1];
    }
    this.push(obj);
    callback();
  }
})

const toStringTran = new Transform({
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + '\n');
    callback();
  }
})

process.stdin
  .pipe(toArrayTran)
  .pipe(toObjectTran)
  .pipe(toStringTran)
  .pipe(process.stdout)