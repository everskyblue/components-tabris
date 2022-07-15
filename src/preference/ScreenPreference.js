import {ScrollView} from 'tabris'
import Page from '../view/page'
import {getInArray} from '../helpers'
import ContainerItemPreference from './ContainerItemPreference'

export default class ScreenPreference extends Page {
    constructor(attrs, childs) {
        super(attrs);
        if (Array.isArray(childs)) this.append(childs);
    }
    
    append(...widgets) {
        const childs = getInArray(widgets);
        if (childs.every(child => !(child instanceof ContainerItemPreference))) {
            throw new Error('is not component of preference')
        }
        return super.append(new ScrollView({
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }).append(childs));
    }
}
