import { combineReducers } from "redux";
import { queryReducers, searchReducers } from "./searchReducers";
import { playReducers } from "./playReducers";

export default combineReducers({
  query: queryReducers,
  songs: searchReducers,
  play: playReducers
});
