import { combineReducers } from 'redux';
import moment from 'moment';

const initialState = {
  loadingWeather: false,
  loadingForecast: false,
  data: [],
  current: 'table',
  time: '',
  citySearched: '',
  visible: false,
  forecast: [],
  zoom: 7,
  map: null,
  coord: {lat: 0,lon: 0}
};

function MainReducer(state = initialState, action) {
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
    case 'FORECAST_RECEIVED':
      action.json.list.map(list => {
        list.time = 3
      })
      return {
        ...state,
        forecast: action.json.list,
        coord: action.json.city.coord,
        loadingForecast: false,
        visible: true
      }
    case 'FORECAST_ERROR':
      return {
        ...state,
        error: true,
        visible: false,
        loadingForecast:false,
      }
    case 'HANDLE_CLICK':
      return {
        ...state,
        current: action.payload,
      }
    case 'SET_SEARCH':
      return {
        ...state,
        citySearched: action.payload,
        loadingForecast: true,
        error: false
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
  MainReducer
});

export default rootReducer;