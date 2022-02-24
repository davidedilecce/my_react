import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout, { Content, Header, Footer } from 'antd/lib/layout/layout';
import WeatherList from './list/List'
import Menu from './menu/Menu'
import Chart from './chart/Chart'
import CityWeather from './cityWeather/CityWeather';
import 'antd/dist/antd.css'
import { getWeather } from './actions';
import './index.css'

import './App.css';

function App() {

  const dispatch = useDispatch();
  const current = useSelector(state => state.listReducer.current)

  let interval

  useEffect(() => {
    if (!interval) {
      interval = setInterval(() => { dispatch(getWeather()) }, 10000)
    }

    return () => {
      clearInterval(interval)
    }
  }, []);


  return (
    <Layout>
      <Menu />
      <div className='site-layout-content' >
        {current === 'chart' && <Chart />}
        {current === 'table' && <WeatherList />}
        {current === 'city' && <CityWeather />}
      </div>
      <Footer style={{ textAlign: 'center' }}>
        Copyright @2022
      </Footer>
    </Layout>
  );
}
 
export default App;
