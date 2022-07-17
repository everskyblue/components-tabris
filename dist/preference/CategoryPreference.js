"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const ContainerItemPreference_1 = require("./ContainerItemPreference");
const variant_1 = require("../variant");
class CategoryPreference extends ContainerItemPreference_1.default {
    constructor({ title, textColor }, childs = []) {
        super({
            top: 'prev() 5',
            highlightOnTouch: false,
            padding: 0
        });
        this.append(new tabris_1.TextView({
            text: title.toCapitalize(),
            font: variant_1.fontTitleGroup,
            padding: variant_1.padding,
            textColor
        }), ...childs);
    }
}
exports.default = CategoryPreference;
