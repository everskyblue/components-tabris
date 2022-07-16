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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvYWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsZ0JBQWlCLFNBQVEsR0FBRztJQUNyQyxZQUFZLE9BQU87UUFDZixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLGtCQUFrQixDQUFBO0lBQzdCLENBQUM7Q0FDSjtBQVJELDRDQVFDO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLEVBQUMsUUFBUSxFQUFDO0lBQ3RDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRkQsMENBRUMifQ==