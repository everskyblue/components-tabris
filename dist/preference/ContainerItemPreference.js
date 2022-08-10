"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const ScreenPreference_1 = require("./ScreenPreference");
const initializeStorage_1 = require("./initializeStorage");
const variant_1 = require("../variant");
const modal_1 = require("../modal");
const view_1 = require("../view");
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
        $(view_1.NavigationView).only().append(this.renderView());
    }
    showInPage() {
        const screen = new ScreenPreference_1.default({
            title: this.title
        }).append(new ContainerItemPreference().append(this.view));
        $(view_1.NavigationView).only().append(screen);
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
