import './styles/App.scss';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { TickersList } from './components/tickerList/TickersList';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Header } from './components/header/Header';
import { FollowList } from './components/followList/FollowList';


const history = createHistory();

function App() {
    return (
        <Router history={history}>
            <Provider store={store}>
                <div className='App'>
                    <Header />
                    <div className='layout'>
                        <div className='ticker-list'>
                            <Switch>
                                <Route path='/' exact component={TickersList}/>
                                <Route path='/follows' exact component={FollowList}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Provider>
        </Router>
    );
}

export default App;
