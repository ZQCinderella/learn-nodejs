/**
 * 使用express+multer进行文件上传
 */
const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');

//const up = multer({ dest: 'file' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './file')
  },
  filename: function (req, file, cb) {
    //这里可以截取文件的扩展名，然后通过fieldname+时间戳+扩展名来生产唯一的文件
    const nameInfo = file.originalname.split('.');
    cb(null, nameInfo[0] + '-' +  Date.now() + '.' + nameInfo[1]);
  }
});
const up = multer({ storage });

app.get('/form', function (req, res, next) {
  fs.createReadStream('./upload.html', { encoding: 'utf-8' }).pipe(res);
});
app.post('/upload', up.single('avatar'), function (req, res, next) {
  console.log(req.files);
  /*
  { 
    fieldname: 'avater',
    originalname: 'bz.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: './file',
    filename: 'bz.jpg',
    path: 'file/bz.jpg',
    size: 64726 
  }
  */
  res.send('ok');
})
app.post('/uploadMult', up.array('users', 10), function (req, res, next) {
  console.log('files: ', req.files);
  //如果需要下载文件，可以直接使用fs读取文件流
  res.send('ok');
})

var cpUpload = up.fields([{ name: 'avatar', maxCount: 1 }, { name: 'users', maxCount: 8 }])

app.post('/multFields', cpUpload, function (req, res, next) {
  console.log(req.files);
  //req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //使用req.files['gall']或者req.files['photo']获取上传的文件列表. 
  res.send('ok');
});
app.listen('3000', function () {
  console.log('listen on port 3000');
})