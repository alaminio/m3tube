import { UPDATE_SEARCH_QUERY } from "./actionTypes";
import paginate from "./paginations";
import { updateItems } from "./items";
import youtube from "../../config/youtube";
import { hideNotification, showNotification } from "../actions/notifications";

export const updateSearchQuery = keyword => {
  return {
    type: UPDATE_SEARCH_QUERY,
    payload: keyword
  };
};

const extractErrorMessage = error => {
  const data = error && error.response && error.response.data;
  if (data && data.error && data.error.message) return data.error.message;
  if (typeof data === "string") return data;
  if (error && error.message) return error.message;
  return "Something went wrong";
};

export const searchYoutube = (keyword, pageToken = null) => {
  return dispatch => {
    const searchParams = { params: { q: keyword } };
    if (pageToken) {
      searchParams.params.pageToken = pageToken;
    }
    youtube
      .get("/search", searchParams)
      .then(response => {
        dispatch(updateItems(response.data.items));
        dispatch(
          paginate({
            prevPageToken: response.data.prevPageToken || null,
            nextPageToken: response.data.nextPageToken || null
          })
        );
        dispatch(hideNotification());
      })
      .catch(error => {
        dispatch(
          showNotification({
            type: "danger",
            message: extractErrorMessage(error)
          })
        );
      });
  };
};
