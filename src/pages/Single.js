import React, { Component } from "react";
import { connect } from "react-redux";
import { playItem, changePlayerStatus } from "../actions/player";

class Single extends Component {
  componentDidMount() {
    this.props.playItem(this.props.match.params.videoId);
    this.props.changePlayerStatus(1);
  }
  render() {
    return (
      <div className="Single">
        <div>Playing: {this.props.match.params.videoId}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    playerStatus: state.playerStatus,
    volume: state.volume
  };
};

export default connect(mapStateToProps, { playItem, changePlayerStatus })(
  Single
);
