import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/reducers'

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./main.scss";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
