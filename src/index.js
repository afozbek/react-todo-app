import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./main.scss";

import { store, persistedStore } from "./store/configureStore";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
