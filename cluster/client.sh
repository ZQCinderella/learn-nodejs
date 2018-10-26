#!/bin/sh

for ((i=0;i<4;i++)); do
  curl "http://localhost:3000"
  echo ""
done

#response from worker 10788    //不同的请求会选择不同的进程
#response from worker 10789
#response from worker 10790
#response from worker 10791