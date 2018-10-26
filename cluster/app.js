/**
 * 通信过程
 * 通常多个进程肩痛同一个端口时会报错，但是cluster 模块允许简单容易的创建共享服务器端口的子进程
 * worker进程在初始化时，会现在master进程上面注册net.Server实例，同时自己也生成实例。然后master进程监听端口
 * 当请求进来时，master进程会将请求转发给空闲的worker进程。
 */

const cluster = require('cluster');
const os = require('os');
const http = require('http');
const cpu = os.cpus();

if (cluster.isMaster) {
  console.log(`master进程 ${process.pid} 已启动`);
  //如果是master进程，则创建子进程
  for (let i = 0; i < cpu.length; i++) {
    cluster.fork();   //创建四个进程，每个进程都会重新跑一边这个node程序。 底层使用child_process.fork()创建
  }
  cluster.on('exit', (worker, code, signal) => {
    if (signal) {
      console.log(`worker ${worker.process.pid} was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker ${worker.process.pid} exited with error code: ${code}`);
    } else {
      console.log(`worker进程 ${worker.process.pid} 已退出`);
    }
  });
  cluster.on('listening', (worker, code, signal) => {
    console.log(`worker进程 ${worker.process.pid} 正在监听`);
  });
} else {
  http.createServer(function (req, res) {
    res.end(`response from worker ${process.pid}, id: ${cluster.worker.id}`);
    process.kill(process.pid, 'SIGHUP');
  }).listen(3000);
  console.log(`Worker ${process.pid} started`);
}