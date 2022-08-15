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
class AnimationTime {
}
AnimationTime.LONG = 3000;
AnimationTime.MEDIUM = 2000;
AnimationTime.SHORT = 1000;
class Toast extends AnimationTime {
    constructor(message) {
        const size = tabris_1.sizeMeasurement.measureTextsSync([
            { text: message, font: "12px" },
        ]);
        const isMax = size[0].width > screen.width - 20;
        const props = {};
        if (isMax) {
            props.left = 20;
            props.right = 20;
        }
        else {
            props.centerX = true;
        }
        const modal = new tabris_1.Composite(Object.assign({ background: "black", padding: 10, cornerRadius: 10, bottom: 30, opacity: 0 }, props)).append(new tabris_1.TextView({
            text: message,
            font: "12px",
            textColor: "white",
            left: 0,
            right: 0,
        }));
        Object.defineProperty(this, "show", {
            configurable: false,
            value: (time) => __awaiter(this, void 0, void 0, function* () {
                tabris_1.contentView.append(modal);
                yield (0, animation_1.animate)(modal, time, Toast.SHORT);
                modal.dispose();
            }),
        });
    }
}
exports.Toast = Toast;
class Modal {
    constructor(attrs = {}) {
        const width = 300;
        const buttons = [];
        //- iteracion
        let buttonAccept = null;
        let buttonCancel = null;
        let isAddButtons = false;
        let isDetach = false;
        let isShow = false;
        // ui
        const mobile_width = tabris_1.device.screenWidth;
        const mobile_height = tabris_1.device.screenHeight;
        const max_size = 560;
        const properties_modal_container = {
            elavation: 24,
            centerY: true,
            padding: 10,
            cornerRadius: 5,
            opacity: 0,
            background: 'white',
            id: 'modal-container'
        };
        if (max_size > mobile_width) {
            Object.assign(properties_modal_container, {
                left: 24,
                right: 24,
            });
        }
        else {
            Object.assign(properties_modal_container, {
                width: max_size
            });
        }
        const modalWrap = new tabris_1.Composite({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 1,
            highlightOnTouch: false,
            background: new tabris_1.Color(0, 0, 0, 50),
        }).onTap((e) => e.preventDefault());
        const modal_container = new tabris_1.Composite(properties_modal_container).appendTo(modalWrap);
        if ('title' in attrs) {
            modal_container.append(new tabris_1.TextView({
                id: 'modal-title',
                font: 'medium 18px',
                padding: 10,
                left: 0,
                right: 0,
                text: attrs.text.toCapitalize()
            }));
        }
        const modal_content = new tabris_1.Composite({
            top: '#modal-title',
            bottom: tabris_1.LayoutData.prev,
            right: 0,
            left: 0
        });
        const modal_content_scrollable = new tabris_1.ScrollView({
            layoutData: 'stretchX'
        });
        modal_container.onBoundsChanged(({ value, target }) => {
            const { height: contentViewHeight } = tabris_1.contentView.bounds;
            if (contentViewHeight < value.height) {
                modal_container.layoutData = Object.assign(Object.assign({}, properties_modal_container), { height: value.height > contentViewHeight ? (max_size - (max_size > contentViewHeight ? (20 + max_size - contentViewHeight) : 0)) : max_size > value.height ? value.height : max_size });
                modal_content.layoutData = Object.assign({}, modal_content.layoutData);
                modal_content_scrollable.layoutData = 'stretch';
            }
        });
        Object.defineProperty(this, "setButtonAccept", {
            configurable: false,
            value: (text) => {
                if (!buttonAccept) {
                    buttonAccept = createButton("accept", text);
                }
                return buttonAccept;
            },
        });
        Object.defineProperty(this, "setButtonCancel", {
            configurable: false,
            value: (text) => {
                if (!buttonCancel) {
                    buttonCancel = createButton("cancel", text);
                }
                return buttonCancel;
            },
        });
        Object.defineProperty(this, "addView", {
            configurable: false,
            value: (view) => (modal_content_scrollable.append(view), undefined),
        });
        Object.defineProperty(this, "show", {
            configurable: false,
            value: (view) => {
                if (!isAddButtons) {
                    isAddButtons = true;
                    modal_container.append(new tabris_1.Composite({
                        layoutData: "stretchX",
                        id: "buttons-modal",
                        bottom: 0,
                    }).append(buttons));
                }
                if (!isShow || isDetach) {
                    isShow = true;
                    isDetach = false;
                    modal_container.append(modal_content);
                    tabris_1.contentView.append(modalWrap);
                    (0, animation_1.animateShow)(modal_container, 0, 500);
                }
            },
        });
        Object.defineProperty(this, "removeView", {
            configurable: false,
            value: () => {
                return scrollableContent.children().dispose(), undefined;
            },
        });
        Object.defineProperty(this, "removeButtons", {
            configurable: false,
            value: () => {
                buttonAccept = buttonCancel = null;
                buttons.forEach((button) => {
                    button.dispose();
                });
            },
        });
        Object.defineProperty(this, "remove", {
            configurable: false,
            value: () => {
                if (isDetach)
                    return;
                //para que se pueda usar en un contexto de mas alcanza a solo una llamada
                (0, animation_1.animateHidden)(modalWrap, 0, 350).then(() => {
                    isDetach = true;
                    isShow = false;
                    modalWrap.detach();
                });
            },
        });
        function createButton(type, text) {
            const btn = new tabris_1.Button({
                text,
                top: buttons.length === 0 ? "prev() 20" : "auto",
                right: buttons.length === 0 ? 0 : "prev()",
                bottom: 0,
                style: "text",
            });
            const event = new tabris_1.Listeners(btn, type);
            btn.onTap(() => event.trigger(new EventModal()));
            buttons.push(btn);
            return event;
        }
    }
}
exports.Modal = Modal;
