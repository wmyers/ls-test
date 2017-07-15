import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import createStore from './redux-store/createStore';
import App from './components/app/app.module';
import DevTools from './dev/DevTools';

if (__DEV__) {
  window.React = React; // enable debugger
}

const store = createStore();
const appContainer = document.getElementById('app');
ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      <App />
      {
        __DEV__ && !window.devToolsExtension && <DevTools />
      }
    </div>
  </Provider>,
  appContainer
);