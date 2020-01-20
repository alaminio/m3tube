import {
  SEARCH_SONG,
  UPDATE_QUERY,
  SHOW_ERROR,
  HIDE_ERROR
} from "../config/constants";
import youtube from "../config/youtube";
import { changePaination } from "./paginationActions";

export const updateQuery = query => {
  return {
    type: UPDATE_QUERY,
    payload: query
  };
};

const fetchSongs = songs => {
  return {
    type: SEARCH_SONG,
    payload: songs
  };
};

export const searchYoutube = (query, pageToken = null) => {
  return dispatch => {
    let searchParams = { params: { q: query } };
    if (pageToken) {
      searchParams.params.pageToken = pageToken;
    }
    youtube
      .get("/search", searchParams)
      .then(response => {
        dispatch(fetchSongs(response.data.items));

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
        dispatch(changePaination(pagination));
        dispatch({ type: HIDE_ERROR });
      })
      .catch(error => {
        let errorMessage = "Something went wrong";
        if (error.response.data.error && error.response.data.error.message) {
          errorMessage = error.response.data.error.message;
        } else if (error.response.data) {
          errorMessage = error.response.data;
        }
        dispatch({
          type: SHOW_ERROR,
          payload: errorMessage
        });
      });
  };
};
