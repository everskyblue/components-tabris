"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationDrawer = exports.DrawerMenuItem = exports.NavigationView = void 0;
require("../init");
const tabris_1 = require("tabris");
const helpers_1 = require("../helpers");
const variant_1 = require("../variant");
class EventActionItemSelected extends tabris_1.EventObject {
    constructor(props) {
        super();
        ['$type', '$target', 'index'].forEach(prop => {
            this[prop] = props[(prop[0] === '$' ? prop.slice(1) : prop)];
        });
    }
}
class NavigationView extends tabris_1.NavigationView {
    constructor(attrs) {
        super(attrs);
    }
    append(...widgets) {
        const wg = (0, helpers_1.getInArray)(widgets);
        const somePage = wg.some(page => page.toString() === 'PageComponent');
        if (somePage) {
            const find = wg.find(w => w.toString() === 'PageComponent');
            find.onAppear(() => {
                if (find.$visible === false)
                    find.$visible = true;
            });
            find.trigger('$visibleChanged', {
                value: true,
                parent: this
            });
            const pages = this.pages();
            pages.forEach(page => {
                page.$visible = false;
            });
            if (pages.length === 0 && this.$controlDrawer) {
                find.on$visibleChanged(({ value }) => {
                    tabris_1.drawer.enabled = value;
                });
            }
        }
        super.append(...widgets);
    }
    toString() {
        return 'NavigationView';
    }
}
exports.NavigationView = NavigationView;
class DrawerMenuItem extends tabris_1.Composite {
    constructor(attrs) {
        super(Object.assign({ left: 0, right: 0, top: 'prev()', padding: variant_1.padding, highlightOnTouch: true }, attrs));
        this.$indexes.push(this);
        let left = 50;
        if (this.image !== null) {
            this.append(this._throwParamOrGet('image', tabris_1.ImageView, {
                image: this.image,
                centerY: true,
            }));
        }
        this.append(this._throwParamOrGet('title', tabris_1.TextView, {
            text: this.title.toCapitalize(),
            centerY: true,
        }).set({ font: variant_1.fontTitle, left }));
    }
    set onItemSelected(callback) {
        const listener = new tabris_1.Listeners(this, 'itemSelected');
        const delay = ({ type, target }) => {
            const evt = new EventActionItemSelected({
                index: this.$indexes.findIndex(item => item === this),
                type,
                target
            });
            callback(evt);
            if (!evt.defaultPrevented)
                tabris_1.drawer.close();
        };
        listener.addListener(evt => {
            setTimeout(delay.bind(this, evt), 100);
        });
        this.$event = listener;
        this.on('tap', listener.trigger);
    }
    get onItemSelected() {
        return this.$event;
    }
    _throwParamOrGet(key, View, attrs) {
        return typeof this[key] === 'string' ?
            new View(attrs) :
            this[key] instanceof View ?
                this[key] :
                (() => {
                    throw new Error('required string or instance of Widget');
                })();
    }
    toString() {
        return 'DrawerMenuItem';
    }
}
exports.DrawerMenuItem = DrawerMenuItem;
class NavigationDrawer extends tabris_1.Composite {
    constructor(attrs) {
        super(Object.assign(Object.assign({}, attrs), { left: 0, right: 0, top: 'prev()' }));
        Object.defineProperty(this, 'addMenu', {
            configurable: false,
            enumerable: false,
            value: (attrs) => {
                return this.append(NavigationDrawer.MenuItem(attrs));
            }
        });
        Object.defineProperty(this, 'addGroup', {
            configurable: false,
            enumerable: false,
            value: (title, children) => {
                return this.append(NavigationDrawer.Group({ title, children }));
            }
        });
    }
    set onActionItemSelected(callback) {
        this.find(DrawerMenuItem).forEach(item => {
            item.onItemSelected = callback;
        });
        this.$event = callback;
    }
    get onActionItemSelected() {
        return this.$event;
    }
    static Group({ title: text, children }) {
        if (children.some(child => child.toString() !== 'DrawerMenuItem')) {
            throw new Error('children no instance of DrawerMenuItem');
        }
        return [
            new tabris_1.TextView({
                text: text.toCapitalize(),
                padding: (variant_1.padding),
                top: 'prev() 10',
                font: variant_1.fontTitleGroup
            }),
            ...children
        ];
    }
    static MenuItem(attrs) {
        return new DrawerMenuItem(attrs);
    }
    on(type, callback, context) {
        super.on(type, callback, context !== null && context !== void 0 ? context : this);
        if (type === 'itemSelected') {
            //console.log(this._callbacks[type][0].fn.ctx, type);
        }
        return this;
    }
    toString() {
        return 'NavigationDrawer';
    }
}
exports.NavigationDrawer = NavigationDrawer;
tabris_1.NativeObject.defineProperties(NavigationView.prototype, {
    $controlDrawer: { type: 'boolean', default: true },
});
tabris_1.NativeObject.defineProperties(DrawerMenuItem.prototype, {
    title: { type: 'any', default: '' },
    image: { default: null, type: 'any' },
    key: { type: 'string', default: '' },
    $indexes: { default: [] },
    $event: { default: null },
});
tabris_1.NativeObject.defineEvents(DrawerMenuItem.prototype, [
    'itemSelected'
]);
tabris_1.NativeObject.defineProperties(NavigationDrawer.prototype, {
    myProp: { default: null, type: 'any' },
    actionItemSelected: { type: 'string', default: '' },
});
tabris_1.NativeObject.defineEvent(NavigationDrawer.prototype, 'actionItemSelected', true);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L25hdmlnYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQWdCO0FBQ2hCLG1DQVVlO0FBQ2Ysd0NBQXFDO0FBQ3JDLHdDQUE2RDtBQUU3RCxNQUFNLHVCQUF3QixTQUFRLG9CQUFXO0lBQzdDLFlBQVksS0FBSztRQUNiLEtBQUssRUFBRSxDQUFDO1FBQ1IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQUVELE1BQWEsY0FBZSxTQUFRLHVCQUFVO0lBQzFDLFlBQVksS0FBSztRQUNiLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQUcsT0FBTztRQUNiLE1BQU0sRUFBRSxHQUFHLElBQUEsb0JBQVUsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLGVBQWUsQ0FBQyxDQUFDO1FBRXRFLElBQUksUUFBUSxFQUFFO1lBQ1YsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxlQUFlLENBQUMsQ0FBQztZQUU1RCxJQUFJLENBQUMsUUFBUSxD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