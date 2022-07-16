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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlQcmVmZXJlbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ByZWZlcmVuY2UvQ2F0ZWdvcnlQcmVmZXJlbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQStCO0FBQy9CLHVFQUErRDtBQUMvRCx3Q0FBa0Q7QUFFbEQsTUFBcUIsa0JBQW1CLFNBQVEsaUNBQXVCO0lBQ25FLFlBQVksRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUU7UUFDdkMsS0FBSyxDQUFDO1lBQ0YsR0FBRyxFQUFFLFVBQVU7WUFDZixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDO1NBQ2IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlCQUFRLENBQUM7WUFDckIsSUFBSSxFQUFFLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDMUIsSUFBSSxFQUFFLHdCQUFjO1lBQ3BCLE9BQU8sRUFBUCxpQkFBTztZQUNQLFNBQVM7U0FDWixDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUNuQixDQUFDO0NBQ0o7QUFkRCxxQ0FjQyJ9