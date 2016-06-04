/*
* @Author: jxj
* @Date:   2016-06-04 22:42:39
* @Last Modified by:   jxj
* @Last Modified time: 2016-06-04 22:53:02
*/

'use strict';


var parseS=function(str) { //解析表达式
            var tp = str.slice(0, str.indexOf("\x20"));
            var obs = null;
            var reg = null;
            var mat;
            if (tp === "for") {
                reg = /for\s+([\w|\|]+)\s+in\s+([\w|\|\.]+)/;
                mat = reg.exec(str);
                obs = [mat[1], mat[2]];
            } else if (tp === "if") {
                reg = /if\s+([\w|\|\.]+)+\s+([\<\>\=])+\s+([\w|\|\.]+)/;
                mat = reg.exec(str);
                obs = [mat[1], mat[2], mat[3]];
            }
            return obs;
        }

var compIf=function(vara, expre, varb) { //条件对比
            switch (expre) {
                case "<":
                    tf = (vara < varb);
                    break;
                case ">":
                    tf = (vara > varb);
                    break;
                case "=":
                    tf = (vara = varb);
                    break;
            }
            return tf;
        }

var anaTag=function(htm) { //解析？？
            var regold = /\[\[(\w+)(?=\s)[\w\s\>\<\=\|\.]+\]\]/;
            var reg;
            var mat = null;
            var no = 0;
            var lf = "",
                rt = "";
            var tp = null;
            var right = "";
            var out = [];
            var temp = [];
            // var ctr=false;
            // 开始为零的时候表示最开始，最后的为零的表示最后匹配到的结束
            tp = regold.exec(htm);

            do {
                // 通过判断[[]][[/]]闭合与否来进行一次语句抽取，一次为no+=1，闭合为-=1
                // 为第一次no为0的时候，进行正则替换
                if (no === 0) {
                    if (!tp) {
                        return false;
                    } else {
                        tp = tp[1];
                    }

                    // tp为类型，比如for还是if
                    reg = new RegExp('\\[\\[' + tp + '[\\w\\s\\>\\<\\=\\|\\.]+\\]\\]|(\\[\\[\\/' + tp + '\\]\\])', 'g');
                    mat = reg.exec(htm);
                    lf = [mat.index, reg.lastIndex];
                } else {
                    mat = reg.exec(htm);
                }
                if (mat[1]) {
                    no -= 1;
                } else {
                    no += 1;
                }
                if (no === 0) {
                    rt = [mat.index, reg.lastIndex];
                    // 在当层下一个个取
                    temp = [{
                        html: htm.slice(0, lf[0])
                    }, {
                        html: htm.slice(lf[1], rt[0]),
                        express: htm.slice(lf[0] + 2, lf[1] - 2)
                    }];
                    htm = right = htm.slice(rt[1]);
                    tp = regold.exec(right);
                    out = out.concat(temp);
                }
            } while (mat && tp);
            out.push({
                html: right
            });
            return out;
        };

var filters={ //所有的filter函数都有三个参数 str,item,lg
            upper: function(str) {
                return str.toUpperCase();
            },
            lower: function(str) {
                return str.toLowerCase();
            },
            length: function(str) {
                if (typeHim(str) !== "array") {
                    return str;
                }
                return str.length;
            },
            safe: function(str) {
                if (typeof str === "string") {
                    return safeHtml(str);
                }
            }
        };
