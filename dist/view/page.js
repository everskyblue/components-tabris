"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const helpers_1 = require("../helpers");
class Page extends tabris_1.Page {
    constructor(attrs) {
        super(attrs);
        const actionStore = [];
        this.on$actionStore(({ actions }) => {
            actionStore.push(...actions);
        });
        this.onDispose(() => {
            actionStore.forEach(action => {
                action.dispose();
            });
        });
        let parentElement;
        this.on$visibleChanged(({ value, parent }) => {
            if (typeof parent !== 'undefined' && typeof parentElement === 'undefined') {
                parentElement = parent;
            }
            if (this.parent() !== null) {
                parentElement = this.parent();
            }
            // añadir valor
            if (this.$visible !== value) {
                return (this.$visible = value);
            }
            if (this.$visible) {
                parentElement.append(actionStore);
            }
            else if (this.$visible === false) {
                actionStore.forEach(action => {
                    action.detach();
                });
            }
        });
    }
    append(...$widgets) {
        const widgets = (0, helpers_1.getInArray)($widgets);
        const actionCollection = widgets.find(widget => widget.toString() === 'ActionCollection');
        if (typeof actionCollection !== 'undefined')
            this.trigger('$actionStore', { actions: actionCollection });
        super.append(widgets.filter(widget => widget !== actionCollection));
    }
    toString() {
        return 'PageComponent';
    }
}
Page.defineProperties(Page.prototype, {
    $visible: { type: 'boolean', default: false, const: false },
});
Page.defineEvent(Page.prototype, '$actionStore', false);
exports.default = Page;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L3BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBeUM7QUFDekMsd0NBQXFDO0FBRXJDLE1BQU0sSUFBSyxTQUFRLGFBQVU7SUFDekIsWUFBWSxLQUFLO1FBQ2IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUU7WUFDOUIsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFFLEVBQUU7WUFDZixXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN6QixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksYUFBYSxDQUFDO1FBRWxCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksT0FBTyxhQUFhLEtBQUssV0FBVyxFQUFFO2dCQUN2RSxhQUFhLEdBQUcsTUFBTSxDQUFDO2FBQzFCO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUN4QixhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2pDO1lBQ0QsZUFBZTtZQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7Z0JBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDO2FBQ2xDO1lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLGFBQWEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDckM7aUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUEsRUFBRTtvQkFDeEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNwQixDQUFDLENBQUMsQ0FBQTthQUNMO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQUcsUUFBUTtRQUNkLE1BQU0sT0FBTyxHQUFHLElBQUEsb0JBQVUsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssa0JBQWtCLENBQUMsQ0FBQztRQUN6RixJQUFJLE9BQU8sZ0JBQWdCLEtBQUssV0FBVztZQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFDLENBQUMsQ0FBQztRQUN2RyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBLEVBQUUsQ0FBQyxNQUFNLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQztDQUNKO0FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7SUFDbEMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7Q0FDNUQsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUV4RCxrQkFBZSxJQUFJLENBQUMifQ==