const fs = require('fs');
const path = require('path');
/**
 * 1、读取文件夹时，如果文件夹不存在也会报错，所以尽量先做判断
 */



const getFilesInDir = function (dir) {
  if (!fs.existsSync(dir)) {
    return '文件夹不存在';
  }
  let results = [ path.resolve(dir) ];
  const files = fs.readdirSync(dir, 'utf-8');    //该方法只能读一层文件夹，所以需要递归便利
  files.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);   //fs.stat对象返回一个文件的信息， 具体查看fs模块 fs.stat类
    if (stat.isFile()) {
      results.push(file);
      console.log(stat.size);  //size的单位是B
    } else if (stat.isDirectory()) {
      results = results.concat(getFilesInDir(file));
    }
  });
  return results;
}
const files = getFilesInDir('../data');
console.log('文件夹读取结果: ', files);


/**
 * 文件重命名(文件不存在会报错)
 */
// fs.rename('../data/fileForGzip.html', '../data/fileForGzip_1.html', function() {

// });
//fs.renameSync('../data/fileForGzip.html', '../data/fileForGzip_1.html');