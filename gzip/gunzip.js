const fs = require('fs');
const zlib = require('zlib');
//解压缩
const gunzip = zlib.createGunzip();
const inFile = fs.createReadStream('../data/testgunzip.json.gz');
const outFile = fs.createWriteStream('../data/testgunzip.json');

inFile.pipe(gunzip).pipe(outFile);
