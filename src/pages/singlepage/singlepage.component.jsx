import React, { Component } from "react";
import { connect } from "react-redux";
import { playItem, changePlayerStatus } from "../../actions/player";

class SinglePage extends Component {
  componentDidMount() {
    this.props.playItem(this.props.match.params.videoId);
  }
  render() {
    return (
      <div className="SinglePage">
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
  SinglePage
);
