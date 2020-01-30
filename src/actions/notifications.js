import { HIDE_MESSAGE, SHOW_MESSAGE } from "./actionTypes";

export const showNotification = notification => {
  return {
    type: SHOW_MESSAGE,
    payload: notification
  };
};

export const hideNotification = () => {
  return {
    type: HIDE_MESSAGE,
    payload: {
      type: null,
      message: null
    }
  };
};
