import { SEARCH_SONG, UPDATE_QUERY } from "../config/constants";
import youtube from "../config/youtube";

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

export const searchYoutube = query => {
  return dispatch => {
    youtube.get("/search", { params: { q: query } }).then(response => {
      dispatch(fetchSongs(response.data.items));
    });
  };
};
