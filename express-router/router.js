const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/ok', function (req, res) {
  const ac = req.is('text/html');
  console.log(ac);  //false
  console.log(res.headersSent); //false
  console.log(req.user);
  console.log(`url: ${req.url}, baseUrl: ${req.baseUrl}, originUrl: ${req.originalUrl}`);
  console.log(req.headers);
  res.send('ok');
  console.log(res.headersSent);
});
router.post('/download', function (req, res) {
  console.log('down');
  res.set({
    'Content-Disposition': 'attachment; filename="bz.jpg',
    'Content-Type': 'image/png'
  });
  //res.sendFile(path.resolve(__dirname, './bz.jpg'));
  res.download('./bz.jpg');
});
console.log(typeof router);
module.exports = router;