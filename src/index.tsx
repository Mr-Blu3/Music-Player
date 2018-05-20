import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import {AppMusicPlayerInit} from "./containers/App-Memory/app-musicPlayer.init";

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={AppMusicPlayerInit} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
