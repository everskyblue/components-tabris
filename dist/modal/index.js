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
        //- no volver añadir los botones a la vista
        let buttonAccept = null;
        let buttonCancel = null;
        let isAddButtons = false;
        let isDetach = false;
        let isShow = false;
        const modalWrap = new tabris_1.Composite({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0,
            highlightOnTouch: false,
            background: new tabris_1.Color(0, 0, 0, 50),
        }).onTap((e) => e.preventDefault());
        const modal = new tabris_1.Composite(Object.assign({ width, background: "white", centerY: true, centerX: true, padding: 10, cornerRadius: 10 }, attrs)).appendTo(modalWrap);
        const scrollableContent = new tabris_1.ScrollView({
            id: "scrollable-modal-content",
            direction: "vertical",
            left: 0,
            right: 0,
            top: tabris_1.LayoutData.prev,
            bottom: tabris_1.LayoutData.prev,
        }).appendTo(modal);
        modal.onBoundsChanged(({ value }) => {
            if (tabris_1.device.screenHeight - 10 < value.height) {
                modal.layoutData = {
                    height: "auto",
                    top: 10,
                    bottom: 10,
                    centerX: true,
                    width
                };
                scrollableContent.layoutData = {
                    top: tabris_1.LayoutData.prev,
                    bottom: 25,
                    left: 0,
                    right: 0,
                    height: "auto",
                };
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
            value: (view) => (scrollableContent.append(view), undefined),
        });
        Object.defineProperty(this, "show", {
            configurable: false,
            value: (view) => {
                if (!isAddButtons) {
                    isAddButtons = true;
                    modal.append(new tabris_1.Composite({
                        layoutData: "stretchX",
                        id: "buttons-modal",
                        bottom: 0,
                    }).append(buttons));
                }
                if (!isShow || isDetach) {
                    isShow = true;
                    isDetach = false;
                    tabris_1.contentView.append(modalWrap);
                    (0, animation_1.animateShow)(modalWrap, 0, 400);
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
                (0, animation_1.animateHidden)(modalWrap, 0, AnimationTime.SHORT).then(() => {
                    isDetach = true;
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
