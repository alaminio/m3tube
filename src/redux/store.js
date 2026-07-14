import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line global-require
  const { createLogger } = require("redux-logger");
  middlewares.push(createLogger({ collapsed: true }));
}

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);
