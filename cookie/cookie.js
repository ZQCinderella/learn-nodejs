const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser('hunter'));
app.use(function (req, res, next) {
  //console.log('cookie: ', req.cookies) //
  console.log('req.signedCookies: ', req.signedCookies);
  if (req.signedCookies.fet) {
    return res.send('login success');
  }
  next();
});

app.use(function (req, res, next) {
   //传入第三个参数{signed: true}表示要对cookie进行摘要计算,则需要再req.signedCookies中读取cookie, 否则在req.cookies中读取cookie
   res.cookie('fet', { name: 'fet', age: 10 }, { signed: true, maxAge: 30000 });
   //res.headers.cookie = JSON.stringify({ name: 'fet' });
   res.end('ok');
});

app.listen(3000);
