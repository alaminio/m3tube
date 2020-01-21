import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BASENAME } from "./config/constants";
import HomePage from "./components/page/HomePage";
import ViewPage from "./components/page/ViewPage";

class App extends Component {
  render() {
    return (
      <div className="App" id="App">
        <section className="section">
          <Router basename={BASENAME}>
            <Switch>
              <Route path="/:videoID" component={ViewPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </Router>
        </section>
      </div>
    );
  }
}

export default App;
