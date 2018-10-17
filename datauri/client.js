const http = require('http');

http.get('http://localhost:3000/geturl', function (res) {
  console.log(res);
  res.pipe(process.stdout);
});

