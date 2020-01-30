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
