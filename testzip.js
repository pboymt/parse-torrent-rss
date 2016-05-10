"use strict";

var fs = require('fs');
var path = require('path');
var jszip = require('jszip');
var nodemailer = require('nodemailer');
var zip = new jszip();
var dirpath = path.join(__dirname, 'dmhy', 'main', new Date().getFullYear().toString(), (Array(2).join(0) + (new Date().getMonth() * 1 + 1)).slice(-2), (Array(2).join(0) + (new Date().getDate() * 1 - 1)).slice(-2));
var dir = fs.readdirSync(dirpath);
var smtpConfig = require('./smtpconfig.json');
if (!fs.existsSync(path.join(__dirname, 'dmhy/zip/'))) {
    fs.mkdirSync(path.join(__dirname, 'dmhy/zip/'));
}
// zip.file('result.json', fs.readFileSync('dmhy/main/result.json'));
// zip.file('result.xml', fs.readFileSync('dmhy/main/result.xml'));
for (var x in dir) {
    zip.folder("torrent").file(dir[x], fs.readFileSync(path.join(dirpath, dir[x])));
    //console.log(dir[x]);
}
var filename = path.join(__dirname, 'dmhy/zip/', 'dmhy-main-' + new Date().getFullYear().toString() + '-' + (Array(2).join(0) + (new Date().getMonth() * 1 + 1)).slice(-2) + '-' + (Array(2).join(0) + (new Date().getDate() * 1 - 1)).slice(-2) + '.zip');
var ws = fs.createWriteStream(filename);
ws.on('finish', function() {
    var smtpTransport = nodemailer.createTransport(smtpConfig);
    smtpTransport.sendMail({
        from: '"user" <' + smtpConfig.auth.user + '>',
        to: 'pboymt@foxmail.com',
        subject: '动漫花园' + new Date().getFullYear() + '年' + (new Date().getMonth() * 1 + 1) + '月' + (new Date().getDate() * 1 - 1) + '日种子合集',
        text: '这是一封测试邮件',
        html: '<h1>所有文件</h1>',
        attachments: [{
            filename: 'output.zip',
            path: filename
        }]
    }, function(err, info) {
        console.log(err, info);
    });
});
zip.generateNodeStream({
    type: 'nodebuffer',
    streamFiles: true
}).pipe(ws);
