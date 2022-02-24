import React from 'react';
import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { useSelector } from 'react-redux';
import { Content } from 'antd/lib/layout/layout';

const WeatherList = () => {
    const data = useSelector(state => state.listReducer.data)
    return (
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