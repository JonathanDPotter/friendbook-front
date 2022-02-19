import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { debounce } from "debounce";
// utils
import { saveState } from "./store/localStorage";
// redux store
import { store } from "./store";
// components
import Router from "./Router";
// styles
import "./index.scss";

// saves redux state to localStorage
store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
