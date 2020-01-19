import { SEARCH_SONG, UPDATE_QUERY } from "../config/constants";

export const queryReducers = (state = "favourites", { type, payload }) => {
  switch (type) {
    case UPDATE_QUERY: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export const searchReducers = (state = [], { type, payload }) => {
  switch (type) {
    case SEARCH_SONG: {
      return payload;
    }
    default: {
      return state;
    }
  }
};
