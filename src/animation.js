/**
 * 
 * @param {import('tabris').Widget} element 
 * @param {number} delay 
 * @param {number} duration 
 * @returns {Promise<void>}
 */
export function animateShow(element, delay, duration) {
    return element.animate({
        opacity: 1
    }, {
        delay: 0,
        duration,
        easing: 'ease-in'
    });
}
/**
 * 
 * @param {import('tabris').Widget} element 
 * @param {number} delay 
 * @param {number} duration 
 * @returns {Promise<void>}
 */
export function animateHidden(element, delay, duration) {
    return element.animate({
        opacity: 0
    }, {
        delay,
        duration,
        easing: 'ease-in-out'
    });
}
/**
 * 
 * @param {import('tabris').Widget} element 
 * @param {number} delay 
 * @param {number} duration 
 * @returns {Promise<void>}
 */
export function animate(element, delay, duration) {
    return Promise.all([
        animateShow(element, delay, duration),
        animateHidden(element, delay, duration)
    ])
}