const { spawn, fork, exec, execFile, execFileSync, execSync } = require('child_process');
//fork, exec, execFile, execFileSync, execSync都是基于spawn或者spawnSync实现的
const ls = spawn('sh', ['/Users/fengrong/fet/test.sh']);
//const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (chunk) => {
  console.log('输出: ', chunk.toString());
});

ls.stderr.on('data', (data) => {
  console.log(`错误：${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});

const exPro = exec('cat /Users/fengrong/fet/finance.pem', {
  encoding: 'utf8',
  timeout: 1000,
  maxBuffer: 200 * 1024,
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
}, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${error}`);
    return;
  }
  //console.log(`stdout: ${stdout}`);
  //console.log(`stderr: ${stderr}`);
})
exPro.on('close', (code, signal) => {
  console.log(`exec进程关闭: ${code, signal}`);
})
//同步会阻塞进程，所以execSync的结果要先于exec输出
const es = execSync('cat /Users/fengrong/fet/finance.pem');
console.log(`execSync: ${es}`);

execFile('npm', ['-v'], (err, stdout, stderr) => {
  console.log(`execFile: ${stdout}`);
})



