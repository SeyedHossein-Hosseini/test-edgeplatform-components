import { legacy_createStore as createStore } from "redux";
import rootReducer from "./rootReducer"; // Assume you have a rootReducer

const store = createStore(rootReducer);

export default store;
