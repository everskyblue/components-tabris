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
        const width = 300;
        const buttons = [];
        //- iteracion
        let buttonAccept = null;
        let buttonCancel = null;
        let isAddButtons = false;
        let isDetach = false;
        let isShow = false;

        // ui
        const mobile_width = device.screenWidth;
        const mobile_height = device.screenHeight;
        const max_size = 560;
        const properties_modal_container = {
            elavation: 24,
            centerY: true,
            padding: 10,
            cornerRadius: 5,
            opacity: 0,
            background: 'white',
            id: 'modal-container'
        }

        if (max_size > mobile_width) {
            Object.assign(properties_modal_container, {
                left: 24,
                right: 24,
            })
        } else {
            Object.assign(properties_modal_container, {
                width: max_size
            })
        }

        const modalWrap = new Composite({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 1,
            highlightOnTouch: false,
            background: new Color(0, 0, 0, 50),
        }).onTap((e) => e.preventDefault());

        const modal_container = new Composite(properties_modal_container).appendTo(modalWrap);

        if ('title' in attrs) {
            modal_container.append(new TextView({
                id: 'modal-title',
                font: 'medium 18px',
                padding: 10,
                left: 0,
                right: 0,
                text: attrs.text.toCapitalize()
            }))
        }

        const modal_content = new Composite({
            top: '#modal-title',
            bottom: LayoutData.prev,
            right: 0,
            left: 0
        });

        const modal_content_scrollable = new ScrollView({
            layoutData: 'stretchX'
        });

        
        modal_container.onBoundsChanged(({ value, target }) => {
            const {height: contentViewHeight} = contentView.bounds;

            if (contentViewHeight < value.height) {
                modal_container.layoutData = {
                    ...properties_modal_container,
                    height: value.height > contentViewHeight ? (
                        max_size - (max_size > contentViewHeight ? (20 + max_size - contentViewHeight) : 0)
                    ) : max_size > value.height ? value.height : max_size
                };
                modal_content.layoutData = {
                    ...modal_content.layoutData
                };
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
                    modal_container.append(
                        new Composite({
                            layoutData: "stretchX",
                            id: "buttons-modal",
                            bottom: 0,
                        }).append(buttons)
                    );
                }

                if (!isShow || isDetach) {
                    isShow = true;
                    isDetach = false;
                    modal_container.append(modal_content)
                    contentView.append(modalWrap);
                    animateShow(modal_container, 0, 500);
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
                animateHidden(modalWrap, 0, 350).then(() => {
                    isDetach = true;
                    isShow = false;
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
            const event = new Listeners(btn, type);
            btn.onTap(() => event.trigger(new EventModal()));
            buttons.push(btn);
            return event;
        }
    }
}
