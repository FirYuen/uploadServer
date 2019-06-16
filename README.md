# uploadServer
Install nodejs https://nodejs.org/zh-cn/download/
```shell
git clone https://github.com/FirYuen/uploadServer.git
cd uploadServer
npm install
```
change server IP Address at file `index.js` line #9 & `public/upload.sh`  line #2 

For once running
``` shell
#Progress will exit when you close the console
node index.js 
```
For longterm running
``` shell
#Progress will remain unless you close the computer
npm install forever -g
forever start -l forever.log -o out.log -e err.log index.js 

#To stop progress
forever stop index.js

```

If necessary
change file `node_modules\serve-index\index.js` at line #192
form `fileList.sort(fileSort);` to ` fileList.reverse(fileSort);`

On terminal
```shell
#Presume server IP is 192.168.123.11
curl -s 192.168.123.11:8887/public/upload.sh|sh
```
The log.tar.gz will upload to server