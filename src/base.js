/*
* @Author: jxj
* @Date:   2016-06-04 22:39:17
* @Last Modified by:   jxj
* @Last Modified time: 2016-06-04 22:41:27
*/

'use strict';
 var typeHim = function(dm) {
        if (dm === undefined) {
            return "undefined";
        }
        if (dm === null) {
            return "null";
        }
        var tp = typeof dm;
        if (tp === "string" || tp === "number" || tp === "function") {
            return tp;
        }
        tp = Object.prototype.toString.call(dm);
        if (tp.indexOf("rray") !== -1 || tp.indexOf("rguments") !== -1) {
            return "array";
        } else if (tp.indexOf("ragment") !== -1) {
            return "fragment"
        } else if (tp.indexOf("odeList") !== -1) {
            return "nodelist";
        } else if (tp.indexOf("lement") !== -1) {
            return "node";
        } else if (tp.indexOf("egExp") !== -1) {
            return "regexp";
        } else if (tp.indexOf("bject") !== -1) {
            return "object";
        } else {
            return false;
        }
    };

    var miniExtend = function(aob, ob) {
        var i = null;
        for (i in ob) {
            if (!(i in aob)) {
                aob[i] = ob[i];
            }
        }
        return aob;
    }


    var getValue = function(name, ob) {
     if (["number", "string"].indexOf(typeof ob) !== -1) {
            return false;
          }

        var ar = name.split("."),
            n = ar.length;
        var temp = "";
        var i = 0;
        for (; i < n; i += 1) {
            temp = ar[i];
            ob = ob[temp];
            if (ob === undefined) {
                return false;
            }
        }
        return ob;
    };

    var getParaName = function(f) {
        var str = f.toString();
        var s1 = str.indexOf("("),
            s2 = str.indexOf(")");
        str = str.slice(s1 + 1, s2);
        return str.split(",");
    }