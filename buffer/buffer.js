const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
console.log('创建buffer结果: ', buf.toString());

const buf2 = Buffer.alloc(10, '02');
console.log('buf2: ', buf2.toString());

const buf3 = Buffer.from([1,2,3]);
const chunk = [];
chunk.push(buf3);
console.log('buf3: ', Buffer.concat(chunk, buf3.length).toString('utf-8'));

const buf4 = Buffer.from('哈哈哈');
console.log('buf4: ', buf4.toString('utf-8'));

const buf5 = Buffer.from('this is a tést');
console.log('buf5: ', buf5.toString(), buf5.toString('ascii'));

const buf6 = Buffer.from('buffer');
let buf7 = Buffer.from(buf6);
buf7 = Buffer.concat([buf7, Buffer.from([0x61, 0x62])]);   //修改buffer的内容
console.log('buf6', buf6.toString(), buf6.length);
console.log('buf7', buf7.toString());
console.log('equals', buf7.equals(buf6));

console.log(Buffer.from('A'), Buffer.from('this'));

const buf8 = Buffer.from('AB');
const buf9 = Buffer.from('4142', 'hex');  //hex是16进制，A的10进制是65， 16进制是41
console.log('fet: ', Buffer.from('ABC'), Buffer.from('ABC', 'hex'));
console.log('内容相同，编码不同', buf8.equals(buf9)); //true

