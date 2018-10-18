const express = require('express')
const router = express.Router();
const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');

router.post('/uploadImg', function (req, res, next) {
  const host = req.headers.origin;
  res.header('Access-Control-Allow-Origin', host);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'POST');
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    file.on('data', function (data) {
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
    });
    file.on('end', function () {
      console.log('File [' + fieldname + '] Finished');
    });
  });
  busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('Field [' + fieldname + ']: value: ' + val);
  });
  busboy.on('finish', function () {
    console.log('Done parsing form!');
    res.send('ok');
  });
  req.pipe(busboy);
})

module.exports = router;