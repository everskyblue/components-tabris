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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kYWwvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbUNBU2U7QUFFZiw0Q0FBaUQ7QUFFakQsTUFBTSxVQUFXLFNBQVEsb0JBQVc7Q0FBRztBQUV2QyxNQUFhLEtBQUs7SUFLZCxZQUFZLE9BQU87UUFDZixNQUFNLElBQUksR0FBRyx3QkFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUE7UUFDOUUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbEQsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDaEIsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDcEI7YUFBTTtZQUNILEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxrQkFBUyxpQkFDdkIsVUFBVSxFQUFFLE9BQU8sRUFDbkIsT0FBTyxFQUFFLEVBQUUsRUFDWCxZQUFZLEVBQUUsRUFBRSxFQUNoQixNQUFNLEVBQUUsRUFBRSxFQUNWLE9BQU8sRUFBRSxDQUFDLElBQ1AsS0FBSyxFQUNWLENBQUMsTUFBTSxDQUFDLElBQUksaUJBQVEsQ0FBQztZQUNuQixJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxNQUFNO1lBQ1osU0FBUyxFQUFFLE9BQU87WUFDbEIsSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLEVBQUUsQ0FBQztTQUNYLENBQUMsQ0FBQyxDQUFBO1FBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ2hDLFlBQVksRUFBRSxLQUFLO1lBQ25CLEtBQUssRUFBRSxDQUFPLElBQUksRUFBQyxFQUFFO2dCQUNqQixvQkFBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxJQUFBLG1CQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUE7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDOztBQXhDTCxzQkF5Q0M7QUF4Q1UsVUFBSSxHQUFHLElBQUksQ0FBQztBQUNaLFlBQU0sR0FBRyxJQUFJLENBQUM7QUFDZCxXQUFLLEdBQUcsSUFBSSxDQUFDO0FBd0N4QixNQUFhLEtBQUs7SUFDZCxZQUFZLEtBQUssR0FBRyxFQUFFO1FBQ2xCLE1BQU0sU0FBUyxHQUFHLElBQUksa0JBQVMsQ0FBQztZQUM1QixJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxDQUFDO1lBQ1IsR0FBRyxFQUFFLENBQUM7WUFDTixNQUFNLEVBQUUsQ0FBQztZQUNULE9BQU8sRUFBRSxDQUFDO1lBQ1YsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixVQUFVLEVBQUUsSUFBSSxjQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ3JDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUVsQyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFbkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxrQkFBUyxpQkFDdkIsS0FBSyxFQUFFLEdBQUcsRUFDVixPQUFPLEVBQUUsSUFBSSxFQUNiLE9BQU8sRUFBRSxJQUFJLEVBQ2IsVUFBVSxFQUFFLE9BQU8sRUFDbkIsT0FBTyxFQUFFLEVBQUUsRUFDWCxZQUFZLEVBQUUsRUFBRSxJQUNiLEtBQUssRUFDVixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV2QixNQUFNLFlBQVksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRTtZQUMvQixNQUFNLEdBQUcsR0FBRyxJQUFJLGVBQU0sQ0FBQztnQkFDbkIsSUFBSTtnQkFDSixHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTTtnQkFDaEQsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVE7Z0JBQzFDLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSxNQUFNO2FBQ2hCLENBQUMsQ0FBQztZQUVILE1BQU0sS0FBSyxHQUFHLElBQUksa0JBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFFLEVBQUU7Z0JBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQTtRQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQzNDLFlBQVksRUFBRSxLQUFLO1lBQ25CLEtBQUssRUFBRSxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7U0FDL0MsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDM0MsWUFBWSxFQUFFLEtBQUs7WUFDbkIsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztTQUMvQyxDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbkMsWUFBWSxFQUFFLEtBQUs7WUFDbkIsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNyQyxDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDaEMsWUFBWSxFQUFFLEtBQUs7WUFDbkIsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUU7Z0JBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEIsb0JBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlCLElBQUEsdUJBQVcsRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7U0FDSixDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEMsWUFBWSxFQUFFLEtBQUs7WUFDbkIsS0FBSyxFQUFFLEdBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7U0FDbEMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBdEVELHNCQXNFQyJ9