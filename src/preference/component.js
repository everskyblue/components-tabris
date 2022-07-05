import * as component from '../index'

const resolve = (props) => {
    const childs = props.children;
    delete props.children;
    return [props, childs];
}

export function PreferenceScreen(props) {
    return new component.PreferenceScreen(...resolve(props));
}

export function CheckBoxPreference(props) {
    return new component.CheckBoxPreference(...resolve(props));
}

export function SwitchPreference(props) {
    return new component.SwitchPreference(...resolve(props));
}

export function ListPreference(props) {
    return new component.ListPreference(...resolve(props));
}

export function TextPreference(props) {
    return new component.TextPreference(...resolve(props));
}

export function PreferenceCategory(props) {
    return new component.PreferenceCategory(...resolve(props));
}