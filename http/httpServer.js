const http = require('http');
const url = require('url');
const querystring = require('querystring');

http.createServer(function (req, res) {

  /**
  * 设置跨域
  */
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-method', 'POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  

  console.log('1、客户端请求url:', req.url);
  console.log('2、http请求方法: ', req.method);
  console.log('3、http版本:', req.httpVersion);
  console.log('4、http请求头: ', req.headers);

  let resData = '';
  if (req.method === 'GET') {
    //get请求
    const urlObj = url.parse(req.url);
    console.log('url参数: ', urlObj);
    const query = urlObj.query;
    const queryObj = querystring.parse(query);
    console.log('请求参数: ', queryObj); 
    resData = queryObj;
    //res.end(resData);
  } else if (req.method === 'POST') {
     res.setHeader('Content-Type', 'text/html; charset=utf-8');
     req.on('data', function (data) {
      resData += data;
      console.log('on data: ', data);
     })
     req.on('end', function () {
      //console.log('post请求，请求参数: ', querystring.parse(resData), typeof resData);
      console.log('post请求，请求参数: ', JSON.parse(resData), typeof resData);
      //res.end(resData)
     })
  }


  //post请求

  //设置头信息
  //res.writeHead(200, {
    //'Content-Type': 'application/json'
  //   'Content-Type': 'text/html'
  //})
  
  setTimeout(function () {
    res.end(JSON.stringify(resData));
  }, 2000);
 // res.end(JSON.stringify(resData));

}).listen(3002, function () {
  console.log('listen on port 3002');
});
