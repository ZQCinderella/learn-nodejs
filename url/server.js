const url = require('url');

const http_url = 'http://Chyingp:HelloWorld@ke.qq.com:8080/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1#part=1';

const obj = url.parse(http_url);
console.log(obj);

const obj_1 = url.parse(http_url, true);
console.log(obj_1);

const format_str = url.format(obj_1);
console.log('url.format', format_str);

const format_str_2 = url.format(obj_1, { fragment: false, unicode: true, auth: false });
console.log('解码的format_str_2', format_str_2);

//format的操作和parse相反
const parse_str = 'http://localhost:8083/public/test_face.html?name=%7Bage%3A10%2Cgender%3A%E5%A5%B3%7D';

console.log('parse结果: ', url.parse(parse_str));
//第二个参数为true, 则表示要对query进行parse为一个object, 等同于 querystring.parse()
console.log('parse第二个参数是true的结果', url.parse(parse_str, true));

//parse的第三个参数是用来处理host的， 默认false, 如果未true 则// 到下一个 /之间的内容会被认为是host  如 //foo/bar 则为 { host: 'foo', pathname: '/bar'}, 否则为 {pathname: '//foo/bar'}

const str = '//foo/bar';
console.log('parse的第三个参数为false', url.parse(str, true, false));
console.log('parse的第三个参数为true', url.parse(str, true, true));



//resolve
console.log(url.resolve('http://localhost:3002', '/get'));
console.log(url.resolve('http://localhost:3002/', '/get'));
console.log(url.resolve('http://localhost:3002', '//get/user'));
console.log(url.resolve('http://localhost:3002/', '//get/user'));
//打印结果
/**
* http://localhost:3002/get
  http://localhost:3002/get
  http://get/user
  http://get/user
*/

