const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '')));

app.use('/rot', require('./router'));

app.post('/redirect', function(req, res){
  //重定向前端不能使用ajax,fetch等，需要使用form表单提交
  //res.redirect(301, 'https://www.baidu.com');
  res.location('https://www.baidu.com');    //location跳转需要手动staus和end, 但是redirect不需要
  res.status(301).end();
})

app.listen('3000', function() {
  console.log('listen on port 3000');
})