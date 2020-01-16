import React, { Component } from "react";
import "../Styles/LoginSignupStyle.css";
import Logo from "../Components/Logo";
import Axios from "axios";
import { withRouter } from "react-router-dom";

export class Signup extends Component {
  state = {
    username: "",
    password: ""
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signUp = e => {
    Axios.post("http://localhost:3030/signup", {
      name: this.state.username,
      pass: this.state.password
    }).then(res => {
      console.log(res);
    });
    this.setState({ username: "", password: "" });
  };
  render() {
    return (
      <div className="loginSignupForm">
        <div className="loginSignupFormHeader">
          <h1>Welcome</h1>
          <button onClick={e => this.props.history.push("/login")}>
            Login
          </button>
        </div>
        <div className="logoDiv">
          <Logo />
        </div>
        <div className="formFlex">
          <label>Username</label>&nbsp;&nbsp;
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={e => this.change(e)}
          ></input>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>Password</label>&nbsp;&nbsp;
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={e => this.change(e)}
          ></input>
          <br />
          <br />
          <button
            onClick={e => {
              this.signUp(e);
            }}
          >
            Sign - Up
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
