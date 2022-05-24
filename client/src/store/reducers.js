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