import React from 'react';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { actionRemoveTickerFromChart, actionUpdateTickers } from '../../store/store';
import { CTicketListItem } from './TicketListItem';
import { CChart } from '../chart/Chart';
import { Button } from '@mui/material';
const socket = io("http://localhost:4000")
socket.emit('start')

const TickersList = ({tickers, updateTicker, followListAdd, followListRemove, mode = 'finance-board', followList, removeActiveTicker }) => {
    useEffect(() => {
        socket.on('ticker', payload => {
            updateTicker({ payload })
        })
    },[])



    if (mode === 'finance-board') {
        return (
            <div className='ticker-wrapper'>
                <div className='ticker-board'>
                    <h2>Finance Board</h2>
                    <ul>
                        {
                            tickers.map(item => <CTicketListItem key={item.ticker} ticker={item} />)
                        }
                    </ul>
                    <Button
                    variant='contained'
                    color='error'
                    onClick={() => removeActiveTicker()}>Delete active ticker</Button>
                </div>
                <div className='ticker-chart'>
                    <CChart />
                </div>
            </div>
        );
    }
    if (mode === 'follow-board') {
        console.log(followList);
        return (
            <div className='ticker-wrapper follow'>
                <div className='ticker-board'>
                    <h2>Follow Board</h2>
                    <ul>
                        {
                            followList.length ? tickers.filter(item => followList.includes(item.ticker)).map(item => <CTicketListItem key={item.ticker} ticker={item} />) : 'nothing in follows'
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export const CTickerList = connect(state => ({ tickers: state?.tickers?.UpdateStickers?.payload || [], followList: state?.follows?.followList || []}),
    { updateTicker: actionUpdateTickers, removeActiveTicker: actionRemoveTickerFromChart })(TickersList);