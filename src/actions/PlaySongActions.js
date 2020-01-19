export const PLAY_SONG = "PLAY_SONG";

export const playVideo = videoId => {
  return {
    type: PLAY_SONG,
    payload: videoId
  };
};
