import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage.component";
import SinglePage from "./pages/singlepage.component";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Player from "./components/Player";
import Notification from "./components/alerts/Notification";

function App() {
  return (
    <section className="section">
      <div className="container">
        <Router>
          <Header />
          <Player />
          <div className="page">
            <Notification />
            <Switch>
              <Route path="/:videoId" component={SinglePage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    </section>
  );
}

export default App;
