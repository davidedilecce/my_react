import { all, call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

export function* fetchWeather(){
  const json = yield fetch('https://api.openweathermap.org/data/2.5/weather?q=Matera&units=metric&appid=ba3801334c7ca3c0fa141099878a3c50&lang=it')
  .then(response => response.json())
  yield put({type: 'WEATHER_RECEIVED', json: json})
}

export function* watchFetchWeather() {
  yield takeLatest('GET_WEATHER', fetchWeather)
}

export default function* rootSaga() {
  yield all([
    call(watchFetchWeather),
  ])
}