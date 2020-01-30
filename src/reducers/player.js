import {
  PLAY_ITEM,
  SET_PLAYER_OBJ,
  CHANGE_PLAYER_STATUS,
  CHANGE_PLAYER_MUTE_STATUS,
  CHANGE_PLAYER_VOLUME
} from "../actions/actionTypes";

import { INIT_VOLUME } from "../config/settings";

export const playingNow = (state = null, { type, payload }) => {
  switch (type) {
    case PLAY_ITEM: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export const player = (state = null, { type, payload }) => {
  switch (type) {
    case SET_PLAYER_OBJ: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export const playerStatus = (state = -1, { type, payload }) => {
  switch (type) {
    case CHANGE_PLAYER_STATUS: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export const isMuted = (state = false, { type, payload }) => {
  switch (type) {
    case CHANGE_PLAYER_MUTE_STATUS: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export const volume = (state = INIT_VOLUME, { type, payload }) => {
  switch (type) {
    case CHANGE_PLAYER_VOLUME: {
      return payload;
    }
    default: {
      return state;
    }
  }
};
