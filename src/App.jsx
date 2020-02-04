import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import SinglePage from "./pages/singlepage/singlepage.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Player from "./components/player/player.component";
import Alerts from "./components/alerts/alerts.component";

function App() {
  return (
    <section className="section">
      <div className="container">
        <Router>
          <Header />
          <Player />
          <div className="page">
            <Alerts />
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
