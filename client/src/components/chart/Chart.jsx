import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Chart = () => {
    const [chartData, setChartData] = useState([]); 
    const activeTicker = useSelector(state => state?.tickers?.chartTicker || '');
    const data = useSelector(state => state?.tickers[state?.tickers?.chartTicker]);
    useEffect(() => {
        if (data) {
            setChartData([...(data.map((item,index) => {
                return {name: index, [activeTicker]: item};
            }))]);
        }
    },[data]);
    if(!activeTicker) {
        return (
            <h2>Select ticker</h2>
        );
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