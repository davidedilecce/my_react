import React, { useEffect } from 'react';
import { Row, Col, Divider, Card, Input, Spin, Alert, Space, message } from 'antd';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux';
import { setSearch, setVisible, setMap, getCurrentPositionForecast, loadingForecast, setChange } from '../actions';
import { Content } from 'antd/lib/layout/layout';
import capitalize from '../util/util.js'
import '../index.css'

const { Search } = Input;

const CityWeather = () => {
    const dispatch = useDispatch();

    const onSearch = value => {
        if (value === state.citySearched) {
            message.error('La città inserita è la stessa di quella già visualizzata')
        } else {
            dispatch(setSearch(value))
            dispatch(setVisible())
        }

    }

    const onChange = e => {
        dispatch(setChange(e.target.value))
    }

    const map = map => {
        map.setView(state.coord, 8)
        dispatch(setMap(map))
    }

    useEffect(() => {
        dispatch(loadingForecast())
        navigator.geolocation.getCurrentPosition(position => { dispatch(getCurrentPositionForecast(position.coords)) })
    }, [])


    const state = useSelector(state => state.cityWeatherReducer)

    return (
        <>
            <Content style={{ padding: '0', marginTop: 64 }} className="content" >
                <Row gutter={[0, 24]}>
                    <Col span={9} md={{ span: 8 }}>

                    </Col>
                    <Col span={6} md={{ span: 8 }}>
                        <div>
                            <Search size="large" placeholder="Inserisci Città" value={state.searchedValue} onSearch={onSearch} onChange={onChange} disabled={state.loadingForecast} style={{ width: "100%" }} />
                        </div>
                    </Col>
                    <Col span={9} md={{ span: 8 }}>
                    </Col>
                </Row>

                {state.loadingForecast &&
                    <div className='center'>
                        <Spin size="large" />
                    </div>
                }
                {state.error &&
                    <div className='center'>
                        <Alert
                            message="Città Insesiste"
                            description="La città che hai cercato è inseistente"
                            type="error"
                        />
                    </div>
                }
                {!state.loadingForecast && state.visible &&
                    <>
                        <Row>
                            <Col span={8} offset={8} className='text'><h1>{state.citySearched}</h1></Col>
                        </Row>
                        <Divider orientation="left">Previsioni 24h</Divider>
                        <Row>
                            <Col span={12}>
                                <Row gutter={[48, 24]}>
                                    {state.forecast.map(forecast => {
                                        return (
                                            <Col span={24} key={forecast.dt}>
                                                <Card hoverable title={forecast.time} style={{ width: "auto", margin: "auto" }}>
                                                    {forecast.weather.map((weather, index) => {
                                                        return (
                                                            <div key={"WEATHER" + index}>
                                                                <Row className='text'>
                                                                    <Col span={6}>
                                                                        <img className="imgSize" src={require("../img/" + weather.icon + ".png")} alt="not found" />
                                                                        {capitalize(weather.description)}
                                                                    </Col>
                                                                    <Col span={6}>
                                                                        <img className="imgSize" src={require("../img/temp.png")} alt="not found" />
                                                                        {Math.round(forecast.main.temp) + '°'}
                                                                    </Col>
                                                                    <Col span={6}>
                                                                        <img className="imgSize" src={require("../img/wind.png")} alt="not found" />
                                                                        {forecast.wind.speed + 'm/s'}
                                                                    </Col>
                                                                    <Col span={6}>
                                                                        <img className="imgSize" src={require("../img/humidity.png")} alt="not found" />
                                                                        {Math.round(forecast.main.humidity) + '%'}
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        )
                                                    })}
                                                </Card>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Col>
                            <Col span={10} offset={1}>
                                <MapContainer
                                    center={state.coord}
                                    zoom={state.zoom}
                                    whenCreated={map}
                                    dragging={false}
                                    doubleClickZoom={false}
                                    scrollWheelZoom={false}
                                    attributionControl={false}
                                    zoomControl={false}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                                        url='https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
                                    />
                                    <Marker position={state.coord}>
                                    </Marker>
                                </MapContainer>
                            </Col>
                        </Row >
                    </>
                }
            </Content>
        </>
    )
}

export default CityWeather