import { CHANGE_PAGINATION } from "../config/constants";

export const changePaination = pagination => {
  return { type: CHANGE_PAGINATION, payload: pagination };
};
