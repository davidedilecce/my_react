import types from './types';

export const getWeather = () => ({
  type: types.GET_WEATHER,
})

export const setCurrent = e => ({
  type: types.HANDLE_CLICK,
  payload: e.key
})

export const setSearch = value => ({
  type: types.SET_SEARCH,
  payload: value
})

export const setVisible = () => ({
  type: types.SET_VISIBLE
})

export const setMap = map => ({
  type: types.SET_MAP,
  payload: map
})

export const getCurrentPositionForecast = coord => ({
  type: types.GET_CURRENT_POSITION_FORECAST,
  payload: coord
})

export const loadingForecast = () => ({
  type: types.LOADING_FORECAST
})

export const setChange = value => ({
  type: types.SET_CHANGE,
  payload: value
})

export const setDaySelected = value => ({
  type: types.SET_DAY_SELECTED,
  payload: value
})

export default getWeather;