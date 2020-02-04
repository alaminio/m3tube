import {
  PLAY_ITEM,
  SET_PLAYER_OBJ,
  CHANGE_PLAYER_STATUS,
  CHANGE_PLAYER_MUTE_STATUS,
  CHANGE_PLAYER_VOLUME
} from "./actionTypes";

export const playItem = id => {
  return {
    type: PLAY_ITEM,
    payload: id
  };
};

export const setPlayerObj = playerObj => {
  return {
    type: SET_PLAYER_OBJ,
    payload: playerObj
  };
};

export const changePlayerStatus = status => {
  return {
    type: CHANGE_PLAYER_STATUS,
    payload: status
  };
};

export const changePlayerMuteStatus = status => {
  return {
    type: CHANGE_PLAYER_MUTE_STATUS,
    payload: status
  };
};

export const changePlayerVolume = status => {
  return {
    type: CHANGE_PLAYER_VOLUME,
    payload: status
  };
};
