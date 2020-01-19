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
    if (prevProps.id !== this.props.id) {
      return "changePlayer";
    }
    return null;
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
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

    this.player = new window.YT.Player(`youtube-player-${id}`, {
      videoId: id,
      events: {
        onReady: this.onPlayerReady
      }
    });
  };

  onPlayerReady = event => {
    event.target.playVideo();
  };

  render = () => {
    const { id } = this.props;
    return (
      <div className="">
        <div id={`youtube-player-${id}`} />
      </div>
    );
  };
}

export default YoutubePlayer;
