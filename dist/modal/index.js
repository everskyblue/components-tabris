"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = exports.Toast = void 0;
const tabris_1 = require("tabris");
const animation_1 = require("../animation");
class EventModal extends tabris_1.EventObject {
}
class Toast {
    constructor(message) {
        const size = tabris_1.sizeMeasurement.measureTextsSync([{ text: message, font: '12px' }]);
        const isMax = size[0].width > (screen.width - 20);
        const props = {};
        if (isMax) {
            props.left = 20;
            props.right = 20;
        }
        else {
            props.centerX = true;
        }
        const modal = new tabris_1.Composite(Object.assign({ background: 'black', padding: 10, cornerRadius: 10, bottom: 30, opacity: 0 }, props)).append(new tabris_1.TextView({
            text: message,
            font: '12px',
            textColor: 'white',
            left: 0,
            right: 0
        }));
        Object.defineProperty(this, 'show', {
            configurable: false,
            value: (time) => __awaiter(this, void 0, void 0, function* () {
                tabris_1.contentView.append(modal);
                yield (0, animation_1.animate)(modal, time, Toast.SHORT);
                modal.dispose();
            })
        });
    }
}
exports.Toast = Toast;
Toast.LONG = 3000;
Toast.MEDIUM = 2000;
Toast.SHORT = 1000;
class Modal {
    constructor(attrs = {}) {
        const modalWrap = new tabris_1.Composite({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0,
            highlightOnTouch: false,
            background: new tabris_1.Color(0, 0, 0, 50)
        }).onTap(e => e.preventDefault());
        const buttons = [];
        const modal = new tabris_1.Composite(Object.assign({ width: 300, centerY: true, centerX: true, background: 'white', padding: 10, cornerRadius: 10 }, attrs)).appendTo(modalWrap);
        const createButton = (type, text) => {
            const btn = new tabris_1.Button({
                text,
                top: buttons.length === 0 ? 'prev() 20' : 'auto',
                right: buttons.length === 0 ? 0 : 'prev()',
                bottom: 0,
                style: 'text'
            });
            const event = new tabris_1.Listeners(btn, type);
            btn.onTap(() => {
                event.trigger(new EventModal());
            });
            buttons.push(btn);
            return event;
        };
        Object.defineProperty(this, 'setButtonAccept', {
            configurable: false,
            value: (text) => createButton('accept', text)
        });
        Object.defineProperty(this, 'setButtonCancel', {
            configurable: false,
            value: (text) => createButton('cancel', text)
        });
        Object.defineProperty(this, 'addView', {
            configurable: false,
            value: (view) => modal.append(view)
        });
        Object.defineProperty(this, 'show', {
            configurable: false,
            value: (view) => {
                modal.append(buttons);
                tabris_1.contentView.append(modalWrap);
                (0, animation_1.animateShow)(modalWrap, 50, 500);
            }
        });
        Object.defineProperty(this, 'remove', {
            configurable: false,
            value: () => modalWrap.dispose()
        });
    }
}
exports.Modal = Modal;
