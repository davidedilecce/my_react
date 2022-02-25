import moment from 'moment';
import 'moment/locale/it'
import capitalize from '../util/util';
moment.locale('it')

const initialState = {
    forecast: [],
    zoom: 7,
    map: null,
    coord: { lat: 0, lon: 0 },
    citySearched: '',
    loadingForecast: false,
};

export default function cityWeatherReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MAP':
            return {
                ...state,
                map: action.payload
            }
        case 'SET_SEARCH':
            return {
                ...state,
                citySearched: action.payload,
                loadingForecast: true,
                error: false
            }
        case 'FORECAST_RECEIVED':
            action.json.list.map(list => {
                list.time = capitalize(moment.unix(list.dt).format("dddd HH:mm"))
            })
            return {
                ...state,
                forecast: action.json.list,
                coord: action.json.city.coord,
                loadingForecast: false,
                visible: true,
                citySearched: action.json.city.name
            }
        case 'FORECAST_ERROR':
            return {
                ...state,
                error: true,
                visible: false,
                loadingForecast: false,
            }
        case 'LOADING_FORECAST':
            return{
                ...state,
                loadingForecast: true
            }
        case 'SET_CHANGE':
            return{
                ...state,
                searchedValue: action.payload
            }
        case 'GET_CURRENT_POSITION_FORECAST':
            return{
                ...state,
                searchedValue: 'Posizione corrente'
            }
        default:
            return state;
    }
}