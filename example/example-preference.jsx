import {
    ScreenPreference,
    CheckBoxPreference,
    CategoryPreference,
    ListPreference,
    SwitchPreference,
    TextPreference
} from '../src/preference'

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
    return <ScreenPreference title='other'>
        <CheckBoxPreference
            title='check page'
            summary='summary page'
            key='testpagr'
        />
    </ScreenPreference>
}

export const pagePreference = ()=> (
    <ScreenPreference title='ScreenPreference'>
        <CheckBoxPreference 
            key='send-info'
            value={true}
            title='estadisticas'
            summary='enviar estadisticas al servidor'
        />
        <CategoryPreference title='mi category'>
            <CheckBoxPreference 
                key='ctg'
                value={true}
                title='test'
            onChange={console.log}
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
            onSetValue={console.log}
            />
        </CategoryPreference>
        <TextPreference 
            title='page'
            summary='render'
            renderView={getPage}
        />
    </ScreenPreference>
)