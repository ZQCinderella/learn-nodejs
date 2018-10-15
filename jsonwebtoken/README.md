# JsonWebToken
使用jsonwebtoken生成登录凭证token

1、生成秘钥对
```
ssh-keygen -t rsa -b 2048 -f private.key
openssl rsa -in private.key -pubout -outform PEM -out public.key
```

