import React from 'react';
import { CTickerList } from './components/tickerList/TickersList';
import { CTickerListItem } from './components/tickerList/TicketListItem';
import { render, screen } from '@testing-library/react';
import App from './App';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { tickerReducer, followReducer } from './store/store';
describe('App', () => {
    it('render App component', () => {
        render(<App />);
        // screen.debug();
        expect(screen.getByText(/main/i)).toBeInTheDocument();
    });
});

const renderWithRedux = (component, { initialState, store = createStore(combineReducers({ tickers: tickerReducer, follows: followReducer }),initialState) } = {} ) => {
    return {
        ...render(<Provider store={store}>{ component }</Provider>),
        store
    };
};

describe('TickersList', () => {

    //need to comment line 37 in TickersList.jsx
    it('render with finance mode', () => {
        const { getByRole } = renderWithRedux(<CTickerList ticker={{ticker: 'AAPL', exchange: 'NASDAQ', price: '156.35', change: '50.33', change_percent: '0.19'}}/>, { 
            tickers: {
                UpdateStickers: {
                    payload: [
                        {ticker: 'AAPL', exchange: 'NASDAQ', price: '156.35', change: '50.33', change_percent: '0.19'},
                        {ticker: 'GOOGL', exchange: 'NASDAQ', price: '234.68', change: '70.53', change_percent: '0.04'},
                        {ticker: 'MSFT', exchange: 'NASDAQ', price: '240.04', change: '108.79', change_percent: '0.67'},
                        {ticker: 'AMZN', exchange: 'NASDAQ', price: '277.16', change: '181.27', change_percent: '0.41'},
                        {ticker: 'FB', exchange: 'NASDAQ', price: '127.90', change: '9.33', change_percent: '0.03'},
                        {ticker: 'TSLA', exchange: 'NASDAQ', price: '199.88', change: '197.62', change_percent: '0.41'}
                    ]
                }
            },
            follows: {
                followList: ['AAL', 'GOOGLE']
            }
        });
        expect(getByRole('heading')).toHaveTextContent(/finance board/i);
    });

    //need to comment line 37 in TickersList.jsx
    it('render with follow mode', () => {
        const { getByRole } = renderWithRedux(<CTickerList mode='follow-board'/>, { 
            tickers: {
                UpdateStickers: {
                    payload: [
                        {ticker: 'AAPL', exchange: 'NASDAQ', price: '156.35', change: '50.33', change_percent: '0.19'},
                        {ticker: 'GOOGL', exchange: 'NASDAQ', price: '234.68', change: '70.53', change_percent: '0.04'},
                    ]
                }
            },
            follows: {
                followList: ['AAL', 'GOOGLE']
            }
        });
        expect(getByRole('heading')).toHaveTextContent(/follow board/i);
    });
});

describe('TickerListItem', () => [

    it('render', () => {
        const { getByText } = renderWithRedux(<CTickerListItem  ticker={{ ticker: 'AAPL', exchange: 'NASDAQ', price: '156.35', change: '50.33', change_percent: '0.19'} }/>, { 
            tickers: {
                AAPL: ['216.84', '278.18', '242.37', '250.78', '250.78', '132.53'],
                AMZN: ['211.26', '202.00', '260.73', '226.03'],
                UpdateStickers: {
                    payload: [
                        {ticker: 'AAPL', exchange: 'NASDAQ', price: '156.35', change: '50.33', change_percent: '0.19'},
                        {ticker: 'GOOGL', exchange: 'NASDAQ', price: '234.68', change: '70.53', change_percent: '0.04'},
                    ]
                }
            },
            follows: {
                followList: ['AAL', 'GOOGLE']
            }
        });
        expect(getByText(/156/i)).toBeInTheDocument();
    })
]);










