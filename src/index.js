import {version as _version} from '../package.json'

export const version = _version;

export {
    Page,
    ActionContainer,
    ActionCollection,
    NavigationView,
    NavigationDrawer
} from './view'

export {
    setPreference,
    getValuePreference,
    ListPreference,
    TextPreference,
    SwitchPreference,
    CheckBoxPreference,
    ScreenPreference,
    CategoryPreference
} from './preference'

export {
    Toast,
    Modal
} from './modal'