import { CHANGE_PAGINATION } from "./actionTypes";

export default pagination => {
  return { type: CHANGE_PAGINATION, payload: pagination };
};
