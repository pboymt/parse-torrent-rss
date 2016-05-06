"use strict";
class d2d {
    constructor(str) {
        //Fri, 06 May 2016 14:41:02 +0800
        //var strFormat = /([0-3]{0,1}[0-9]) ([A-Z][a-z]{2,3}) ([1-2][0-9]{3}) (2[0-4]|[0-1][0-9]):([0-5][0-9]):([0-5][0-9])/;
        //var a = str.match(strFormat);
        //var d = new Date();
        //d.parse(str);
        this.ms = Date.parse(str);
        var d = new Date(this.ms);
        return (d.getFullYear() + '/' + (Array(2).join(0) + (d.getMonth() * 1 + 1)).slice(-2) + '/' + (Array(2).join(0) + d.getDate()).slice(-2));
    }
}

var run = new d2d('Fri, 06 May 2016 14:41:02 +0800');
