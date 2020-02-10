import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { LOCALSTORAGE_TODO_STATE } from "./actions/types"
import rootReducer from "./reducers";

// DO WHAT CONFIG YOU WANT
const persistConfig = {
  key: LOCALSTORAGE_TODO_STATE,
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["todos"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistedStore = persistStore(store);

export {
  store,
  persistedStore
};