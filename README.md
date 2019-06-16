# uploadServer
install nodejs https://nodejs.org/zh-cn/download/
```shell
git clone https://github.com/FirYuen/uploadServer
cd uploadServer
npm install
```
for once running
``` shell
#Progress will exit when you close the console
node index.js 
```
for longterm running
``` shell
#Progress will remain unless you close the computer
npm install forever -g
forever start -l forever.log -o out.log -e err.log index.js 
```
if necessary
change file node_modules\serve-index\index.js at line #192
 form `fileList.sort(fileSort);` to ` fileList.reverse(fileSort);`