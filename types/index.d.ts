import type {
    Page as PageTabris,
    NavigationView as Navigation,
    Composite,
    EventObject,
    ImageView,
    Listeners,
    Listener,
    Widget,
    Button
} from "tabris";


declare module "components-tabris" {

    type FunctionEvent = (fn: (event: object) => void) => void

    type Attributes<T> = {
        [K in keyof T]: T[K]
    }

    type EventPropertyChanged<T> = {
        [P in keyof T as `on${Capitalize<string & P>}Changed`]: FunctionEvent
    }

    export namespace contracts {
        export interface Page {
            $visible: boolean;
        }

        export interface NavigationView {
            $controlDrawer: boolean
        }

        export interface DrawerMenuItem {
            title: string
            image: string | ImageView
            key: string
            $indexes: this[]
            $event: Listener
        }

        export interface NavigationDrawer {
            actionItemSelect: string
        }

        type OptionMode = 'compact' | 'modal' | 'page' | 'action' | 'none';

        export interface ContainerItemPreference {
            key: string
            value: any
            title: string
            summary: string
            compact: boolean
            mode: OptionMode
            colorTitle: string
            fontTitle: string
            colorSummary: string
            fontSummary: string
            background: any
            space: number
            renderView: object
        }

        type OptionModeList = 'modal' | 'page';
        type TArrayObjectList = {
            text: string
            valueStore: string
        } | string

        export interface ListPreference {
            arrayObjectList: TArrayObjectList[]
            mode: OptionModeList
        }

        export interface Checked {
            checked: boolean
        }
    }

    type PagePropertiesEvent = contracts.Page & EventPropertyChanged<contracts.Page>
    type NavigationViewPropertiesEvents = contracts.NavigationView & EventPropertyChanged<contracts.NavigationView>
    type MenuItemPropertiesEvent = contracts.DrawerMenuItem & EventPropertyChanged<contracts.DrawerMenuItem>
    type NavigationDrawerPropertiesEvent = contracts.NavigationDrawer & EventPropertyChanged<contracts.NavigationDrawer>
    type ContainerItemPreferencePropertiesEvent = contracts.ContainerItemPreference & EventPropertyChanged<contracts.ContainerItemPreference>
    type CheckedPropertiesEvent = contracts.Checked & EventPropertyChanged<contracts.Checked>
    type ListPreferencePropertiesEvent = contracts.ListPreference & EventPropertyChanged<contracts.ListPreference>

    export class Page extends PageTabris implements PagePropertiesEvent {
        /**
         * si la pagina esta visible o no
         */
        $visible: boolean;

        /**
         * 
         * @param fn 
         */
        on$visibleChanged(fn: (event: object) => void): void;

        /**
         * cuando la pagina deja de ser visible se ejecuta la accion guardando
         * todas las acciones del menu de navegacion
         * @param fn 
         */
        private on$actionStore(fn: (event: object) => void): void;

        /**
         * nombre de la clase
         */
        toString(): string
    }

    export interface EventActionItemSelected<Target> extends EventObject<Target> {
        new(props: Attributes<object>)
        toString(): string
    }

    export class DrawerMenuItem extends Composite implements MenuItemPropertiesEvent {
        set onItemSelected(fn: (event: EventActionItemSelected<DrawerMenuItem>) => void | null)
        get onItemSelected(): Listener<{ target: DrawerMenuItem }>
        
        /**
         * el texto mostrar en el menu del drawer
         */
        title: string;

        /**
         * la imagem a mostrar en el menu del drawer
         */
        image: string | ImageView;

        /**
         * 
         */
        key: string;

        /**
         * una propiedad que se guarda en cache una sola vez
         * añade la todos DrawerMenuItem que se han añadido al drawer
         */
        $indexes: this[];

        /**
         * evento a escuchar
         */
        $event: Listener<{}>;
        
        /**
         * 
         * @param attrs 
         */
        constructor(attrs: Attributes<object>)

        /**
         * metodo privado de utilidad para comprobar obtener un TextView o ImageView
         * @param key 
         * @param View 
         * @param attrs 
         */
        private _throwParamOrGet(key: string, View: Composite, attrs: Attributes<object>): typeof View | never;
        
        toString(): string
    
        /**
         * 
         * @param callback 
         */
        onTitleChanged(callback: FunctionEvent): any

        /**
         * 
         * @param callback 
         */
        onImageChanged(callback: FunctionEvent): any

