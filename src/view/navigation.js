import {
    NavigationView as Navigation,
    CollectionView,
    TextView,
    ImageView,
    drawer,
    Composite,
    Listeners,
    EventObject,
    NativeObject
} from 'tabris'

class EventActionItemSelected extends EventObject {
    constructor(props) {
        super();
        ['$type', '$target', 'index'].forEach(prop => {
            this[prop] = props[(prop[0] === '$' ? prop.slice(1):prop)];
        })
    }
}

export class NavigationView extends Navigation {
    constructor(attrs) {
        super(attrs);
    }

    append(...widgets) {
        const wg = Array.isArray(widgets[0]) ? widgets[0] : [...widgets];
        const somePage = wg.some(page => page.toString() === 'PageComponent');
        
        if (somePage) {
            const find = wg.find(w => w.toString() === 'PageComponent');
            
            find.onAppear(()=> {
                if (find.$visible === false) find.$visible = true;
            })
            
            find.trigger('$visibleChanged', {
                value: true,
                parent: this
            });
            
            const pages = this.pages();
            pages.forEach(page => {
                page.$visible = false;
            })
            
            if (pages.length === 0 && this.$controlDrawer) {
                find.on$visibleChanged(({value})=> {
                    drawer.enabled = value;
                });
            }
        }
        super.append(...widgets);
    }
    
    toString() {
        return 'NavigationView'
    }
}

export class DrawerMenuItem extends Composite {
    constructor(attrs) {
        super({
            ...attrs,
            left: 0,
            right: 0,
            top: 'prev()',
            padding: 10,
            highlightOnTouch: true
        })
        
        this.$indexes.push(this);
        
        if (this.image !== null) {
            this.append(this._throwParamOrGet('image', ImageView, {
                image: this.image
            }));
        }
        
        this.append(this._throwParamOrGet('title', TextView, {
            text: this.title
        }));
    }
    
    set onItemSelected(callback){
        const listener = new Listeners(this, 'itemSelected');
        const delay = ({type, target})=> {
            const evt = new EventActionItemSelected({
                index: this.$indexes.findIndex(item => item === this),
                type,
                target
            });
            callback(evt);
            if (!evt.defaultPrevented) drawer.close();
        }
        listener.addListener(evt =>  {
            setTimeout(delay.bind(this,evt), 100);
        });
        this.$event= listener;
        this.on('tap', listener.trigger);
    }
    
    get onItemSelected(){
        return this.$event;
    }
    
    _throwParamOrGet(key, View, attrs) {
        return typeof this[key] === 'string' ?
            new View(attrs) :
            this[key] instanceof View ? 
                this[key] :
                (()=> {
                    throw new Error('required string or instance of Widget')
                })()
    }
    
    toString(){
        return 'DrawerMenuItem';
    }
}

export class NavigationDrawer extends Composite {
    constructor(attrs) {
        super({...attrs, left: 0, right: 0, top: 'prev()'});
        
        Object.defineProperty(this, 'addMenu', {
            configurable: false,
            enumerable: false,
            value: (attrs)=> {
                return this.append(NavigationDrawer.MenuItem(attrs));
            }
        })
        
        Object.defineProperty(this, 'addGroup', {
            configurable: false,
            enumerable: false,
            value: (title, children)=> {
                return this.append(NavigationDrawer.Group({title, children}));
            }
        })
    }
    
    set onActionItemSelected(callback) {
        this.find(DrawerMenuItem).forEach(item => {
            item.onItemSelected = callback;
        })
        
        this.$event = callback;
    }
    
    get onActionItemSelected() {
        return this.$event;
    }
    
    static Group({title: text, children}) {
        if (children.some(child => child.toString() !== 'DrawerMenuItem')) {
            throw new Error('children no instance of DrawerMenuItem')
        }
        
        return [
            new TextView({
                text,
                padding: 10,
                top: 'prev() 10',
                font:'12px bold'
            }),
            ...children
        ];
    }
    
    static MenuItem(attrs) {
        return new DrawerMenuItem(attrs);
    }
    
    on(type, callback, context) {
        super.on(type, callback, context??this);
        if (type === 'itemSelected') {
            //console.log(this._callbacks[type][0].fn.ctx, type);
        }
        return this;
    }
    
    toString() {
        return 'NavigationDrawer'
    }
}

NativeObject.defineProperties(NavigationView.prototype, {
    $controlDrawer: {type: 'boolean', default: true},
});

NativeObject.defineProperties(DrawerMenuItem.prototype, {
    title: {type: 'any', default: ''},
    image: {default: null, type: 'any'},
    key: {type: 'string', default: ''},
    $indexes: {default: []},
    $event: {default: null},
})
NativeObject.defineEvents(DrawerMenuItem.prototype, [
    'itemSelected'
])

NativeObject.defineProperties(NavigationDrawer.prototype, {
    myProp: {default: null, type: 'any'},
    actionItemSelected: {type: 'string', default: ''},
})

NativeObject.defineEvent(
    NavigationDrawer.prototype,
    'actionItemSelected',
    true
)