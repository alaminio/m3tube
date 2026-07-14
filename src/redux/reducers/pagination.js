import { CHANGE_PAGINATION } from "../actions/actionTypes";

const initialState = {
  prevPageToken: null,
  nextPageToken: null
};

const pagination = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_PAGINATION: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default pagination;
