const fs = require('fs');
const server = require('http').createServer();

console.log('before: ', process.memoryUsage());
server.on('request', function (req, res) {
  // fs.readFile('./big.file', function (err, data) {
  //   if (err) throw err;
  //   console.log('after', process.memoryUsage());
  //   res.end(data);
  // });
  console.log('after', process.memoryUsage());
  fs.createReadStream('./big.file').pipe(res);
});
server.listen(3000, function() {
  console.log('listen on port 3000');
});