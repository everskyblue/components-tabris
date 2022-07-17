import {app} from 'tabris'

app.registerFont('Roboto Slab', __dirname+'/../assets/fonts/RobotoSlab-VariableFont_wght.ttf');

String.prototype.toCapitalize = function() {
    let nw = '';
    for (let i = 0, isNextUpper = false, str; i < this.length; i++) {
        str = this[i];
        if (i === 0 || isNextUpper) {
            nw += str.toUpperCase();
            isNextUpper = false;
        } else if (/\s/.test(str)) {
            isNextUpper = true;
            nw += str;
        } else {
            nw += str;
        }
    }
    return nw;
};
