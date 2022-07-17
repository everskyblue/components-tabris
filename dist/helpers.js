"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInArray = void 0;
function getInArray(param) {
    return param.length === 1 && Array.isArray(param[0]) ? param[0] : param;
}
exports.getInArray = getInArray;
