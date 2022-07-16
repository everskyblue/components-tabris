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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NyZWVuUHJlZmVyZW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcmVmZXJlbmNlL1NjcmVlblByZWZlcmVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUM7QUFDakMsdUNBQStCO0FBQy9CLHdDQUFxQztBQUNyQyx1RUFBK0Q7QUFFL0QsTUFBcUIsZ0JBQWlCLFNBQVEsY0FBSTtJQUM5QyxZQUFZLEtBQUssRUFBRSxNQUFNO1FBQ3JCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNiLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxNQUFNLENBQUMsR0FBRyxPQUFPO1FBQ2IsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQkFBVSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksaUNBQXVCLENBQUMsQ0FBQyxFQUFFO1lBQ3BFLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtTQUNwRDtRQUNELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUFVLENBQUM7WUFDL0IsR0FBRyxFQUFFLENBQUM7WUFDTixNQUFNLEVBQUUsQ0FBQztZQUNULElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNKO0FBbEJELG1DQWtCQyJ9