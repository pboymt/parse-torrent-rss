"use strict";

var nodemailer = require('nodemailer');
var smtpConfig = {
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: '000000000@qq.com',
        pass: 'xxx00000000'
    }
};
var strConfig = "smtp://000000000%40qq.com:xxx00000000@smtp.qq.com";
var smtpTransport = nodemailer.createTransport(smtpConfig);

smtpTransport.sendMail({
    from: '"user" <' + smtpConfig.auth.user + '>',
    to: 'xxxt@xxx.com',
    subject: 'Node.JS通过SMTP协议从QQ邮箱发送的附件邮件 ' + new Date().toDateString(),
    text: '这是一封测试邮件',
    html: '<h1>Hello World!</h1>',
    attachments: [{
        path: 'nyaa/result.xml'
    }]
}, function(err, info) {
    console.log(err, info);
});
