import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setPlayerObj,
  changePlayerStatus,
  playItem,
  changePlayerMuteStatus,
  changePlayerVolume
} from "../../redux/actions/player";
import {
  loadVideoById,
  pauseVideo,
  playVideo,
  muteVideo,
  unMuteVideo,
  setVolume,
  getCurrentTime,
  getDuration,
  seekTo,
  formatTime,
  getVideoData,
  youtubeThumb
} from "../../helpers";
import "./player.styles.css";

class Player extends Component {
  state = {
    expanded: false,
    blurred: false,
    hidden: false,
    currentTime: 0,
    duration: 0,
    ytState: -1,
    ytTitle: "",
    ytAuthor: ""
  };

  componentDidMount = () => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = this.loadVideo;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    } else {
      this.loadVideo();
    }
    this.tick = setInterval(this.updateProgress, 500);
  };

  componentWillUnmount() {
    if (this.tick) clearInterval(this.tick);
  }

  updateProgress = () => {
    if (!this.player) return;
    const currentTime = getCurrentTime(this.player);
    const duration = getDuration(this.player);
    const ytState =
      typeof this.player.getPlayerState === "function"
        ? this.player.getPlayerState()
        : this.state.ytState;
    const data = getVideoData(this.player) || {};
    const ytTitle = data.title || "";
    const ytAuthor = data.author || "";
    if (
      currentTime !== this.state.currentTime ||
      duration !== this.state.duration ||
      ytState !== this.state.ytState ||
      ytTitle !== this.state.ytTitle ||
      ytAuthor !== this.state.ytAuthor
    ) {
      this.setState({ currentTime, duration, ytState, ytTitle, ytAuthor });
    }
  };

  loadVideo = () => {
    this.player = new window.YT.Player("m3tube-player", {
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange
      },
      playerVars: {
        origin: window.location.href,
        controls: 0,
        loop: 1,
        modestbranding: 1,
        disablekb: 1
      }
    });
  };

  onPlayerReady = () => {
    this.props.setPlayerObj(this.player);
    setVolume(this.player, this.props.volume);
    if (this.props.playingNow) {
      loadVideoById(this.player, this.props.playingNow);
    }
  };

  onPlayerStateChange = event => {
    this.setState({ ytState: event.data });
    this.props.changePlayerStatus(event.data);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.playingNow !== this.props.playingNow) {
      loadVideoById(this.player, this.props.playingNow);
    }
  }

  getCurrentIndex = () => {
    const { items, playingNow } = this.props;
    if (!items || !playingNow) return -1;
    return items.findIndex(it => it.id.videoId === playingNow);
  };

  playAt = index => {
    const { items } = this.props;
    if (!items || index < 0 || index >= items.length) return;
    this.props.playItem(items[index].id.videoId);
  };

  playPrev = e => {
    e.preventDefault();
    const idx = this.getCurrentIndex();
    if (idx > 0) this.playAt(idx - 1);
  };

  playNext = e => {
    e.preventDefault();
    const idx = this.getCurrentIndex();
    if (idx !== -1 && idx < this.props.items.length - 1) {
      this.playAt(idx + 1);
    }
  };

  togglePlay = e => {
    e.preventDefault();
    const isPlaying = this.state.ytState === 1;
    if (isPlaying) {
      pauseVideo(this.props.player);
      this.setState({ ytState: 2 });
      this.props.changePlayerStatus(2);
    } else {
      playVideo(this.props.player);
      this.setState({ ytState: 1 });
      this.props.changePlayerStatus(1);
    }
  };

  toggleMute = e => {
    e.preventDefault();
    if (this.props.isMuted) {
      unMuteVideo(this.props.player);
      this.props.changePlayerMuteStatus(false);
    } else {
      muteVideo(this.props.player);
      this.props.changePlayerMuteStatus(true);
    }
  };

  changeVolume = e => {
    this.props.changePlayerVolume(e.target.value);
    setVolume(this.props.player, e.target.value);
  };

  handleSeek = e => {
    const pct = Number(e.target.value);
    const seconds = (pct / 100) * (this.state.duration || 0);
    seekTo(this.player, seconds);
    this.setState({ currentTime: seconds });
  };

  toggleBlur = e => {
    e.preventDefault();
    this.setState(s => ({ blurred: !s.blurred }));
  };

  toggleExpand = e => {
    e.preventDefault();
    this.setState(s => ({ expanded: !s.expanded, hidden: false }));
  };

  toggleHidden = e => {
    e.preventDefault();
    this.setState(s => ({ hidden: !s.hidden, expanded: false }));
  };

  render() {
    const { items, playingNow, isMuted, volume } = this.props;
    const active = Boolean(playingNow);
    const {
      expanded,
      blurred,
      hidden,
      currentTime,
      duration,
      ytState,
      ytTitle,
      ytAuthor
    } = this.state;
    const playing = ytState === 1;

    const currentItem =
      (items || []).find(it => it.id.videoId === playingNow) || null;
    const title = currentItem
      ? currentItem.snippet.title
      : ytTitle || (active ? "Loading…" : "Nothing playing");
    const channel = currentItem ? currentItem.snippet.channelTitle : ytAuthor;
    const thumb = currentItem
      ? (
          currentItem.snippet.thumbnails.medium ||
          currentItem.snippet.thumbnails.default
        ).url
      : youtubeThumb(playingNow);

    const idx = this.getCurrentIndex();
    const canPrev = idx > 0;
    const canNext = idx !== -1 && idx < (items || []).length - 1;

    const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

    const iframeWrapClass = expanded
      ? "fixed inset-0 z-50 bg-ink-950/95 backdrop-blur-2xl flex flex-col animate-fade-in"
      : "fixed left-0 top-0 h-[180px] w-[320px] pointer-events-none opacity-0 -z-10";

    const barClass = `fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-ink-950/85 backdrop-blur-2xl transition-transform duration-300 ${
      active && !hidden && !expanded ? "translate-y-0" : "translate-y-full"
    }`;

    return (
      <>
        <div className={iframeWrapClass}>
          {expanded && (
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-grad shadow-glow">
                  <i className="fas fa-play text-xs text-white"></i>
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">
                    Now playing
                  </p>
                  <p className="line-clamp-1 text-sm font-semibold text-white">
                    {title}
                  </p>
                </div>
              </div>
              <button
                onClick={this.toggleExpand}
                className="icon-btn"
                aria-label="Collapse"
              >
                <i className="fas fa-compress"></i>
              </button>
            </div>
          )}
          <div
            className={
              expanded
                ? "mx-auto flex w-full max-w-5xl flex-1 items-center px-4 pb-6 sm:px-6"
                : "h-full w-full"
            }
          >
            <div
              className={`video-container w-full ${
                blurred && expanded ? "opacity-[0.04]" : "opacity-100"
              } transition-opacity duration-300`}
            >
              <div id="m3tube-player"></div>
            </div>
          </div>
        </div>

        <div className={barClass}>
          <div className="relative h-1 w-full bg-white/5">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progressPct}
              onChange={this.handleSeek}
              aria-label="Seek"
              disabled={!active || !duration}
              className="absolute inset-0 h-1 w-full cursor-pointer appearance-none bg-transparent"
              style={{ WebkitAppearance: "none" }}
            />
            <div
              className="pointer-events-none h-full bg-brand-grad transition-[width] duration-200"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-3 py-3 sm:gap-4 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              {thumb ? (
                <img
                  src={thumb}
                  alt=""
                  className="h-12 w-12 rounded-lg object-cover shadow-lg sm:h-14 sm:w-14"
                />
              ) : (
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-white/5 sm:h-14 sm:w-14">
                  <i className="fas fa-music text-white/40"></i>
                </div>
              )}
              <div className="min-w-0">
                <p className="line-clamp-1 text-sm font-semibold text-white">
                  {title}
                </p>
                <p className="line-clamp-1 text-xs text-white/50">{channel}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={this.playPrev}
                className="icon-btn"
                aria-label="Previous"
                disabled={!canPrev}
              >
                <i className="fas fa-step-backward"></i>
              </button>
              <button
                onClick={this.togglePlay}
                className="grid h-11 w-11 place-items-center rounded-full bg-brand-grad text-white shadow-glow transition-transform hover:scale-105 active:scale-95"
                aria-label={playing ? "Pause" : "Play"}
                disabled={!active}
              >
                <i className={`fas ${playing ? "fa-pause" : "fa-play"}`}></i>
              </button>
              <button
                onClick={this.playNext}
                className="icon-btn"
                aria-label="Next"
                disabled={!canNext}
              >
                <i className="fas fa-step-forward"></i>
              </button>
            </div>

            <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 md:flex">
              <span className="tabular-nums text-xs text-white/50">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <button
                onClick={this.toggleMute}
                className="icon-btn"
                aria-label={isMuted ? "Unmute" : "Mute"}
                disabled={!active}
              >
                <i
                  className={`fas ${isMuted ? "fa-volume-mute" : "fa-volume-up"}`}
                ></i>
              </button>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={volume}
                onChange={this.changeVolume}
                aria-label="Volume"
                className="range w-20 lg:w-28"
                disabled={!active}
              />
              <button
                onClick={this.toggleBlur}
                className={`icon-btn ${blurred ? "text-brand-500" : ""}`}
                aria-label={blurred ? "Show video" : "Blur video"}
                title="Blur in expanded view"
              >
                <i className={`fas ${blurred ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
              <button
                onClick={this.toggleExpand}
                className="icon-btn"
                aria-label="Expand"
              >
                <i className="fas fa-expand"></i>
              </button>
              <button
                onClick={this.toggleHidden}
                className="icon-btn"
                aria-label="Minimize bar"
              >
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={this.toggleExpand}
                className="icon-btn"
                aria-label="Expand"
              >
                <i className="fas fa-expand"></i>
              </button>
              <button
                onClick={this.toggleHidden}
                className="icon-btn"
                aria-label="Minimize"
              >
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          </div>
        </div>

        {active && hidden && !expanded && (
          <button
            onClick={this.toggleHidden}
            className="fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-brand-grad text-white shadow-glow"
            aria-label="Show player"
          >
            <i className="fas fa-chevron-up"></i>
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  playingNow: state.playingNow,
  playerStatus: state.playerStatus,
  items: state.items,
  isMuted: state.isMuted,
  volume: state.volume
});

export default connect(mapStateToProps, {
  setPlayerObj,
  changePlayerStatus,
  playItem,
  changePlayerMuteStatus,
  changePlayerVolume
})(Player);
