import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import App from "./App";
import "./config/lang/i18n";
const root = ReactDOM.createRoot(document.getElementById("globeViz"));
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //</React.StrictMode>
);
