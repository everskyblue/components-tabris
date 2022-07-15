import  {CheckBox, Switch, NativeObject} from 'tabris'
import ContainerItemPreference from './ContainerItemPreference'
import {getValuePreference} from './initializeStorage'

export class Checked extends ContainerItemPreference {
    constructor(attrs) {
        super(attrs);
        
        const checkButton = this._getButton({
            right: 0,
            centerY: true,
            checked: getValuePreference(this.key)??this.value
        })
        
        this.checked = checkButton.checked;
        
        this.on('checkedChanged', ()=> {
            if (checkButton.checked !== this.checked) {
                checkButton.checked = this.checked;
            }
            this.onChange.trigger({value: this.checked});
        })
        
        checkButton.onSelect(e => {
            this.checked = e.target.checked;
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

NativeObject.defineProperty(Checked.prototype, 'checked', {
    type: 'boolean',
    default: false
})

NativeObject.defineEvent(Checked.prototype, 'checked', false);