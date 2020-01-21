import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import Player from "../Player";
import Songs from "../Songs";
import Danger from "../notifications/Danger";

class HomePage extends Component {
  render() {
    const notification = this.props.showError ? (
      <Danger message={this.props.showError} />
    ) : (
      ""
    );

    const player = this.props.play ? <Player /> : "";

    return (
      <div className="container">
        <Header />
        {notification}
        {player}
        <Songs />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showError: state.showError,
    play: state.play
  };
};
export default connect(mapStateToProps)(HomePage);
