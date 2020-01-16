import React, { Component } from "react";
import "../Styles/LoginSignupStyle.css";
import { withRouter } from "react-router-dom";
import Logo from "../Components/Logo";
import Axios from "axios";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  login = e => {
    Axios.post("http://localhost:3030/login", {
      name: this.state.username,
      pass: this.state.password
    }).then(res => {
      console.log(res);
      if (res.data.validity) {
        localStorage.setItem("userToken", JSON.stringify(res.data));
        this.props.history.push("/timeline");
      } else {
        alert("Invalid Login Credentials");
      }
    });
  };
  render() {
    return (
      <div className="loginSignupForm">
        <div className="loginSignupFormHeader">
          <h1>Welcome</h1>
          <button onClick={e => this.props.history.push("/signup")}>
            Signup
          </button>
        </div>
        <div className="logoDiv">
          <Logo />
        </div>
        <div className="formFlex">
          <label>Username</label>&nbsp;&nbsp;
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.change(e)}
          ></input>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>Password</label>&nbsp;&nbsp;
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.change(e)}
          ></input>
          <br />
          <br />
          <button onClick={e => this.login(e)}>Login</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
