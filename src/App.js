import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout, { Content, Header, Footer } from 'antd/lib/layout/layout';
import WeatherList from './List'
import Menu from './Menu'
import Chart from './Chart'
import 'antd/dist/antd.css'
import { getWeather } from './actions';

import './App.css';

function App() {

  const dispatch = useDispatch();
  const current = useSelector(state => state.MainReducer.current)

  let interval

  useEffect(() => {
    if (!interval) {
      console.log("ok")
      interval = setInterval(() => { dispatch(getWeather()) }, 1000)
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
      </div>
      <Footer style={{ textAlign: 'center' }}>
        Copyright @2022
      </Footer>
    </Layout>
  );
}

export default App;
