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
var downloadTorrent = function(url, filename) {
    console.log(url);
    http.get(url, function(res) {
        var writeStream = fs.createWriteStream(filename);
        writeStream.on('finish', function() {
            console.log('文件' + filename + '下载完成');
        });
        res.on('data', function(chunk) {
            writeStream.write(chunk);
        });
        res.on('end', function() {
            writeStream.end();
        });
    });
};
//resources['nyaa']['url']
// http.get('result.xml', function(res) {
//     responseText = '';
//     res.on('data', function(chunk) {
//         //console.log('BODY: ' + chunk);
//         responseText += chunk;
//     });
//     res.on('end', function() {
//         //console.log(responseText);
//         fs.writeFile(resources['nyaa']['dir'] + 'result.xml', responseText);
//         parseXML(responseText, function(err, result) {
//             console.dir(result['rss']['channel'][0]['item'].length);
//             fs.writeFile(resources['nyaa']['dir'] + 'result.json', JSON.stringify(result));
//             var items = result['rss']['channel'][0]['item'];
//             var x = 0;
//             // for (x in items) {
//             //
//             // }
//             downloadTorrent(items[0]['link'], resources['nyaa']['dir'] + items[0]['title'] + '.torrent');
//         });
//     });
// }).on('error', function() {
//     console.log('Error');
// });
fs.readFile('result.xml', function(err, data) {
    //console.log(data.toString());
    parseXML(data.toString(), function(err, result) {
        console.dir(result['rss']['channel'][0]['item'].length);
        //fs.writeFile(resources['nyaa']['dir'] + 'result.json', JSON.stringify(result));
        var items = result['rss']['channel'][0]['item'];
        var x = 0;
        // for (x in items) {
        //
        // }
        downloadTorrent(items[4]['link'][0], resources['nyaa']['dir'] + items[4]['title'] + '.torrent');
    });
});
