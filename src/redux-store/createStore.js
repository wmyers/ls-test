import React from 'react';  
import {createStore as initialCreateStore, applyMiddleware, compose} from 'redux';
import {persistState} from 'redux-devtools';
import DevTools from '../dev/DevTools';
import reducer from './modules/reducer';
import createServiceMiddleware from './middleware/serviceMiddleware';

export default function createStore(service, data) {
  const middleware = [createServiceMiddleware(service)];

  let enhancer;
  if (__DEV__) {  
    enhancer = compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }
  return initialCreateStore(reducer, data, enhancer);
}

