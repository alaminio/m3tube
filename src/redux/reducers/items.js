import { UPDATE_ITEMS } from "../actions/actionTypes";

const items = (state = [], { type, payload }) => {
  switch (type) {
    case UPDATE_ITEMS: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default items;
