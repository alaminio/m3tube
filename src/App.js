import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Player from "./components/Player";
import Songs from "./components/Songs";

export default class App extends Component {
  render() {
    return (
      <div className="App" id="App">
        <section className="section">
          <div className="container">
            <Header />
            <Player />
            <Songs />
            <Footer />
          </div>
        </section>
      </div>
    );
  }
}
