const users = require('../config/users').items;
function findUser (name, pwd) {
  return users.find(function (item) {
    console.log(item);
    return item.name === name && item.password === pwd;
  })
}

function setAccessControlAllow (req, res, next) {
    const host = req.headers.origin;
    req.header('Access-Control-Allow-Origin', host);
    req.header('Access-Control-Allow-Method', '*');
    req.header('Access-Control-Allow-Credentials', true);
    next();
}

function listenRequest (app, params) {
  app.use('/login', setAccessControlAllow, (req, res, next) => {
    console.log('login api');
    const existUser = findUser(req.body.username, req.body.password);
    console.log('existUser: ', existUser);
    if (existUser) {
      req.session.regenerate(function (err) {
        if (err) {
          return res.send({ code: -1, msg: '登录失败', data: err });
        }
        req.session.currentUser = existUser;
        console.log('req.session', req.session.currentUser);
        res.send({ code: 0, msg: '登录成功' });
      });
    } else {
      res.send({ code: -1, msg: '登录失败', data: null });
    }
  });
  app.use('/logout', setAccessControlAllow, (req, res, next) => {
    console.log('logout api');
    console.log(req.session.currentUser);
    req.session.destroy(function (err) {
      if (err) {
        return res.send({ code: -1, msg: '退出登录失败'});
      }
      //req.session.currentUser = null;
      res.clearCookie('fet'); //这个参数是初始化session时传入的name
      res.redirect('/');
    })
  });
}
module.exports = {
  setAccessControlAllow,
  listenRequest
}
