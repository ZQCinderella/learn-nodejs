const fs = require('fs');
/**
 * 1、删除文件，读取文件操作，在文件不存在的情况下会报错
 * 2、创建文件，如果文件已存在也会报错
 * 3、所以谨慎起见，在进行文件操作之前先进行判断文件是否存在
 */




try {
  //同步读取
  const data = fs.readFileSync('../data/zlib.json', 'utf-8');
  //console.log('文件内容', data, new Date());
} catch (error) {
  console.log('readSync同步读取文件出错: ', error);
}

//异步读取
fs.readFile('../data/test.json', 'utf-8', function (err, con) {
  if (err) {
    console.log('异步读取文件出错: ', err);
  }
  //读取出来的数据是string类型的
  console.log('readFile异步读取结果: ', con, typeof con, new Date());
})

try {
  //linkSync(existPath, newPath) 根据已存在文件创建新文件. 如果newPath已存在，则会报错
  const f_url = fs.linkSync('../data/test.json', `../data/fs_link_${Date.now()}.json`);
} catch (error) {
  console.log('fs.linkSync出错', error.message);
}


/**
 * 通过文件流读取(适合读取大文件)
 */
const readStream = fs.createReadStream('../data/zlib_big.json', 'utf-8');
let buffers = [];
readStream.on('data', function (chunk) {
  buffers += chunk;   //data监听流的读取情况，对于大文件，可以看到是以片段的形式读取的
  //console.log('流读取数据data: ', chunk, typeof chunk);
}).on('error', function (error) {
  console.log('流读取数据出错: ', error);
}).on('end', function () {
  //const da = Buffer.concat(buffers);
  //console.log('流读取结束end: ', JSON.parse(buffers));
}).on('close', function () {
  console.log('流关闭close');
});

/**
 * 写文件
 */

//同步写入
try {
  //写入buffer
  fs.writeFileSync('../data/fs/write_2.txt', Buffer.from('hello 同步写入数据'), 'utf-8');
  //写入字符串
  fs.writeFileSync('../data/fs/write_3.txt', 'hello 同步写入数据', 'utf-8');
  console.log('同步写入文件成功');
} catch (error) {
  console.log('同步写入文件失败: ', error);
}

//异步写入
fs.writeFile('../data/fs/write_1.txt', 'hello world', function (err) {
  if (err) {
    console.log('writeFile异步写入内容出错', err);
  }
})

//流式写入
const writeStream = fs.createWriteStream('../data/fs/write_4.txt', 'utf-8');
writeStream.on('close', function () {
  console.log('写入完毕');
})
//多次对同一个文件进行写入操作，且不等待回调是不安全的，强烈推荐使用fs.createWriteStream;
writeStream.write('hello write_4');
writeStream.write('hello write_1');
writeStream.write('hello write_2');
writeStream.write('hello write_3');
writeStream.write('hello write_5');
writeStream.write('hello write_6');
writeStream.write('hello write_7');
writeStream.end();


//创建目录
fs.mkdir('../data/test_mkdir_1', function (err) {
  if (err) {
    console.log('异步创建目录失败: ', err);
  }
});

try {
  //同步创建目录(如果目录已存在会报错))
  fs.mkdirSync('../data/test_mkdir_2');
} catch (error) {
  console.log('同步创建目录失败: ', error);
}

/**
 * 删除文件(文件不存在会报错)
 */
fs.unlink('../data/unlink_test.txt', function (err) {
  if (err) {
    console.log('异步删除文件出错', err);
  }
})

try {
  fs.unlinkSync('../data/unlink_test_1.txt');
} catch (error) {
  console.log('同步删除文件出错: ', error);
}