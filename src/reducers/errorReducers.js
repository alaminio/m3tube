import { SHOW_ERROR, HIDE_ERROR } from "../config/constants";

export const showError = (state = null, action) => {
  switch (action.type) {
    case SHOW_ERROR: {
      return action.payload;
    }
    case HIDE_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};
