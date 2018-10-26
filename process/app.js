/**
 * process是node中的全局模块，可以通过它来获取node进程相关的信息，比如node程序运行时的参数，设置环境变量等
 */

//process.env用来存放一些变量， 但是只能是string类型，如果存放{ a: b }, 则需要先JSON.stringify()
if (process.env.NODE_ENV === 'production') { //NODE_ENV=beta node app.js
  console.log('生产环境');
} else if (process.env.NODE_ENV === 'beta') {
  console.log('测试环境');
}


/**
 * 事件循环阶段纵览
 *1、计时器（timers）：本阶段执行setTimeout() 和 setInterval() 计划的回调；
  2、I/O 回调： 执行几乎全部发生异常的 close 回调， 由定时器和setImmediate()计划的回调；
  3、空闲，预备（idle，prepare）：只内部使用；
  4、轮询（poll）： 获取新的 I/O 事件；nodejs这时会适当进行阻塞；
  5、检查（check）： 调用 setImmediate() 的回调；
  6、close callbacks： 例如 socket.on('close', ... );
 */

 /*
1、定时器阶段 timers：
  定时器阶段执行定时器任务（setTimeOut(), setInterval()）。
2、轮询阶段 poll：
  轮询阶段由 I/O 事件触发，例如 'connect'，'data' 等。这是比较重/重要的阶段，因为大部分程序功能就是为了 I/O 数据。
  本阶段会处理定时器任务和 poll 队列中的任务，具体逻辑：
    处理到期的定时器任务，然后
    处理队列任务，直到队列空了或者达到上限
    如果队列任务没了：
      如果有 setImmediate()，终止轮询阶段并进入检查阶段去执行；
      如果没有 setImmediate()，那么就查看有没有到期的定时器，有的话就回到定时器阶段执行回调函数；
3、检查阶段 check：
          当轮询阶段空闲并且已经有 setImmediate() 的时候，会进入检查阶段并执行。
*/

/*
事件任务区分了大任务(macro task) 、小任务(micro task)，每个事件循环只处理一个大任务 ，但会处理完所有小任务。

examples of microtasks:

  process.nextTick
  promises
  Object.observe

examples of macrotasks:

  setTimeout
  setInterval
  setImmediate
  I/O
*/

//process.nextTick    执行结果 1-4-2-5-3-6
console.log('---1---');
setImmediate(()=>{         //当事件循环即轮训阶段结束后立即执行
  console.log('---6---');
});
setTimeout(() => {        //在某个时间值过后尽快执行回调函数；
  console.log('---3---');
}, 0);
process.nextTick(() => {   //process.nextTick()是再当前调用栈结束后立即处理，也必然是事件循环继续进行之前执行
  console.log('---2---');
  process.nextTick(() => {
    console.log('---5---');
  });
});
console.log('---4---');
//process.nextTick(fn) 将 fn 放到 node 事件循环的 下一个tick 里， 并且比setTimeout效率高


//process.argv   可用来获取执行node应用时的命令行参数，返回一个数组
//1 node 命令， 2 可执行文件名， 3 其他参数   如 node app.js beta
process.argv.forEach((val, index, array) => {
  console.log(`参数: ${index}, 值: ${val}`);
})

console.log('pid:', process.pid);


//结束进程 process.kill

console.log('process is on');
//process.kill(process.pid, 'SIGHUP');
console.log('process was done');
