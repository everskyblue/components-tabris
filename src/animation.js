export function animateShow(element, delay, duration) {
    return element.animate({
        opacity: 1
    }, {
        delay: 0,
        duration,
        easing: 'ease-in'
    });
}

export function animateHidden(element, delay, duration) {
    return element.animate({
        opacity: 0
    }, {
        delay,
        duration,
        easing: 'ease-in-out'
    });
}

export function animate(element, delay, duration) {
    return Promise.all([
        animateShow(element, delay, duration),
        animateHidden(element, delay, duration)
    ])
}