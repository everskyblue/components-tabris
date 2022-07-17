"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchPreference = exports.CheckBoxPreference = exports.Checked = void 0;
const tabris_1 = require("tabris");
const ContainerItemPreference_1 = require("./ContainerItemPreference");
const initializeStorage_1 = require("./initializeStorage");
class Checked extends ContainerItemPreference_1.default {
    constructor(attrs) {
        var _a;
        super(attrs);
        const checkButton = this._getButton({
            right: 0,
            centerY: true,
            checked: (_a = (0, initializeStorage_1.getValuePreference)(this.key)) !== null && _a !== void 0 ? _a : this.value
        });
        this.checked = checkButton.checked;
        this.on('checkedChanged', () => {
            if (checkButton.checked !== this.checked) {
                checkButton.checked = this.checked;
            }
            this.onChange.trigger({ value: this.checked });
        });
        checkButton.onSelect(e => {
            this.checked = e.target.checked;
        });
        this.append(checkButton);
    }
}
exports.Checked = Checked;
class CheckBoxPreference extends Checked {
    _getButton(attrs) {
        return new tabris_1.CheckBox(attrs);
    }
}
exports.CheckBoxPreference = CheckBoxPreference;
class SwitchPreference extends Checked {
    _getButton(attrs) {
        return new tabris_1.Switch(attrs);
    }
}
exports.SwitchPreference = SwitchPreference;
tabris_1.NativeObject.defineProperty(Checked.prototype, 'checked', {
    type: 'boolean',
    default: false
});
tabris_1.NativeObject.defineEvent(Checked.prototype, 'checked', false);
