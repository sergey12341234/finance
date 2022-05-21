import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actionRemoveTickersPrice, actionSetTickerToChart, actionUpdateTickersPrice } from '../../store/store';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { actionAddTickerToFollow, actionRemoveTickerFromFollow } from '../../store/store';

function TicketListItem({ ticker, updatePrice, reduxState, removeFirstItem, followList, followListAdd, followListRemove, tickerToChart}) {
    const [changeCost, setChangeCost] = useState();
    const [changeCostPercent, setChangePercent] = useState();
    useEffect(() => {
        updatePrice(ticker.ticker,ticker.price)
    },[ticker, updatePrice]);

    useEffect(() => {
        if(reduxState[ticker.ticker]?.length > 1) {
            if(reduxState[ticker?.ticker].length > 10) removeFirstItem(ticker.ticker);
            setChangeCost((reduxState[ticker?.ticker][reduxState[ticker?.ticker].length - 1] - reduxState[ticker?.ticker][reduxState[ticker?.ticker].length - 2]).toFixed(2));
            setChangePercent(((changeCost * 100) / reduxState[ticker?.ticker][reduxState[ticker?.ticker].length - 2]).toFixed(2))
        }
    }, [changeCost, reduxState, removeFirstItem, ticker.ticker])
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
                    e.stopPropagation()
                    followList.includes(ticker.ticker) ? followListRemove(ticker.ticker) : followListAdd(ticker.ticker)
                }}
                className={followList.includes(ticker.ticker) ? 'active': ''}
                />
            </div>
        </li>
    )
}

export const CTicketListItem = connect(state => ({ reduxState: state?.tickers || {}, followList: state?.follows?.followList || [] }),
    { 
        updatePrice: actionUpdateTickersPrice,
        removeFirstItem: actionRemoveTickersPrice,
        followListAdd: actionAddTickerToFollow,
        followListRemove: actionRemoveTickerFromFollow,
        tickerToChart: actionSetTickerToChart,
    })(TicketListItem);