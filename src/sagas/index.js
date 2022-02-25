import { all, call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'

export function* fetchWeather() {
  const json = yield fetch('https://api.openweathermap.org/data/2.5/weather?q=Matera&units=metric&appid=ba3801334c7ca3c0fa141099878a3c50&lang=it')
    .then(response => response.json())
  yield put({ type: 'WEATHER_RECEIVED', json: json })
}

export function* fetchForecast(action) {
  const json = yield fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + action.payload + '&units=metric&appid=ba3801334c7ca3c0fa141099878a3c50&lang=it&cnt=40')
    .then(response => response.json())

  if (json.cod !== '200') {
    console.log("CIAO")
    yield put({ type: 'FORECAST_ERROR' })
  } else {
    yield put({ type: 'FORECAST_RECEIVED', json: json })
  }

}

export function* fetchCurrentPositionForecast(action) {
  const json = yield fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + action.payload.latitude + '&lon=' + action.payload.longitude + '&units=metric&appid=ba3801334c7ca3c0fa141099878a3c50&lang=it&cnt=40')
    .then(response => response.json())

  if (json.cod !== '200') {
    console.log("CIAO")
    yield put({ type: 'FORECAST_ERROR' })
  } else {
    yield put({ type: 'FORECAST_RECEIVED', json: json })
  }
}

export function* watchFetchWeather() {
  yield takeLatest('GET_WEATHER', fetchWeather)
  yield takeLatest('SET_SEARCH', fetchForecast)
  yield takeLatest('GET_CURRENT_POSITION_FORECAST', fetchCurrentPositionForecast)
}

export default function* rootSaga() {
  yield all([
    call(watchFetchWeather),
  ])
}