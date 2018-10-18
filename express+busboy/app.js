const express = require('express');
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');
const concat = require('concat-stream')
const crypto = require('crypto');
const { handleImage, es5HandleImage } = require('./compress');
const app = express();


app.use(express.static(__dirname));
app.listen(3000, function () {
  console.log('listen on port 3000');
});
app.post('/uploadImg', function (req, res, next) {
  var busboy = new Busboy({ headers: req.headers });
  let iscompress = '';

  // on field和 on file监听事件的执行顺序是根据form表单中input元素的先后决定的，如果第一个元素是 type="text"， 那么先进入field

  busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('Field [' + fieldname + ']: value: ' + val);
    if (fieldname === 'iscompress') iscompress = val;
  });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    console.log('iscompress: ', iscompress);   //是否压缩的标志， 根据form表单中的input[name="iscompress"]元素的值决定

    //在on file监听事件中，必须对流就行处理pipe或者监听如 file.on('data'), file.on('end')，不然会卡在file事件中，无法进入finish
    if (iscompress === 'yes') {
      //压缩后的图片进入compress_file

      //concat方法的参数是一个function(buffer){},  这个function的参数就是file的buffer 
      file.pipe(concat(es5HandleImage(filename, mimetype)(res)(data => {
        fs.writeFileSync(path.join(__dirname, 'compress_file', filename), data.compressData)
      })));
    } else {
      //未压缩的图片进入source_file
      file.pipe(fs.createWriteStream(path.join(__dirname, 'source_file', path.basename(filename))));
    }
  });
  busboy.on('finish', function () {
    console.log('Done parsing form!');
    res.send('ok');
  });
  req.pipe(busboy);
})