import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <Helmet>
          <title>Hyper Camera</title>
        </Helmet>

        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
