"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const page_1 = require("../view/page");
const helpers_1 = require("../helpers");
const ContainerItemPreference_1 = require("./ContainerItemPreference");
class ScreenPreference extends page_1.default {
    constructor(attrs, childs) {
        super(attrs);
        if (Array.isArray(childs))
            this.append(childs);
    }
    append(...widgets) {
        const childs = (0, helpers_1.getInArray)(widgets);
        if (childs.every(child => !(child instanceof ContainerItemPreference_1.default))) {
            throw new Error('is not component of preference');
        }
        return super.append(new tabris_1.ScrollView({
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }).append(childs));
    }
}
exports.default = ScreenPreference;
