import {
    Page,
    Button,
    Stack,
    TextView,
    contentView,
    Composite,
    ListView,
    CheckBox,
    RadioButton,
    Color,
    Switch,
    NavigationView
} from 'tabris';

const name_key_pref = 'preference-activity';

if (!localStorage.getItem(name_key_pref)) {
    localStorage.setItem(name_key_pref, '{}');
}

const preference = JSON.parse(localStorage.getItem(name_key_pref));

const stretchX = {
    left: 0,
    right: 0
};

const adjustCompactText = {
    left: 0,
    right: '10%'
};

const font = '15px bold';
const padding = 10;

String.prototype.toCapitalize = function() {
    let nw = '';
    for (let i = 0, isNextUpper = false, str; i < this.length; i++) {
        str = this[i];
        if (i === 0) {
            nw += str.toUpperCase();
        } else if (/\s/.test(str)) {
            isNextUpper = true;
            nw += str;
        } else if (isNextUpper) {
            isNextUpper = false;
            nw += str.toUpperCase();
        } else {
            nw += str;
        }
    }
    return nw;
};

const setPreference = (key, value)=> {
    preference[key] = value;
    localStorage.setItem(name_key_pref, JSON.stringify(preference));
};

class Box extends Composite {
    constructor({
        key,
        value = false,
        title = '',
        summary = '',
        compact = true,
        mode = 'compact', // modal | page
        colorTitle,
        colorSummary,
        background,
        space = 5,
        action
    }, params = {}) {
        super(Object.assign(stretchX, {
            padding,
            top: 'prev()',
            highlightOnTouch: true,
            ...params
        }));
        
        if (typeof key !== 'undefined') {
           if (!(key in preference)) setPreference(key, value);
            Object.defineProperty(this, 'value', {
                get: ()=> value,
                set: (val)=> {value = val}
            });
            Object.defineProperty(this, 'key', {
                get: ()=> key
            });
        }
        
        this.append(new TextView({
            font,
            text: title.toCapitalize(),
        }), new TextView({
            text: summary,
            top: ['prev()', space],
            ...adjustCompactText,
        }));
        
        this.onTap(({target})=> {
            if (mode === 'modal' || mode === 'page') this.show(action);
            else this.changeActive();
        });
    }
}

export class PreferenceScreen extends Page {
    constructor(params, childs) {
        super(params);
        if (childs.every(child => !(child instanceof Box))) {
            console.log('error')
        }
        this.append(childs);
    }
}

export class PreferenceCategory extends Composite {
    constructor({title, textColor}, childs) {
        super({
            ...stretchX,
            top: 'prev() 5',
            highlightOnTouch: false,
            padding: 0
        });
        this.append(new TextView({
            text: title.toCapitalize(),
            font: '13px',
            padding,
            textColor
        }), ...childs);
    }
}

export class Checked extends Box {
    constructor(attrs) {
        super(attrs);
        
        const checkButton = this._getButton({
            right: 0,
            centerY: true,
            checked: preference[this.key]??this.value
        }).onSelect(()=>{
            this.value = checkButton.checked;
            setPreference(this.key, this.value);
        });
        
        Object.defineProperty(this, 'changeActive', {
            configurable: false,
            value: ()=> {
                checkButton.checked = this.value = !checkButton.checked;
                setPreference(this.key, this.value);
            }
        })
        
        this.append(checkButton);
    }
}

export class CheckBoxPreference extends Checked {
    _getButton(attrs) {
        return new CheckBox(attrs);
    }
}

export class SwitchPreference extends Checked {
    _getButton(attrs) {
        return new Switch(attrs);
    }
}

export class ListPreference extends Box {
    constructor({
        title,
        summary,
        key,
        value,
        mode = 'modal',
        arrayObjectList
    }) {
        super({mode, key, value, summary, title});
        
        Object.defineProperty(this, 'show', {
            configurable: false,
            value: (screen)=> {
                const modalWrap = new Composite({
                    ...stretchX,
                    top: 0,
                    bottom: 0,
                    highlightOnTouch: false,
                    background: new Color(0, 0, 0, 50)
                }).onTap(e => e.preventDefault());
                
                const modal = new Composite({
                    width: 300,
                    centerY: true,
                    centerX: true,
                    background: 'white',
                    padding: 10,
                    cornerRadius: 10
                }).appendTo(modalWrap);
                
                arrayObjectList.forEach(({text, key}, i) => {
                    const radio = new RadioButton({
                        text,
                        ...stretchX,
                        top: 'prev() 5',
                        checked: preference[this.key] === i
                    }).appendTo(modal);
                    
                    radio.onSelect(({checked})=> {
                        if (checked) {
                            this.value = i;
                            setPreference(this.key, this.value)
                        }
                    })
                })
                
                modal.append(new Button({
                    text: 'close',
                    top: 'prev() 20',
                    right: 0,
                    style: 'text'
                }).onTap(()=> modalWrap.dispose()))
                
                contentView.append(modalWrap);
            }
        })
    }
}

export class TextPreference extends Box {
    constructor(attrs) {
        super({...attrs, mode: 'page'})
    }
    
    show(action) {
        const screen = action();
        if (!(screen instanceof PreferenceScreen)) {
            throw new Error('is not instance PreferenceScreen')
        }
        
        $(NavigationView).only().append(screen);
    }
}