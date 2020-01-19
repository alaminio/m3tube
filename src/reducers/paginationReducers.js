import { CHANGE_PAGINATION } from "../config/constants";

const initialState = {
  prevPageToken: null,
  nextPageToken: null
};

const paginationReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_PAGINATION: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default paginationReducers;
