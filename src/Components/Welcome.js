import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div>
          <h1>So</h1>
          <span>cial</span>
        </div>
        <div className="buttonDiv">
          <button onClick={() => this.props.history.push("/signup")}>
            Signup
          </button>
          <button onClick={() => this.props.history.push("/login")}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Welcome);
