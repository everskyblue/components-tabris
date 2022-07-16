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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoUHJlZmVyZW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcmVmZXJlbmNlL1N3aXRjaFByZWZlcmVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQXNEO0FBQ3RELHVFQUErRDtBQUMvRCwyREFBc0Q7QUFFdEQsTUFBYSxPQUFRLFNBQVEsaUNBQXVCO0lBQ2hELFlBQVksS0FBSzs7UUFDYixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFYixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2hDLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsTUFBQSxJQUFBLHNDQUFrQixFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUNBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEQsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBRW5DLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsR0FBRSxFQUFFO1lBQzFCLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUN0QyxXQUFXLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDdEM7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQTtRQUVGLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNKO0FBekJELDBCQXlCQztBQUVELE1BQWEsa0JBQW1CLFNBQVEsT0FBTztJQUMzQyxVQUFVLENBQUMsS0FBSztRQUNaLE9BQU8sSUFBSSxpQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQUpELGdEQUlDO0FBRUQsTUFBYSxnQkFBaUIsU0FBUSxPQUFPO0lBQ3pDLFVBQVUsQ0FBQyxLQUFLO1FBQ1osT0FBTyxJQUFJLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUFKRCw0Q0FJQztBQUVELHFCQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO0lBQ3RELElBQUksRUFBRSxTQUFTO0lBQ2YsT0FBTyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxDQUFBO0FBRUYscUJBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMifQ==