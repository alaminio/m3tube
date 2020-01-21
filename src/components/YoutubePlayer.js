import React, { Component } from "react";

class YoutubePlayer extends Component {
  componentDidMount = () => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "//www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      this.loadVideo();
    }
  };

  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    if (prevProps.volume !== this.props.volume) {
      return "changeVolumn";
    }
    if (prevProps.id !== this.props.id) {
      return "changePlayer";
    }
    return null;
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (snapshot === "changeVolumn") {
      this.changeVolumn();
    }
    if (snapshot === "changePlayer") {
      this.player.loadVideoById(this.props.id);
    }

    if (this.player && this.props.status === "pause") {
      this.player.pauseVideo();
    }

    if (this.player && this.props.status === "play") {
      this.player.playVideo();
    }

    if (this.player && this.props.status === "stop") {
      this.player.destroy();
    }
    if (this.player && this.props.mute === "unmute") {
      this.player.unMute();
    }
    if (this.player && this.props.mute === "mute") {
      this.player.mute();
    }
  };

  loadVideo = () => {
    const { id } = this.props;

    this.player = new window.YT.Player("m3tube-player", {
      videoId: id,
      events: {
        onReady: this.onPlayerReady
      },
      playerVars: { origin: window.location.href }
    });
  };

  changeVolumn = () => {
    this.player && this.player.setVolume(parseInt(this.props.volume));
  };

  onPlayerReady = event => {
    event.target.playVideo();
    this.changeVolumn();
  };

  render = () => {
    return (
      <div className="">
        <div id="m3tube-player" />
      </div>
    );
  };
}

export default YoutubePlayer;
