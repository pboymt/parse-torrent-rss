"use strict";

var fs = require('fs');
var jszip = require('jszip');
var zip = new jszip();
var dir = fs.readdirSync('dmhy/main/');

zip.file('result.json', fs.readFileSync('dmhy/main/result.json'));
zip.file('result.xml', fs.readFileSync('dmhy/main/result.xml'));
for (var x in dir) {
    zip.folder("torrent").file(dir[x], fs.readFileSync('dmhy/main/' + dir[x]));
    //console.log(dir[x]);
}
zip.generateNodeStream({
        type: 'nodebuffer',
        streamFiles: true
    })
    .pipe(fs.createWriteStream('out.zip'))
    .on('end', function() {
        console.log("out.zip written.");
    });
