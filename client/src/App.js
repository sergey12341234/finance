import './styles/App.scss';
import { Provider } from 'react-redux';
import { store } from './store/store'
import { CTickerList } from './components/tickerList/TickersList';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Header } from './components/header/Header';
import { FollowList } from './components/followList/FollowList';
import { CChart } from './components/chart/Chart';


const history = createHistory()

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className='App'>
          <Header />
          <div className='layout'>
            <div className='ticker-list'>
              <Switch>
                <Route path='/' exact component={CTickerList}/>
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
