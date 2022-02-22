import React from 'react';
import { Table, Menu, } from 'antd';
import Column from 'antd/lib/table/Column';
import { useSelector, useDispatch } from 'react-redux';
import Layout, { Content, Header, Footer } from 'antd/lib/layout/layout';

const WeatherList = () => {
    const data = useSelector(state => state.MainReducer.data)
    return(
    <Content style={{ padding: '0 50px', marginTop: 64 }} className="content" >
        <div className='site-layout-content' >
            <Table dataSource={data}>
                <Column title='Città' dataIndex='name' key='name' />
                <Column title='Tempo' dataIndex='weather' key='weather' />
                <Column title='Temperatura' dataIndex='temperatura' key='temperatura' />
                <Column title='Velocità vento' dataIndex='vento' key='vento' />
            </Table>
        </div>
    </Content>
    )
}

export default WeatherList