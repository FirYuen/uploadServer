const express = require('express');
var serveIndex = require('serve-index')
const multer = require('multer');
const fs = require('fs');
var path = require('path')
var moment = require('moment');
var publicDir = path.join(__dirname,'public')
var uploadDir = "/media/nfs/upload/"
//dest是指定上传的文件保存在那里。
var objMulter = multer({ dest: uploadDir });
var serverIP = '192.168.10.143'
var app = express();
//any() 表示接受任何文件， single(‘表单name’)接受一个指定formname文件。
app.use(objMulter.any());
app.use('/upload', express.static(uploadDir), serveIndex(uploadDir, {
    icons: true,
    view: 'details',
    stylesheet: publicDir+'/style.css',
    'template':  publicDir+'/directory.html'
    // function (locals, cb) {
    //     console.log(locals)
    //     cb(null, "<html><body><h1>It could WORK!!!</h1></body></html>");
    // }
}))
app.use('/public', express.static( publicDir))
app.get('/now', function (req, res) {
    // res.end(moment().format('MM,DD,HH,mm,ss,SSS'))
    res.end(moment().format('YYMMDDHHmmssSSS'))
})
app.get('/', function (req, res) {
    res.redirect('/upload');
})
app.post('/', function (req, res) {
    console.log(req.body)
    console.log(req.files[0])
    //新文件名
    // 这是重点，  新文件名 = path + 后缀名
    //var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;
    let newName = moment(req.body.time, 'YYMMDDHHmmssSSS').format('YYMMDD-HH-mm-ss-SSS') + '-' + req.files[0].originalname
    // 使用fs模块的rename重命名方法重名字保存的文件，才能正常使用
    //rename('旧文件名，新文件， 回调 ')
    fs.rename(req.files[0].path, uploadDir + newName, function (err) {
        if (err) {
            res.send('Upload Failed,Please Contact YuanPengfei to report this FAILURE!\n')
        } else {
            res.send(`Upload succsee!\nPlease open URL \nhttp://${serverIP}:8887/upload/${newName} \nto download the file you uploaded. \n`)
        }
        res.end();
    })
})
app.listen(8887)
