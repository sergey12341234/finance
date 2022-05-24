import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { followReducer, tickerReducer } from './reducers';




export const store = createStore(combineReducers({
    tickers: tickerReducer,
    follows: followReducer
}), applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));
