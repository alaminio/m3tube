import { UPDATE_ITEMS } from "./actionTypes";

export const updateItems = items => {
  return {
    type: UPDATE_ITEMS,
    payload: items
  };
};
