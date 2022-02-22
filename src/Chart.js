import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import './index.css'


const Chart = () => {

    const data = useSelector(state => state.MainReducer.data)

    return (
        <ResponsiveContainer width="99,9%" aspect={2.30} >
            <LineChart width={1200} height={1200} data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperatura" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="vento" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Chart