import { UPDATE_ITEMS } from "../actions/actionTypes";

export default (state = [], { type, payload }) => {
  switch (type) {
    case UPDATE_ITEMS: {
      return payload;
    }
    default: {
      return state;
    }
  }
};
