import {
    PreferenceScreen,
    CheckBoxPreference,
    PreferenceCategory,
    ListPreference,
    SwitchPreference,
    TextPreference
} from '../preference/component'
import {
    contentView,
    NavigationView,
    TextView
} from 'tabris'

function getList() {
    return [
        {
            text: 'list 1',
            key: 'l1'
        },{
            text: 'list 2',
            key: 'l2'
        },{
            text: 'list 3',
            key: 'l3'
        },
    ];
}

function getPage() {
    return <PreferenceScreen title='other'>
        <CheckBoxPreference
            title='check page'
            summary='summary page'
            key='testpagr'
        />
    </PreferenceScreen>
}

contentView.append(
    <NavigationView stretch>
        <PreferenceScreen title='PreferenceScreen'>
        <CheckBoxPreference 
            key='send-info'
            value={true}
            title='estadisticas'
            summary='enviar estadisticas al servidor'
        />
        <PreferenceCategory title='mi category'>
            <CheckBoxPreference 
                key='ctg'
                value={true}
                title='test'
                summary='categoria inde'
            />
            <ListPreference title='list tpk'
                summary='mi list chdck'
                key='listopt'
                value={1}
                arrayObjectList={getList()}
            />
            <SwitchPreference 
                key='keyswitch'
                value={true}
                title='un switch'
                summary='cambio de swotch'
            />
        </PreferenceCategory>
        <TextPreference 
            title='page'
            summary='render'
            action={getPage}
        />
        </PreferenceScreen>
    </NavigationView>
)