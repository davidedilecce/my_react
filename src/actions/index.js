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

export default getWeather;