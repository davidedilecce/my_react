import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu as MenuAntd } from 'antd';
import { setCurrent } from '../actions';
const { Header } = Layout;




const Menu = () => {
    const dispatch = useDispatch();
    const current = useSelector(state => state.listReducer.current)

    const handleClick = e => {
        dispatch(setCurrent(e))
    }

    return (
        <Header style={{ position: 'fixed', zIndex: 10, width: '100%' }}>
            <MenuAntd onClick={handleClick} selectedKeys={current} mode="horizontal" theme='dark'>
                <MenuAntd.Item key="table" >Tabella </MenuAntd.Item>
                <MenuAntd.Item key="chart" >Grafico </MenuAntd.Item>
                <MenuAntd.Item key="city">Ricerca Città</MenuAntd.Item>
            </MenuAntd>
        </Header>
    )
}

export default Menu