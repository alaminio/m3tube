import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Player from "./components/Player";
import Songs from "./components/Songs";
import Danger from "./components/notifications/Danger";

class App extends Component {
  render() {
    const notification = this.props.showError ? (
      <Danger message={this.props.showError} />
    ) : (
      ""
    );
    return (
      <div className="App" id="App">
        <section className="section">
          <div className="container">
            <Header />
            {notification}
            <Player />
            <Songs />
            <Footer />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showError: state.showError
  };
};
export default connect(mapStateToProps)(App);
