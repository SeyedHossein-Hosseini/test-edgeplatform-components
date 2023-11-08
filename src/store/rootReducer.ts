// rootReducer.js
import { combineReducers } from "redux";
import counterReducer from "./Reducers/counterReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  // other reducers...
});

export default rootReducer;
