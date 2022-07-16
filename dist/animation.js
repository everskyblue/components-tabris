"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animate = exports.animateHidden = exports.animateShow = void 0;
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
function animate(element, delay, duration) {
    return Promise.all([
        animateShow(element, delay, duration),
        animateHidden(element, delay, duration)
    ]);
}
exports.animate = animate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FuaW1hdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRO0lBQ2hELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNuQixPQUFPLEVBQUUsQ0FBQztLQUNiLEVBQUU7UUFDQyxLQUFLLEVBQUUsQ0FBQztRQUNSLFFBQVE7UUFDUixNQUFNLEVBQUUsU0FBUztLQUNwQixDQUFDLENBQUM7QUFDUCxDQUFDO0FBUkQsa0NBUUM7QUFFRCxTQUFnQixhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRO0lBQ2xELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNuQixPQUFPLEVBQUUsQ0FBQztLQUNiLEVBQUU7UUFDQyxLQUFLO1FBQ0wsUUFBUTtRQUNSLE1BQU0sRUFBRSxhQUFhO0tBQ3hCLENBQUMsQ0FBQztBQUNQLENBQUM7QUFSRCxzQ0FRQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVE7SUFDNUMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ2YsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO1FBQ3JDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQztLQUMxQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBTEQsMEJBS0MifQ==