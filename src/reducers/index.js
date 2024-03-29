import { combineReducers } from 'redux';
import moment from 'moment';
import cityWeatherReducer from './cityWeatherReducer';
import 'moment/locale/it'
moment.locale('it')

const initialState = {
  loadingWeather: false,
  data: [],
  current: 'table',
  visible: false,
  time: '',
};


function listReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_WEATHER':
      return {
        ...state,
        loadingWeather: true
      }
    case 'WEATHER_RECEIVED':
      let newData = state.data.slice();
      let time = moment.unix(action.json.dt).format("HH:mm:ss")
      if (state.time === '' || state.time !== time) {
        newData.push({
          key: Date.now(),
          name: action.json.name,
          cod: action.json.cod,
          weather: action.json.weather.map(weather => weather.description),
          temperatura: action.json.main.temp,
          vento: action.json.wind.speed,
          time: time
        })
      }
      return {
        ...state,
        data: newData,
        loadingWeather: false,
        time: time
      }
    case 'HANDLE_CLICK':
      return {
        ...state,
        current: action.payload,
      }
    case 'SET_VISIBLE':
      return {
        ...state,
        visible: true
      }
    
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  listReducer, cityWeatherReducer
})

export default rootReducer;