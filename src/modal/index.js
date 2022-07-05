import {
    contentView,
    Composite,
    TextView,
    Color,
    Button,
    Listeners,
    EventObject,
    sizeMeasurement
} from 'tabris'

import {animate, animateShow} from '../animation'

class EventModal extends EventObject {}

export class Toast {
    static LONG = 3000;
    static MEDIUM = 2000;
    static SHORT = 1000;

    constructor(message) {
        const size = sizeMeasurement.measureTextsSync([{text: message, font: '12px'}])
        const isMax = size[0].width > (screen.width - 20);
        const props = {};
        
        if (isMax) {
            props.left = 20;
            props.right = 20;
        } else {
            props.centerX = true;
        }
        
        const modal = new Composite({
            background: 'black',
            padding: 10,
            cornerRadius: 10,
            bottom: 30,
            opacity: 0,
            ...props
        }).append(new TextView({
            text: message,
            font: '12px',
            textColor: 'white',
            left: 0,
            right: 0
        }))
        
        Object.defineProperty(this, 'show', {
            configurable: false,
            value: async (time)=> {
                contentView.append(modal);
                await animate(modal, time, Toast.SHORT);
                modal.dispose();
            }
        })
    }
}

export class Modal {
    constructor(attrs = {}) {
        const modalWrap = new Composite({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0,
            highlightOnTouch: false,
            background: new Color(0, 0, 0, 50)
        }).onTap(e => e.preventDefault());
        
        const buttons = [];
        
        const modal = new Composite({
            width: 300,
            centerY: true,
            centerX: true,
            background: 'white',
            padding: 10,
            cornerRadius: 10,
            ...attrs
        }).appendTo(modalWrap);
        
        const createButton = (type, text)=> {
            const btn = new Button({
                text,
                top: buttons.length === 0 ? 'prev() 20' : 'auto',
                right: buttons.length === 0 ? 0 : 'prev()',
                bottom: 0,
                style: 'text'
            });
            
            const event = new Listeners(btn, type);
            btn.onTap(()=> {
                event.trigger(new EventModal());
            });
            buttons.push(btn);
            return event;
        }
        
        Object.defineProperty(this, 'setButtonAccept', {
            configurable: false,
            value: (text)=> createButton('accept', text)
        })
        
        Object.defineProperty(this, 'setButtonCancel', {
            configurable: false,
            value: (text)=> createButton('cancel', text)
        })
        
        Object.defineProperty(this, 'addView', {
            configurable: false,
            value: (view)=> modal.append(view)
        })
        
        Object.defineProperty(this, 'show', {
            configurable: false,
            value: (view)=> {
                modal.append(buttons);
                contentView.append(modalWrap);
                animateShow(modalWrap, 50, 500);
            }
        })
        
        Object.defineProperty(this, 'remove', {
            configurable: false,
            value: ()=> modalWrap.dispose()
        })
    }
}