import React, { Component } from "react";
import "../Styles/Comments.css";
import { withRouter } from "react-router-dom";
import Axios from "axios";

export class Comments extends Component {
  state = {
    uid: this.props.uid,
    comments: [],
    comment: "",
    posts: [],
    user: ""
  };

  toggleComment = e => {
    let commentBox = this.commentElement;
    if (commentBox.style.display === "none") commentBox.style.display = "block";
    else commentBox.style.display = "none";
  };

  addComment = e => {
    let self = this;
    Axios.post("http://localhost:3030/commentadd", {
      pid: this.props.index,
      uid: this.props.uid,
      text: this.state.comment
    }).then(self.getComments());
  };

  componentDidMount() {
    this.setState({ posts: this.props.posts });
    this.getDetails();
    this.getUser();
  }

  getDetails = async () => {
    this.getComments();
  };

  getComments = () => {
    let self = this;
    Axios.post("http://localhost:3030/comments").then(res => {
      self.setState({ comments: res.data });
    });
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  delCom = (cuid, cpid, ctext) => {
    let self = this;
    Axios.post("http://localhost:3030/deletecomment", {
      pid: cpid,
      uid: cuid,
      text: ctext
    }).then(res => {
      self.setState({ comments: res.data });
    });
  };

  getUser = () => {
    let self = this;
    Axios.post("http://localhost:3030/getuser", {
      id: this.state.uid
    }).then(res => {
      self.setState({ user: res.data[0].name });
      console.log(self.state);
    });
  };

  render() {
    return (
      <div>
        <button className="commentButton" onClick={e => this.toggleComment(e)}>
          Comment
        </button>
        <br />
        <br />
        <div
          className="commentBox"
          ref={comment => (this.commentElement = comment)}
          style={{ display: "none" }}
        >
          <input
            type="text"
            placeholder="Type your comment here....."
            value={this.state.comment}
            onChange={e => {
              this.change(e);
            }}
            name="comment"
          ></input>
          <br />
          <button
            style={{ borderRadius: "0px", width: "17%" }}
            onClick={e => {
              this.addComment(e);
            }}
          >
            Add Comment
          </button>
        </div>
        <br />
        <br />
        <div className="commentsList">
          {this.state.comments.map((comms, index) => (
            <div style={{ color: "white" }} key={index}>
              {this.props.index === comms.pid ? (
                <div className="commentContainer">
                  <pre>{comms.user}</pre>
                  <p>{comms.text}</p>
                  <button
                    id="delButton"
                    style={{
                      marginLeft: "auto",
                      fontSize: "20px",
                      background: "none",
                      display: comms.user === this.state.user ? "block" : "none"
                    }}
                    onClick={e => {
                      this.delCom(comms.uid, comms.pid, comms.text);
                    }}
                  >
                    <svg viewBox="0 0 25 25" width="30">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
                  <br />
                </div>
              ) : (
                <pre></pre>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Comments);
