const { Transform } = require('stream');
//在看一个交换流的例子 将'a,b,c,d'改变成{a:b,c:d}
const toArrayTran = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
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
    for (let i = 0; i < chunk.length; i += 2) {
      obj[chunk[i]] = chunk[i + 1];
    }
    this.push(obj);
    callback();
  }
})

const toStringTran = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + '\n');
    callback();
  }
})

process.stdin
  .pipe(toArrayTran)
  .pipe(toObjectTran)
  .pipe(toStringTran)
  .pipe(process.stdout);