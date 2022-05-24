export const actionUpdateTickers = data => ({ name: 'UpdateStickers', data, type: 'UPDATE_TICKER' });
export const actionUpdateTickersPrice = (name,data) => ({ name, data, type: 'UPDATE_PRICE' });
export const actionRemoveTickersPrice = (name) => ({ name, type: 'REMOVE_ITEM' });
export const actionAddTickerToFollow = (ticker) => ({ name: 'followList', type: 'ADD_TO_FOLLOW', ticker });
export const actionRemoveTickerFromFollow = (ticker) => ({ name: 'followList', type: 'REMOVE_FROM_FOLLOW', ticker });
export const actionSetTickerToChart = (data) => ({ name: 'chartTicker', type: 'SET_TICKER_TO_CHART', data });
export const actionRemoveTickerFromChart = () => ({ name: 'chartTicker', type: 'REMOVE_TICKER_FROM_CHART' });
export const actionThunkExampleSetTickerToChart = (data) => {
    return dispatch => {
        dispatch(actionSetTickerToChart(data));
    };
};