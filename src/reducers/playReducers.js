import { PLAY_SONG } from "../config/constants";

export const playReducers = (state = false, { type, payload }) => {
  switch (type) {
    case PLAY_SONG: {
      return payload;
    }
    default: {
      return state;
    }
  }
};
