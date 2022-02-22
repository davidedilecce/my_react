import types from './types';

export const getWeather = () => ({
  type: types.GET_WEATHER,
})

export const setCurrent = e => ({
  type: types.HANDLE_CLICK,
  payload: e.key
})

export default getWeather;