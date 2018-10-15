const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('config/private.key');
const publicKey = fs.readFileSync('config/public.key');

const payload = {
  name: 'fet',
  age: '10',
}

const sign_default = jwt.sign(payload, privateKey);   //默认签名方式 HMAC SHA256
console.log('默认HS256签名结果: ', sign_default);

const sign_rs = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: 60 });   //默认签名方式 HMAC SHA256  expiresIn有效期单位秒
console.log('RS256签名结果: ', sign_default);

//过期签名
/*
const sign_default = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZmV0IiwiYWdlIjoiMTAiLCJpYXQiOjE1Mzk1OTY1NDAsImV4cCI6MTUzOTU5NjYwMCwiYXVkIjoiZmV0Omh1bnRlciJ9.kWXCEu5HcFIlLUxBW1tUR7lWlGI2re1RdhLUwQ7jzQD7vaIiabKd8RC4G2UbDKPhVWk_cT5W4HuDOAQ5vtltklv_8hx7ky_iCHI2B7EEKKtrN65B_41s33MxgEagvt7zamXiGqsBPwHSRGsrUe-ACYU8KmwYO0ugUguF4T3lLD52juy7vnFovz-uu4lzYsfJeCLL4EvAyZP4m99k1iJKfH6NkkqVQX1b-HwIkpTPqyTJv_W3l0WSxNJhOdRaP3zn1bvi6UqmSu2PXtBFbxlUGNlDpj5MFQuXt7Z-gvdn9dZP1C9R45-nxyy2AJtiPUqQZKf0cCzFvYmeksem4skQrw';
*/

//如果使用HS256方式进行签名，那么验签的key和加签的key必须为同一个
jwt.verify(sign_default, privateKey, { algorithms: ["HS256", "RS256"] }, function (error, decoded) {
  if (error) {
    console.log('HS256验签出错: ', error);
    return;
  }
  console.log('HS256验签结果: ', decoded);
});

//使用RS256方式进行加签，咋验签需要使用加签私钥对应的公钥去验签
jwt.verify(sign_rs, publicKey, { algorithms: ["HS256", "RS256"] }, function (error, decoded) {
  if (error) {
    console.log('RS256验签出错: ', error);
    return;
  }
  console.log('RS256验签结果: ', decoded);
});

jwt.verify(sign_default, 'hahahha', { algorithms: ['HS256'], audience: 'fet:hunter' }, function (error, decoded) {
  if (error) {
    //JsonWebTokenError: invalid signature
    console.log('错误的公钥验签出错: ', error);
    return;
  }
  console.log('错误公钥验签结果: ', decoded);
});
