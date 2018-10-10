const crypto = require('crypto');

const md5 = crypto.createHash('md5');
const res1 = md5.update('fet').digest('hex');

console.log('res1: ', res1);

const res2 = crypto.createHash('md5').update(Buffer.from('fet')).digest('hex');
console.log('res2: 对buffer加密', res2);

//讲明文密码直接存入数据库中，如果泄露，那么大量的用户账号信息都会被泄露
//所以建议密码先进行md5加密，然后再存储到库中。但是单纯的md5加密，容易被暴力破解
//比如讲常用的密码全部生成md5序列，然后依次比对。
//所以要进行密码加盐

function md5Pwd (password, salt) {
  const md5 = crypto.createHash('md5');
  if (salt) {
    console.log('原始密码: %s', password);
    password = password + ':' + salt;
    console.log('加盐后密码: %s', password);
  }
  const res = md5.update(password).digest('hex');
  console.log('加盐后md5: %s', res);
  return res;
}
const password = '123456';
//console.log('pwd1: ', md5Pwd(password));
//console.log('pwd2: ', md5Pwd(password));
//console.log('pwd3: 加盐处理后', md5Pwd(password + ':'));  //即便只添加很少的字符，最后的结局也会相差很多， 但是这样还不安全，如果获取到了你的盐值， 那么还是可以破解密码

//随机盐值
function getRandomSalt(count) {
  //Math.random()的结果为x.xxxxxxxx;
  return Math.random().toString().slice(2,6);
}
const pwd = 'fet123';
console.log(md5Pwd(pwd, getRandomSalt()));
console.log(md5Pwd(pwd, getRandomSalt()));
