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
        return super.append(...widgets);
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
