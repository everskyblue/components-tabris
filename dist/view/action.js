"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionContainer = exports.ActionCollection = void 0;
class ActionCollection extends Set {
    constructor(widgets) {
        super(widgets);
    }
    toString() {
        return 'ActionCollection';
    }
}
exports.ActionCollection = ActionCollection;
function ActionContainer({ children }) {
    return new ActionCollection(children);
}
exports.ActionContainer = ActionContainer;
