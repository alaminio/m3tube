import { CHANGE_PAGINATION } from "../actions/actionTypes";

const initialState = {
  prevPageToken: null,
  nextPageToken: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_PAGINATION: {
      return payload;
    }
    default: {
      return state;
    }
  }
};
