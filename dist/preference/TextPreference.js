"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {NavigationView} from 'tabris'
const ContainerItemPreference_1 = require("./ContainerItemPreference");
class TextPreference extends ContainerItemPreference_1.default {
    constructor(attrs) {
        super(Object.assign(Object.assign({}, attrs), { mode: ('renderView' in attrs ? 'action' : 'none') }));
    }
}
exports.default = TextPreference;
