import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import SinglePage from "./pages/singlepage/singlepage.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Player from "./components/player/player.component";
import Alerts from "./components/alerts/alerts.component";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-40 pt-6 sm:px-6 lg:px-8">
          <Alerts />
          <Switch>
            <Route path="/:videoId" component={SinglePage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
        <Player />
        <Footer />
      </div>
    </Router>
  );
}
