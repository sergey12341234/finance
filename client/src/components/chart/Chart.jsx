import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Chart = ({ activeTicker, data }) => {
    const [chartData, setChartData] = useState([]); 
    useEffect(() => {
        if (data) {
            let i = 0
            setChartData([...(data.map(item => {
                i++
                return {name: i, [activeTicker]: item}
            }))])
        }
    },[data, activeTicker])
    if(!activeTicker) {
        return (
            <h2>Select ticker</h2>
        )
    } else {
        return (
            <div className='chat-wrapper'>
                <h2>{activeTicker}</h2>
                <LineChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey={activeTicker}
                        stroke="#82ca9d"
                        activeDot={{ r: 10 }}
                    />
                </LineChart>
            </div>
        );
    }
};

export {Chart};
export const CChart = connect(state => ({activeTicker: state?.tickers?.chartTicker || '', data: state?.tickers[state?.tickers?.chartTicker] || []}))(Chart);





