export const loadVideoById = (player, id) => {
  player && id && player.loadVideoById(id);
};

export const pauseVideo = player => {
  player && player.pauseVideo();
};

export const playVideo = player => {
  player && player.playVideo();
};

export const muteVideo = player => {
  player && player.mute();
};

export const unMuteVideo = player => {
  player && player.unMute();
};

export const setVolume = (player, volume) => {
  player && volume && player.setVolume(parseInt(volume));
};

export const getCurrentTime = player => {
  return player && typeof player.getCurrentTime === "function"
    ? player.getCurrentTime()
    : 0;
};

export const getDuration = player => {
  return player && typeof player.getDuration === "function"
    ? player.getDuration()
    : 0;
};

export const seekTo = (player, seconds) => {
  player &&
    typeof player.seekTo === "function" &&
    player.seekTo(seconds, true);
};

export const formatTime = seconds => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const s = Math.floor(seconds % 60);
  const m = Math.floor(seconds / 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};
