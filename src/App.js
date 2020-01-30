import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Player from "./components/Player";
import Notification from "./components/alerts/Notification";

function App() {
  return (
    <section className="section">
      <div className="container">
        <Header />
        <Player />
        <div className="page">
          <Notification />
          <Home />
        </div>
        <Footer />
      </div>
    </section>
  );
}

export default App;
