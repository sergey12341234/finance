import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionRemoveTickersPrice, actionThunkExampleSetTickerToChart, actionUpdateTickersPrice, actionRemoveTickerFromFollow, actionAddTickerToFollow } from '../../store/actions';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const TickerListItem = ({ ticker }) => {
    const [changeCost, setChangeCost] = useState();
    const [changeCostPercent, setChangePercent] = useState();
    const reduxState = useSelector(state => state?.tickers || {});
    const followList = useSelector(state => state?.follows?.followList || []);
    const dispatch = useDispatch();
    const updatePrice = (ticker,price) => {
        dispatch(actionUpdateTickersPrice(ticker,price));
    };

    const removeFirstItem = (ticker) => {
        dispatch(actionRemoveTickersPrice(ticker));
    };

    const followListAdd = (ticker) => {
        dispatch(actionAddTickerToFollow(ticker));
    };

    const followListRemove = (ticker) => {
        dispatch(actionRemoveTickerFromFollow(ticker));
    };

    const tickerToChart = (ticker) => {
        dispatch(actionThunkExampleSetTickerToChart(ticker));
    };

    useEffect(() => {
        updatePrice(ticker.ticker,ticker.price);
    },[ticker]);

    useEffect(() => {
        if(reduxState[ticker.ticker]?.length > 1) {
            if(reduxState[ticker?.ticker].length > 10) removeFirstItem(ticker.ticker);
            setChangeCost((reduxState[ticker?.ticker][reduxState[ticker?.ticker].length - 1] - reduxState[ticker?.ticker][reduxState[ticker?.ticker].length - 2]).toFixed(2));
            setChangePercent(((changeCost * 100) / reduxState[ticker?.ticker][reduxState[ticker?.ticker].length - 2]).toFixed(2));
        }
    }, [changeCost, reduxState, removeFirstItem, ticker.ticker]);
    return (
        <li
            className={ticker.ticker === reduxState.chartTicker ? 'active' : null}
            onClick={() => tickerToChart(ticker.ticker)}
        >
            <div className='ticker-name'>
                {ticker.ticker}
            </div>
            <div className='ticker-price'>
                {ticker.price} $
            </div>
            <div className='ticker-change'>
                {changeCost ?  `${changeCost} $` : 'calc...'}
            </div>
            <div className={changeCostPercent ? +changeCostPercent > 0 ? 'ticker-percent up' : 'ticker-percent down' : 'ticker-percent'}>
                {changeCostPercent ? `${changeCostPercent} %` : 'calc...'}
            </div>
            <div className={'ticker-ToFollow'}>
                <AddCircleIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        followList.includes(ticker.ticker) ? followListRemove(ticker.ticker) : followListAdd(ticker.ticker);
                    }}
                    className={followList.includes(ticker.ticker) ? 'active': ''}
                />
            </div>
        </li>
    );
};