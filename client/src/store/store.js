import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const actionUpdateTickers = data => ({ name: 'UpdateStickers', data, type: 'UPDATE_TICKER' });
export const actionUpdateTickersPrice = (name,data) => ({ name, data, type: 'UPDATE_PRICE' });
export const actionRemoveTickersPrice = (name) => ({ name, type: 'REMOVE_ITEM' });
export const actionAddTickerToFollow = (ticker) => ({ name: 'followList', type: 'ADD_TO_FOLLOW', ticker });
export const actionRemoveTickerFromFollow = (ticker) => ({ name: 'followList', type: 'REMOVE_FROM_FOLLOW', ticker });
export const actionSetTickerToChart = (data) => ({ name: 'chartTicker', type: 'SET_TICKER_TO_CHART', data });
export const actionRemoveTickerFromChart = () => ({ name: 'chartTicker', type: 'REMOVE_TICKER_FROM_CHART' });

export const tickerReducer = (state = {}, { type, name, data, }) => {
    if (type === 'UPDATE_TICKER') {
        return {
            ...state,
            [name]: data
        };
    }
    if(type === 'UPDATE_PRICE') {
        return {
            ...state,
            [name]: state[name] ? [...state[name], data] : [data]
        };
    }
    if(type === 'REMOVE_ITEM') {
        return {
            ...state,
            [name]: state[name].slice(1)
        };
    }
    if(type === 'SET_TICKER_TO_CHART') {
        return {
            ...state,
            [name]: data
        };
    }
    if(type === 'REMOVE_TICKER_FROM_CHART') {
        delete state.chartTicker;
        return {
            ...state
        };
    }

    return state;
};

export const followReducer =  (state = {}, { type, name, ticker}) => {
    if(type === 'ADD_TO_FOLLOW') {
        return {
            ...state,
            [name]: state[name] ? [...state[name], ticker] : [ticker]
        };
    }
    if(type === 'REMOVE_FROM_FOLLOW') {
        return {
            ...state,
            [name]: state[name].filter(item => item !== ticker)
        };
    }
    return state || {};
};

export const store = createStore(combineReducers({
    tickers: tickerReducer,
    follows: followReducer
}), applyMiddleware(thunk));
// store.subscribe(() => console.log(store.getState()));
