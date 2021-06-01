import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootSaga from "./rootSaga";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const middlewares = [thunk, sagaMiddleware, logger];
export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
