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
                return this.arrayObjectList.map(({ text, key }, i) => {
                    const radio = new tabris_1.RadioButton({
                        text,
                        left: 0,
                        right: 0,
                        highlightOnTouch: true,
                        top: 'prev() 5',
                        checked: (0, initializeStorage_1.getValuePreference)(this.key) === i
                    });
                    radio.onSelect(({ checked }) => {
                        if (checked) {
                            this.onChange.trigger({ value: i });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdFByZWZlcmVuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJlZmVyZW5jZS9MaXN0UHJlZmVyZW5jZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQU9lO0FBQ2YsdUVBQStEO0FBQy9ELDJEQUFxRTtBQUVyRSxNQUFxQixjQUFlLFNBQVEsaUNBQXVCO0lBQy9ELFlBQVksS0FBSztRQUNiLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUViLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUNoQyxVQUFVLEVBQUUsS0FBSztZQUNqQixZQUFZLEVBQUUsS0FBSztZQUNuQixHQUFHO2dCQUNDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDL0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxvQkFBVyxDQUFDO3dCQUMxQixJQUFJO3dCQUNKLElBQUksRUFBQyxDQUFDO3dCQUNOLEtBQUssRUFBRSxDQUFDO3dCQUNSLGdCQUFnQixFQUFFLElBQUk7d0JBQ3RCLEdBQUcsRUFBRSxVQUFVO3dCQUNmLE9BQU8sRUFBRSxJQUFBLHNDQUFrQixFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO3FCQUM5QyxDQUFDLENBQUM7b0JBRUgsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsRUFBRTt3QkFDeEIsSUFBSSxPQUFPLEVBQUU7NEJBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQTt5QkFDcEM7b0JBQ0wsQ0FBQyxDQUFDLENBQUE7b0JBQ0YsT0FBTyxLQUFLLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQTVCRCxpQ0E0QkM7QUFFRCxxQkFBWSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUU7SUFDcEQsZUFBZSxFQUFFLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFDO0lBQzNDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUM7Q0FDdEUsQ0FBQyxDQUFBIn0=