        /**
         * 
         * @param callback 
         */
        onKeyChanged(callback: FunctionEvent): any

        /**
         * manejar cambios internos
         * @param callback 
         */
        on$indexesChanged(callback: FunctionEvent): any

        /**
         * manejar cambios internos
         * @param callback 
         */
        on$eventChanged(callback: FunctionEvent): any
    }

    export class NavigationView extends Navigation implements NavigationViewPropertiesEvents {
        /**
         * 
         * @param attrs 
         */
        constructor(attrs: Attributes<object>)

        /**
         * controlar el deslizamiento del drawer
         */
        $controlDrawer: boolean;

        toString(): string

        /**
         * 
         * @param callback 
         */
        on$controlDrawerChanged(callback: FunctionEvent): any
    }

    export class NavigationDrawer extends Composite implements NavigationDrawerPropertiesEvent {
        
        actionItemSelect: string;

        /**
         * 
         * @param attrs 
         */
        constructor(attrs: Attributes<object>)

        /**
         * 
         * @param attrs 
         */
        static Group(attrs: { text: string, children: Widget[] }): Widget[]

        /**
         * 
         * @param attrs 
         */
        static MenuItem(attrs: Attributes<object>): DrawerMenuItem;

        /**
         * 
         * @param callback 
         */
        onItemSelected(callback: Listener): any

        /**
         * 
         * @param callback 
         */
        onActionItemSelectChanged(callback: FunctionEvent): any

        
        toString(): string
    }

    export class ContainerItemPreference extends Composite implements ContainerItemPreferencePropertiesEvent {
        constructor(attrs: Attributes<object>)
        key: string;
        value: any;
        title: string;
        summary: string;
        compact: boolean;
        mode: contracts.OptionMode;
        colorTitle: string;
        fontTitle: string;
        colorSummary: string;
        fontSummary: string;
        space: number;
        renderView: object;
        
        onKeyChanged(callback: FunctionEvent): ContainerItemPreference
        onValueChanged(callback: FunctionEvent): ContainerItemPreference
        onTitleChanged(callback: FunctionEvent): ContainerItemPreference
        onSummaryChanged(callback: FunctionEvent): ContainerItemPreference
        onCompactChanged(callback: FunctionEvent): ContainerItemPreference
        onModeChanged(callback: FunctionEvent): ContainerItemPreference
        onColorTitleChanged(callback: FunctionEvent): ContainerItemPreference
        onFontTitleChanged(callback: FunctionEvent): ContainerItemPreference
        onColorSummaryChanged(callback: FunctionEvent): ContainerItemPreference
        onFontSummaryChanged(callback: FunctionEvent): ContainerItemPreference
        onSpaceChanged(callback: FunctionEvent): ContainerItemPreference
        onRenderViewChanged(callback: FunctionEvent): ContainerItemPreference
    }

    export class ScreenPreference extends ContainerItemPreference {}
    export class TextPreference extends ContainerItemPreference {}
    export class ListPreference extends ContainerItemPreference implements ListPreferencePropertiesEvent {
        arrayObjectList: contracts.TArrayObjectList[];
        mode: contracts.OptionModeList
        onArrayObjectListChanged(): ListPreference
    }

    export class Checked extends ContainerItemPreference implements CheckedPropertiesEvent {
        checked: boolean;
        onCheckedChanged(fn: FunctionEvent): Checked
    }

    export class SwitchPreference extends ContainerItemPreference {}
    export class CheckBoxPreference extends Checked {}
    export default class CategoryPreference extends ContainerItemPreference { }

    interface EventModal<Target> extends EventObject<Target> {}

    export class Toast {

        /**
         * time 3000
         */
        static LONG: number;
        /**
         * time 2000
         */
        static MEDIUM: number;
        /**
         * time1 000
         */
        static SHORT: number;
    
        /**
         * 
         * @param message 
         */
        constructor(message: string)

        /**
         * 
         * @param time tiempo de duracion del toast
         */
        show(time: number): Promise<void>
    }

    export class Modal {
        constructor(attrs: Attributes<object>)
        show(): void
        remove(): void

        /**
         * 
         * @param view 
         */
        addView(view: Widget): void

        /**
         * 
         * @param text text button
         */
        setButtonCancel(text: string): Listeners<{target: Button}>

        /**
         * 
         * @param text text button
         */
        setButtonAccept(text: string): Listeners<{target: Button}>
    }
}
