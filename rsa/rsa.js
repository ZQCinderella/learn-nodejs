const crypto = require('crypto');
const key = require('./key');


/**
* 加密
*/
function encrypt (data, key) {
  return crypto.publicEncrypt(key, Buffer.from(data));
}
/**
* 解密
*/
function decrypt (encrypted, key) {
  return crypto.privateDecrypt(key, encrypted);
}

const data = '我是fet';
//第一个参数如果string， 也就是key, 那么填充方式会使用RSA_PKCS1_OAEP_PADDING
//如果第一个参数是object   { key: string, passphrase: string(可选), padding: <crypto.constants>}
//那么填充方式根据传入的。 加解密的填充方式必须相同
const encryptedData = encrypt(data, key.pubKey);
const decryptedData = decrypt(encryptedData, key.privKey);
const decryptedFromBuffer = decrypt(Buffer.from(encryptedData.toString('base64'), 'base64'), key.privKey);
let errDecryptedData = '';
try {
  errDecryptedData = decrypt(encryptedData, key.errorPrivKey);
} catch (e) {
  console.log('解密出错', e);
}finally { 
  console.log('加密前数据 %s', data);
  console.log('加密后数据 %s', encryptedData.toString('base64'));
  console.log('解密后数据 %s', decryptedData);
  console.log('解密base64后数据 %s', decryptedFromBuffer);
  console.log('使用错误的key解密的结果 %s', errDecryptedData);
}


//签名验签 (数据传输的过程中，通常是先加密，在加签， 然后 验签，解密)

//使用私钥签名，公钥验签
const svData = 'fet hunter';
const sign = crypto.createSign('SHA256');
sign.update(svData);  //写入数据
//第二个参数是签名的格式
const signature = sign.sign(key.privKey, 'hex');
console.log('签名结果: ', signature);

const verify = crypto.createVerify('SHA256');
verify.update(svData);
//第三个参数是签名的格式
const verifyResult = verify.verify(key.pubKey, signature, 'hex');
console.log('验签结果: ', verifyResult);




