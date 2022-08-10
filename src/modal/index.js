import {
    contentView,
    Composite,
    TextView,
    Color,
    Button,
    Listeners,
    EventObject,
    sizeMeasurement,
    device,
    ScrollView,
    LayoutData,
} from "tabris";

import { animate, animateHidden, animateShow } from "../animation";

class EventModal extends EventObject {}

class AnimationTime {
    static LONG = 3000;
    static MEDIUM = 2000;
    static SHORT = 1000;
}

export class Toast extends AnimationTime {
    constructor(message) {
        const size = sizeMeasurement.measureTextsSync([
            { text: message, font: "12px" },
        ]);
        const isMax = size[0].width > screen.width - 20;
        const props = {};

        if (isMax) {
            props.left = 20;
            props.right = 20;
        } else {
            props.centerX = true;
        }

        const modal = new Composite({
            background: "black",
            padding: 10,
            cornerRadius: 10,
            bottom: 30,
            opacity: 0,
            ...props,
        }).append(
            new TextView({
                text: message,
                font: "12px",
                textColor: "white",
                left: 0,
                right: 0,
            })
        );

        Object.defineProperty(this, "show", {
            configurable: false,
            value: async (time) => {
                contentView.append(modal);
                await animate(modal, time, Toast.SHORT);
                modal.dispose();
            },
        });
    }
}

export class Modal {
    constructor(attrs = {}) {
        const buttons = [];
        //- no volver añadir los botones a la vista
        let buttonAccept = null;
        let buttonCancel = null;
        let isAddButtons = false;
        let isDetach = false;
        let isShow = false;

        const modalWrap = new Composite({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0,
            highlightOnTouch: false,
            background: new Color(0, 0, 0, 50),
        }).onTap((e) => e.preventDefault());

        const modal = new Composite({
            width: 300,
            centerY: true,
            centerX: true,
            padding: 10,
            cornerRadius: 10,
            ...attrs,
        }).appendTo(modalWrap);

        const scrollableContent = new ScrollView({
            layoutData: "stretchX",
            top: LayoutData.prev,
        }).appendTo(modal);

        this.onBoundsChanged(({ value }) => {
            if (device.screenHeight - 50 < value.height) {
                modal.top = modal.bottom = 50;
                scrollableContent.bottom = LayoutData.next;
            }
            animateShow(modalWrap, 50, 500);
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
                    modal.append(buttons);
                }

                if (!isShow || isDetach) {
                    isShow = true;
                    isDetach = false;
                    contentView.append(modalWrap);
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
                if (isDetach) return;
                //para que se pueda usar en un contexto de mas alcanza a solo una llamada
                animateHidden(modalWrap, 0, AnimationTime.SHORT).then(() => {
                    isDetach = true;
                    modalWrap.detach();
                });
            },
        });

        function createButton(type, text) {
            const btn = new Button({
                text,
                top: buttons.length === 0 ? "prev() 20" : "auto",
                right: buttons.length === 0 ? 0 : "prev()",
                bottom: 0,
                style: "text",
            });

            return (
                buttons.push(btn),
                new Listeners(btn, type).onTap(() =>
                    event.trigger(new EventModal())
                )
            );
        }
    }
}
