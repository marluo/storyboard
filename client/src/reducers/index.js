import { combineReducers } from "redux";
import roomReducers from "./roomReducers";
import userReducers from "./userReducers";

export default combineReducers({
  rooms: roomReducers,
  user: userReducers
});
