import { combineReducers } from "redux";
import { playingNow, player, playerStatus, isMuted, volume } from "./player";
import keyword from "./keyword";
import items from "./items";
import pagination from "./pagination";
import message from "./message";

export default combineReducers({
  keyword,
  items,
  pagination,
  playingNow,
  player,
  playerStatus,
  isMuted,
  volume,
  message
});
