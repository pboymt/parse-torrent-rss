"use strict";
//7EGHHQRVV6LRVSGDEJT3C2NJ6YKL2FLP
//f90c73c235af971ac8c32267b169a9f614bd156f
class d2m {
    constructor(dmhy) {
        var str = dmhy ? dmhy : '7EGHHQRVV6LRVSGDEJT3C2NJ6YKL2FLP';
        var arr = str.match(/./g);
        var binary = '';
        console.log('run');
        console.log();
        for (let x in arr) {
            binary += this.char2num(arr[x]);
        }
        console.log(binary);
        console.log(this.bin2hex(binary));
    }
    static convert(dmhy){
      var str = dmhy ? dmhy : '7EGHHQRVV6LRVSGDEJT3C2NJ6YKL2FLP';
      var arr = str.match(/./g);
      var binary = '';
      //console.log('run');
      //console.log();
      for (let x in arr) {
          binary += this.char2num(arr[x]);
      }
      //console.log(binary);
      return this.bin2hex(binary);
    }
    char2num(char) {
        if (Number(char)) {
            char = Number(char) + 24;
            //console.log(typeof char);
        } else {
            char = char.charCodeAt(0) - 65;
            //console.log(typeof char);
        }
        let result = (Array(5).join(0) + char.toString(2)).slice(-5);
        console.log(result);
        return result;
    }
    bin2hex(bina) {
        let a = bina.match(/[0,1]{4}/g);
        console.log(a);
        let hex = '';
        for (let x in a) {
            hex += parseInt(a[x], 2).toString(16);
        }
        return hex.toLowerCase();
    }
}

//var run = new d2m();
module.exports = d2m.convert;
