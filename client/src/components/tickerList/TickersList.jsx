import React from 'react';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { actionRemoveTickerFromChart, actionUpdateTickers } from '../../store/store';
import { CTickerListItem } from './TicketListItem';
import { CChart } from '../chart/Chart';
import { Button } from '@mui/material';
import MySelect from '../UI/MySelect';
const socket = io('http://localhost:4000');
socket.emit('start');

const TickersList = ({ tickers, updateTicker, mode = 'finance-board', followList, removeActiveTicker }) => {
    const changeInterval = (value) => {
        socket.emit('changeInterval', value);
    };

    useEffect(() => {
        socket.on('ticker', payload => {
            updateTicker({ payload });
        });
    },[]);

    if (mode === 'finance-board') {
        return (
            <div className='ticker-wrapper'>
                <div className='ticker-board'>
                    <h2>Finance Board</h2>
                    <ul>
                        {
                            tickers.map(item => <CTickerListItem key={item.ticker} ticker={item} />)
                        }
                    </ul>
                    <div className='tools'>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={() => removeActiveTicker()}
                        >
                            Delete active ticker
                    </Button>
                    <MySelect changeInterval={changeInterval} className='custom-select'/>
                    </div>
                </div>
                <div className='ticker-chart'>
                    <CChart />
                </div>
            </div>
        );
    } else if (mode === 'follow-board') {
        return (
            <div className='ticker-wrapper follow'>
                <div className='ticker-board'>
                    <h2>Follow Board</h2>
                    <ul>
                        {
                            followList.length ? tickers.map(item => followList.includes(item.ticker) ? <CTickerListItem key={item.ticker} ticker={item}/> : null) : 'nothing in follows'
                        }
                    </ul>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export const CTickerList = connect(state => ({ tickers: state?.tickers?.UpdateStickers?.payload || [], followList: state?.follows?.followList || []}),
    { updateTicker: actionUpdateTickers, removeActiveTicker: actionRemoveTickerFromChart })(TickersList);