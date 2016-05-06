"use strict";
var fs = require('fs');
var xml2js = require('xml2js');
var d2m = require('./d2m.js');
var parseXML = xml2js.parseString;
var http = require('http');
var responseText = '';
var xmlObj = {};
var downloadedNum = 0;
var resources = {
    nyaa: {
        url: 'http://www.nyaa.se/?page=rss',
        dir: 'nyaa/',
        run: function() {
            if (!fs.existsSync('nyaa/')) {
                fs.mkdirSync('nyaa/');
            }
            var roundDownload = function(list, which) {
                console.log('正在下载第' + which + '个');
                downloadTorrent(list[which]['link'][0], list[which]['title'] + '.torrent', 'nyaa/', function(isDown) {
                    if (isDown) {
                        downloadedNum++;
                    }
                    if (which >= list.length - 1) {
                        console.log('下载完毕！下载了' + downloadedNum + '个文件');
                    } else {
                        roundDownload(list, which + 1);
                    }
                });
            };
            http.get('http://www.nyaa.se/?page=rss', function(res) {
                responseText = '';
                res.on('data', function(chunk) {
                    //console.log('BODY: ' + chunk);
                    responseText += chunk;
                });
                res.on('end', function() {
                    //console.log(responseText);
                    fs.writeFile('nyaa/' + 'result.xml', responseText);
                    parseXML(responseText, function(err, result) {
                        console.dir(result['rss']['channel'][0]['item'].length);
                        fs.writeFile('nyaa/' + 'result.json', JSON.stringify(result));
                        var items = result['rss']['channel'][0]['item'];
                        roundDownload(items, 0);
                    });
                });
            }).on('error', function() {
                console.log('Error');
            });
        }
    },
    dmhy: {
        url: '',
        dir: 'dmhy/main/',
        run: function() {
            if (!fs.existsSync('dmhy/')) {
                fs.mkdirSync('dmhy/');
            }
            if (!fs.existsSync('dmhy/main/')) {
                fs.mkdirSync('dmhy/main/');
            }
            http.get('http://share.dmhy.org/topics/rss/rss.xml', function(res) {
                responseText = '';
                res.on('data', function(chunk) {
                    //console.log('BODY: ' + chunk);
                    responseText += chunk;
                });
                res.on('end', function() {
                    console.log(responseText);
                    fs.writeFile('dmhy/main/' + 'result.xml', responseText);
                    parseXML(responseText, function(err, result) {
                        var jsonObj = [];
                        console.dir(result['rss']['channel'][0]['item'].length);
                        for (var i in result['rss']['channel'][0]['item']) {
                            delete result['rss']['channel'][0]['item'][i]['description'];
                            //delete result['rss']['channel'][0]['item'][i]['enclosure'];
                            delete result['rss']['channel'][0]['item'][i]['author'];
                            delete result['rss']['channel'][0]['item'][i]['guid'];
                            delete result['rss']['channel'][0]['item'][i]['category'];
                        }
                        fs.writeFile('dmhy/main/' + 'result.json', JSON.stringify(result));
                        //var items = result['rss']['channel'][0]['item'];
                        //roundDownload(items, 0);
                    });
                });
            }).on('error', function() {
                console.log('Error');
            });
        }
    }
};
var downloadTorrent = function(url, filename, dir, callback) {
    //console.log(url);
    filename = filename.replace(/\//, '-');
    if (fs.existsSync(dir + filename)) {
        console.log('文件 "' + filename + '" 已存在');
        callback(false);
    } else {
        http.get(url, function(res) {
            var writeStream = fs.createWriteStream(dir + filename);
            writeStream.on('finish', function() {
                console.log('文件 "' + filename + '" 下载完成');
            });
            res.on('data', function(chunk) {
                writeStream.write(chunk);
            });
            res.on('end', function() {
                writeStream.end();
                callback(true);
            });
        });
    }
};
if (process.argv[2]) {
    resources[process.argv[2]].run();
} else {
    resources['nyaa'].run();
}
//console.log(process.argv[2]);
// fs.readFile('result.xml', function(err, data) {
//     //console.log(data.toString());
//     parseXML(data.toString(), function(err, result) {
//         console.dir(result['rss']['channel'][0]['item'].length);
//         //fs.writeFile('nyaa/' + 'result.json', JSON.stringify(result));
//         var items = result['rss']['channel'][0]['item'];
//         roundDownload(items, 0);
//         //downloadTorrent(items[x]['link'][0], 'nyaa/' + items[x]['title'] + '.torrent');
//     });
// });
