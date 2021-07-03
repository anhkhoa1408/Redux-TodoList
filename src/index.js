import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//////////////////////////
//Config for redux
import myReducer from "./reducers/index";
import { createStore } from "redux";
import { Provider } from "react-redux";
const store = createStore(myReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
