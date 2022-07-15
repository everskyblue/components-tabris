import {TextView} from 'tabris'
import ContainerItemPreference from './ContainerItemPreference'
import {padding, fontTitleGroup} from '../variant'

export default class CategoryPreference extends ContainerItemPreference {
    constructor({title, textColor}, childs = []) {
        super({
            top: 'prev() 5',
            highlightOnTouch: false,
            padding: 0
        });
        this.append(new TextView({
            text: title.toCapitalize(),
            font: fontTitleGroup,
            padding,
            textColor
        }), ...childs);
    }
}
