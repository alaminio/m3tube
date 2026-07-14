import { UPDATE_SEARCH_QUERY } from "../actions/actionTypes";

const keyword = (state = "", { type, payload }) => {
  switch (type) {
    case UPDATE_SEARCH_QUERY: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default keyword;
