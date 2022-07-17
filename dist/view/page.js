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
