import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { history } from "./redux/store/index";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);


serviceWorker.unregister();
