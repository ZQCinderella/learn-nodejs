const fs = require('fs');
const server = require('http').createServer();

server.on('request', function (req, res) {
  fs.readFile('./big.file', function (err, data) {
    if (err) throw err;
    res.end(data);
  });
  //fs.createReadStream('./big.file').pipe(res);
});
server.listen(3000, function() {
  console.log('listen on port 3000');
});