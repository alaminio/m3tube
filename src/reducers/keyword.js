import { UPDATE_SEARCH_QUERY } from "../actions/actionTypes";

export default (state = "", { type, payload }) => {
  switch (type) {
    case UPDATE_SEARCH_QUERY: {
      return payload;
    }
    default: {
      return state;
    }
  }
};
