"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const ScreenPreference_1 = require("./ScreenPreference");
const initializeStorage_1 = require("./initializeStorage");
const variant_1 = require("../variant");
const modal_1 = require("../modal");
const adjustCompactText = {
    left: 0,
    right: '10%'
};
class ContainerItemPreference extends tabris_1.Composite {
    constructor(attrs) {
        super(Object.assign({ left: 0, right: 0, padding: variant_1.padding, top: 'prev()', highlightOnTouch: true }, attrs));
        if (!(0, initializeStorage_1.existsKeyPreference)(this.key)) {
            (0, initializeStorage_1.setPreference)(this.key, this.value);
        }
        if (this.title.length > 0) {
            this.append(new tabris_1.TextView({
                font: this.fontTitle,
                text: this.title.toCapitalize(),
            }));
        }
        if (this.summary.length > 0) {
            this.append(new tabris_1.TextView(Object.assign({ text: this.summary, font: this.fontSummary, top: ['prev()', this.space] }, adjustCompactText)));
        }
        const isCompact = this.mode === 'compact';
        this.on('change', ({ value }) => {
            this.value = value;
            if (this.key !== null) {
                (0, initializeStorage_1.setPreference)(this.key, this.value);
            }
        });
        this.onTap(({ target }) => {
            if (isCompact) {
                return (this.checked = !this.checked);
            }
            if (this.mode === 'page')
                this.showInPage(this.view);
            else if (this.mode === 'modal')
                this.showInModal();
            else if (this.mode === 'action')
                this.renderAction();
        });
    }
    renderAction() {
        if (typeof this.renderView !== 'function') {
            throw new Error('property renderView needs a function');
        }
        $(tabris_1.NavigationView).only().append(this.renderView());
    }
    showInPage() {
        const screen = new ScreenPreference_1.default({
            title: this.title
        }).append(new ContainerItemPreference().append(this.view));
        $(tabris_1.NavigationView).only().append(screen);
    }
    showInModal() {
        const modal = new modal_1.Modal();
        modal.setButtonCancel('close').addListener(() => {
            modal.remove();
        });
        modal.addView(this.view);
        modal.show();
    }
}
exports.default = ContainerItemPreference;
tabris_1.NativeObject.defineProperties(ContainerItemPreference.prototype, {
    key: { type: 'string', default: null, nullable: true },
    value: { type: 'any', default: false },
    title: { type: 'string', default: '' },
    summary: { type: 'string', default: '' },
    compact: { type: 'boolean', default: true },
    mode: { type: 'string', default: 'compact', choice: ['compact', 'modal', 'page', 'action', 'none'] },
    colorTitle: { type: 'string', default: '' },
    fontTitle: { type: 'string', default: variant_1.fontTitle },
    colorSummary: { type: 'string', default: '' },
    fontSummary: { type: 'string', default: variant_1.fontSummary },
    background: { type: 'string', default: '' },
    space: { type: 'boolean', default: 5 },
    renderView: { type: 'any', default: null },
});
tabris_1.NativeObject.defineEvent(ContainerItemPreference.prototype, 'change', false);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFpbmVySXRlbVByZWZlcmVuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJlZmVyZW5jZS9Db250YWluZXJJdGVtUHJlZmVyZW5jZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUF3RTtBQUN4RSx5REFBaUQ7QUFDakQsMkRBQXNFO0FBQ3RFLHdDQUEwRDtBQUMxRCxvQ0FBOEI7QUFFOUIsTUFBTSxpQkFBaUIsR0FBRztJQUN0QixJQUFJLEVBQUUsQ0FBQztJQUNQLEtBQUssRUFBRSxLQUFLO0NBQ2YsQ0FBQztBQUVGLE1BQXFCLHVCQUF3QixTQUFRLGtCQUFTO0lBQzFELFlBQVksS0FBSztRQUNiLEtBQUssaUJBQ0QsSUFBSSxFQUFFLENBQUMsRUFDUCxLQUFLLEVBQUUsQ0FBQyxFQUNSLE9BQU8sRUFBUCxpQkFBTyxFQUNQLEdBQUcsRUFBRSxRQUFRLEVBQ2IsZ0JBQWdCLEVBQUUsSUFBSSxJQUNuQixLQUFLLEVBQ1YsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFBLHVDQUFtQixFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQyxJQUFBLGlDQUFhLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkM7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksaUJBQVEsQ0FBQztnQkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7YUFDbEMsQ0FBQyxDQUFDLENBQUE7U0FDTjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxpQkFBUSxpQkFDcEIsSUFBSSxFQUFF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