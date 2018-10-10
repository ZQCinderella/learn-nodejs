const https = require('https');

https.get('https://www.baidu.com', function (res) {
  console.log('响应码: ', res.statusCode, res.statusMessage);
  console.log('headers: ', res.headers);
  //res.pipe(process.stdout);
  console.log('res: ', res);
  process.stdout.write(res);
})
