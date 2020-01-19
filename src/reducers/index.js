import { combineReducers } from "redux";
import { queryReducers, searchReducers } from "./searchReducers";
import { playReducers } from "./playReducers";
import paginationReducers from "./paginationReducers";

export default combineReducers({
  query: queryReducers,
  songs: searchReducers,
  play: playReducers,
  pagination: paginationReducers
});
