import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { history } from "./redux/store/index";

import App from './App';


ReactDOM.render(
    //<Provider store={store}>
        <BrowserRouter history={history}>
            <App />
        </BrowserRouter>,
    //</Provider>,
    document.getElementById("root")
);


