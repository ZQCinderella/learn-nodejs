/**
 * 实现可写流
 */
const { Writable } = require('stream');
const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});
//这个outStream的作用和process.stdout是一样的。 write方法在可写流被pipe的时候会调用
process.stdin.pipe(outStream);
