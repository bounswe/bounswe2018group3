import { createStore } from "redux";
import rootReducer from "../reducers/index";
import createBrowserHistory from "history/createBrowserHistory";

const store = createStore(rootReducer);

export const history = createBrowserHistory();

export default store;
