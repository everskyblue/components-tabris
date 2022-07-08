export class ActionCollection extends Set {
    constructor(widgets) {
        super(widgets);
    }
    
    toString() {
        return 'ActionCollection'
    }
}

export function ActionContainer({children}) {
    return new ActionCollection(children);
}