import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

import Welcome from "./Components/Welcome";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Timeline from "./Components/Timeline";
import Private from "./Components/Private";

class App extends React.Component {
  fn() {
    Axios.get("http://localhost:3030").then(res => {
      console.log(res);
    });
  }

  componentDidMount() {
    this.fn();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={() => <Welcome />} />
            <Route path="/signup" component={() => <Signup />} />
            <Route path="/login" component={() => <Login />} />
            <Route
              crossorigin
              path="/timeline"
              component={() => <Timeline />}
            />
            <Route crossorigin path="/private" component={() => <Private />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
