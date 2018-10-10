//express骨架的生成方式可以参考express官网 http://www.expressjs.com.cn/starter/generator.html
console.log('进入入口');
var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(session({
  name: 'fet',
  secret: 'this is a test secret',
  store: new FileStore(),
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 10*1000
  }
}));
app.get('/test', (req, res, next) => {
  res.send('hello world');
})
require('./routes/login').listenRequest(app);
