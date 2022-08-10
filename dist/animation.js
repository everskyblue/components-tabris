"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animate = exports.animateHidden = exports.animateShow = void 0;
/**
 *
 * @param {import('tabris').Widget} element
 * @param {number} delay
 * @param {number} duration
 * @returns {Promise<void>}
 */
function animateShow(element, delay, duration) {
    return element.animate({
        opacity: 1
    }, {
        delay: 0,
        duration,
        easing: 'ease-in'
    });
}
exports.animateShow = animateShow;
/**
 *
 * @param {import('tabris').Widget} element
 * @param {number} delay
 * @param {number} duration
 * @returns {Promise<void>}
 */
function animateHidden(element, delay, duration) {
    return element.animate({
        opacity: 0
    }, {
        delay,
        duration,
        easing: 'ease-in-out'
    });
}
exports.animateHidden = animateHidden;
/**
 *
 * @param {import('tabris').Widget} element
 * @param {number} delay
 * @param {number} duration
 * @returns {Promise<void>}
 */
function animate(element, delay, duration) {
    return Promise.all([
        animateShow(element, delay, duration),
        animateHidden(element, delay, duration)
    ]);
}
exports.animate = animate;
