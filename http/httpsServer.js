const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./cert/chyingp-key.pem'),
  cert: fs.readFileSync('./cert/chyingp-cert.pem')
}

https.createServer(options, function (req, res) {
  console.log('req.url', req.url);
  console.log('req.method:', req.method);
  res.end('came from server');
}).listen(3002, function () {
  console.log('listen on port 3002');
});
