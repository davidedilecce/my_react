import { combineReducers } from 'redux';
import moment from 'moment';

const initialState = {
  loading: false,
  data: [],
  current: 'table',
  time: ''
};

function MainReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_WEATHER':
      return {
        ...state,
        loading: true
      }
    case 'WEATHER_RECEIVED':
      let newData = state.data.slice();
      let time = moment.unix(action.json.dt).format("HH:mm:ss")
      if (state.time === '' || state.time != time) {
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
        loading: false,
        time: time
      }
    case 'HANDLE_CLICK':
      return {
        ...state,
        current: action.payload,
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  MainReducer
});

export default rootReducer;