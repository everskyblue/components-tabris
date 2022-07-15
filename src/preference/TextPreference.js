//import {NavigationView} from 'tabris'
import ContainerItemPreference from './ContainerItemPreference'

export default class TextPreference extends ContainerItemPreference {
    constructor(attrs) {
        super({...attrs, mode: ('renderView' in attrs ? 'action' : 'none')})
    }
}
