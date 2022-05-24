import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionRemoveTickerFromChart } from '../../store/actions';
import { TickerListItem } from './TicketListItem';
import { Chart } from '../chart/Chart';
import { Button } from '@mui/material';
import MySelect from '../UI/MySelect';
import { socket } from '../../socket/socket';


export const TickersList = ({ mode = 'finance-board' }) => {
    const dispatch = useDispatch();
    const tickers = useSelector(state => state?.tickers?.UpdateStickers?.payload || []);
    const followList = useSelector(state => state?.follows?.followList || []);
    const changeInterval = (value) => {
        socket.emit('changeInterval', value);
    };

    function removeActiveTicker () {
        dispatch(actionRemoveTickerFromChart());
    }

    if (mode === 'finance-board') {
        return (
            <div className='ticker-wrapper'>
                <div className='ticker-board'>
                    <h2>Finance Board</h2>
                    <ul>
                        {
                            tickers.map(item => <TickerListItem key={item.ticker} ticker={item} />)
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
                    <Chart />
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
                            followList.length ? tickers.map(item => followList.includes(item.ticker) ? <TickerListItem key={item.ticker} ticker={item}/> : null) : 'nothing in follows'
                        }
                    </ul>
                </div>
            </div>
        );
    } else {
        return null;
    }
};