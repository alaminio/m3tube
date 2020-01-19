import { SHOW_ERROR } from "../config/constants";

export const showError = (state = null, action) => {
  switch (action.type) {
    case SHOW_ERROR: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
