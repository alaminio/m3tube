import { CHANGE_PAGINATION } from "./actionTypes";

const paginate = pagination => ({
  type: CHANGE_PAGINATION,
  payload: pagination
});

export default paginate;
