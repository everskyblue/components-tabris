import {NavigationView, TextView, Composite, NativeObject} from 'tabris'
import ScreenPreference from './ScreenPreference'
import {setPreference, existsKeyPreference} from './initializeStorage'
import {padding, fontSummary, fontTitle} from '../variant'
import {Modal} from '../modal'

const adjustCompactText = {
    left: 0,
    right: '10%'
};

export default class ContainerItemPreference extends Composite {
    constructor(attrs) {
        super({
            left: 0,
            right: 0,
            padding,
            top: 'prev()',
            highlightOnTouch: true,
            ...attrs,
        });
        
        if (!existsKeyPreference(this.key)) {
            setPreference(this.key, this.value);
        }
        
        if (this.title.length > 0) {
            this.append(new TextView({
                font: this.fontTitle,
                text: this.title.toCapitalize(),
            }))
        }
        
        if (this.summary.length > 0) {
            this.append(new TextView({
                text: this.summary,
                font: this.fontSummary,
                top: ['prev()', this.space],
                ...adjustCompactText,
            }));
        }
        
        const isCompact = this.mode === 'compact';
        
        this.on('change', ({value}) => {
            this.value = value;
            if (this.key !== null) {
                setPreference(this.key, this.value);
            }
        })
        
        this.onTap(({target})=> {
            if (isCompact) {
                return (this.checked = !this.checked);
            }
            if (this.mode === 'page') this.showInPage(this.view);
            else if (this.mode === 'modal') this.showInModal();
            else if (this.mode === 'action') this.renderAction();
        });
    }
    
    renderAction() {
        if (typeof this.renderView !== 'function') {
            throw new Error('property renderView needs a function')
        }
        $(NavigationView).only().append(this.renderView());
    }
    
    showInPage() {
        const screen = new ScreenPreference({
            title: this.title
        }).append(new ContainerItemPreference().append(this.view));
        $(NavigationView).only().append(screen);
    }
    
    showInModal() {
        const modal = new Modal();
        modal.setButtonCancel('close').addListener(() => {
            modal.remove();
        });
        modal.addView(this.view);
        modal.show();
    }
}

NativeObject.defineProperties(ContainerItemPreference.prototype, {
    key: {type: 'string', default: null, nullable: true},
    value: {type: 'any', default: false},
    title: {type: 'string', default: ''},
    summary: {type: 'string', default: ''},
    compact: {type: 'boolean', default: true},
    mode: {type: 'string', default: 'compact', choice: ['compact', 'modal', 'page', 'action', 'none']}, //'compact', // modal | page
    colorTitle: {type: 'string', default: ''},
    fontTitle: {type: 'string', default: fontTitle},
    colorSummary: {type: 'string', default: ''},
    fontSummary: {type: 'string', default: fontSummary},
    background: {type: 'string', default: ''},
    space: {type: 'boolean', default: 5},
    renderView: {type: 'any', default: null},
})

NativeObject.defineEvent(ContainerItemPreference.prototype, 'change', false)