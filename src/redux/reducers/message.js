import { SHOW_MESSAGE, HIDE_MESSAGE } from "../actions/actionTypes";
import { INITIAL_NOTIFICATION_MESSAGE } from "../../config/settings";

export default (state = INITIAL_NOTIFICATION_MESSAGE, { type, payload }) => {
  switch (type) {
    case SHOW_MESSAGE: {
      return payload;
    }
    case HIDE_MESSAGE: {
      return payload;
    }
    default: {
      return state;
    }
  }
};
