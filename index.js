"use strict";
var fs = require('fs');
var xml2js = require('xml2js');
var parseXML = xml2js.parseString;
var http = require('http');
var responseText = '';
var xmlObj = {};
var resources = {
    'nyaa': {
        'url': 'http://www.nyaa.se/?page=rss',
        'dir': 'nyaa/'
    }
};
var downloadTorrent = function(url, filename, callback) {
    //console.log(url);
    filename = filename.replace(/\//, '-');
    http.get(url, function(res) {
        var writeStream = fs.createWriteStream(resources['nyaa']['dir'] + filename);
        writeStream.on('finish', function() {
            console.log('文件' + filename + '下载完成');
        });
        res.on('data', function(chunk) {
            writeStream.write(chunk);
        });
        res.on('end', function() {
            writeStream.end();
            callback();
        });
    });
};
var roundDownload = function(list, which) {
    console.log('正在下载第' + which + '个');
    downloadTorrent(list[which]['link'][0], list[which]['title'] + '.torrent', function() {
        if (which < list.length) {
            roundDownload(list, which + 1);
        } else {
            console.log('下载完毕！');
        }
    });
};

http.get(resources['nyaa']['url'], function(res) {
    responseText = '';
    res.on('data', function(chunk) {
        //console.log('BODY: ' + chunk);
        responseText += chunk;
    });
    res.on('end', function() {
        //console.log(responseText);
        fs.writeFile(resources['nyaa']['dir'] + 'result.xml', responseText);
        parseXML(responseText, function(err, result) {
            console.dir(result['rss']['channel'][0]['item'].length);
            fs.writeFile(resources['nyaa']['dir'] + 'result.json', JSON.stringify(result));
            var items = result['rss']['channel'][0]['item'];
            roundDownload(items, 0);
        });
    });
}).on('error', function() {
    console.log('Error');
});
// fs.readFile('result.xml', function(err, data) {
//     //console.log(data.toString());
//     parseXML(data.toString(), function(err, result) {
//         console.dir(result['rss']['channel'][0]['item'].length);
//         //fs.writeFile(resources['nyaa']['dir'] + 'result.json', JSON.stringify(result));
//         var items = result['rss']['channel'][0]['item'];
//         roundDownload(items, 0);
//         //downloadTorrent(items[x]['link'][0], resources['nyaa']['dir'] + items[x]['title'] + '.torrent');
//     });
// });
