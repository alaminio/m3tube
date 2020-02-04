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

export const searchYoutube = (keyword, pageToken = null) => {
  return dispatch => {
    let searchParams = { params: { q: keyword } };
    if (pageToken) {
      searchParams.params.pageToken = pageToken;
    }
    youtube
      .get("/search", searchParams)
      .then(response => {
        dispatch(updateItems(response.data.items));

        let pagination = {
          prevPageToken: null,
          nextPageToken: null
        };
        if (response.data.prevPageToken) {
          pagination.prevPageToken = response.data.prevPageToken;
        }
        if (response.data.nextPageToken) {
          pagination.nextPageToken = response.data.nextPageToken;
        }
        dispatch(paginate(pagination));
        dispatch(hideNotification());
      })
      .catch(error => {
        let errorMessage = {
          type: "danger",
          message: "Something went wrong"
        };
        if (error.response.data.error && error.response.data.error.message) {
          errorMessage.message = error.response.data.error.message;
        } else if (error.response.data) {
          errorMessage.message = error.response.data;
        }

        // dispatch({
        //   type: SHOW_MESSAGE,
        //   payload: errorMessage
        // });

        dispatch(showNotification(errorMessage));
      });
  };
};
