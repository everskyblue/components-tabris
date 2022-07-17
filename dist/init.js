"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
tabris_1.app.registerFont('Roboto Slab', __dirname + '/../assets/fonts/RobotoSlab-VariableFont_wght.ttf');
String.prototype.toCapitalize = function () {
    let nw = '';
    for (let i = 0, isNextUpper = false, str; i < this.length; i++) {
        str = this[i];
        if (i === 0 || isNextUpper) {
            nw += str.toUpperCase();
            isNextUpper = false;
        }
        else if (/\s/.test(str)) {
            isNextUpper = true;
            nw += str;
        }
        else {
            nw += str;
        }
    }
    return nw;
};
