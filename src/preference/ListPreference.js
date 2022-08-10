import {
    Color,
    Composite,
    RadioButton,
    Button,
    contentView,
    NativeObject
} from 'tabris'
import ContainerItemPreference from './ContainerItemPreference'
import {setPreference, getValuePreference} from './initializeStorage'

export default class ListPreference extends ContainerItemPreference {
    constructor(attrs) {
        super(attrs);
        
        Object.defineProperty(this, 'view', {
            enumerable: false,
            configurable: false,
            get() {
                return this.arrayObjectList.map((data, i) => {
                    const isObject = typeof data === 'object';
                    const text = isObject ? data.text : data;
                    const value = isObject ? data.valueStore : i;

                    const radio = new RadioButton({
                        text,
                        left:0,
                        right: 0,
                        highlightOnTouch: true,
                        top: 'prev() 5',
                        checked: getValuePreference(this.key) === value
                    });
                    
                    radio.onSelect(({checked})=> {
                        if (checked) {
                            this.onChange.trigger({value})
                        }
                    })
                    return radio;
                })
            }
        })
    }
}

NativeObject.defineProperties(ListPreference.prototype, {
    arrayObjectList: {type: 'any', default: []},
    mode: {type: 'string', default: 'modal', choice: ['modal', 'page']},
})