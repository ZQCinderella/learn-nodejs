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
  console.log('使用错误的私钥解密出错', e);
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



//aes加密
const aesKey = 'fethunter1234567';
function aesEncrypt (data, key, iv) {
  let vi = iv || '';
  //aes-128-ecb模式的aes加密， 则key必须为16位
  let cipher = crypto.createCipheriv('aes-128-ecb', key, vi);
  cipher.setAutoPadding(true);
  let chunks = [];
  chunks.push(cipher.update(data, 'utf-8', 'base64'));
  chunks.push(cipher.update('hunter', 'utf-8', 'base64')); //使用update可以持续向cipher中压入数据，类似入栈操作
  chunks.push(cipher.final('base64'));  //final必须在update之后执行
  const re = chunks.join('');
  console.log('加密结果: ', re);
  return re;
}

//aes解密
function aesDecrypt(encryptedData, key, iv) {
  let vi = iv || '';
  let chunks = [];
  let decipher = crypto.createDecipheriv('aes-128-ecb', key, vi);
  decipher.setAutoPadding(true);
  chunks.push(decipher.update(encryptedData, 'base64', 'utf-8'));
  chunks.push(decipher.final('utf-8'));
  const de_res = chunks.join('');
  console.log('解密结果: ', de_res);
  return de_res;
}

const en_res = aesEncrypt('this is fet', aesKey);
const de_res = aesDecrypt(en_res, aesKey);  //this is fethunter

