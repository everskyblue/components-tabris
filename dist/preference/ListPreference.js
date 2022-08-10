"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const ContainerItemPreference_1 = require("./ContainerItemPreference");
const initializeStorage_1 = require("./initializeStorage");
class ListPreference extends ContainerItemPreference_1.default {
    constructor(attrs) {
        super(attrs);
        Object.defineProperty(this, 'view', {
            enumerable: false,
            configurable: false,
            get() {
                return this.arrayObjectList.map((data, i) => {
                    const isObject = typeof data === 'object';
                    const text = isObject ? data.text : data;
                    const value = isObject ? data.valueStore : i;
                    const radio = new tabris_1.RadioButton({
                        text,
                        left: 0,
                        right: 0,
                        highlightOnTouch: true,
                        top: 'prev() 5',
                        checked: (0, initializeStorage_1.getValuePreference)(this.key) === value
                    });
                    radio.onSelect(({ checked }) => {
                        if (checked) {
                            this.onChange.trigger({ value });
                        }
                    });
                    return radio;
                });
            }
        });
    }
}
exports.default = ListPreference;
tabris_1.NativeObject.defineProperties(ListPreference.prototype, {
    arrayObjectList: { type: 'any', default: [] },
    mode: { type: 'string', default: 'modal', choice: ['modal', 'page'] },
});
