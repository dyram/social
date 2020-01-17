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
    user: "",
    likes: 0
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
    this.likeButtonText();
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

  likeClicked = e => {
    console.log("like clicked");
    this.likeButtonText();
  };

  likeButtonText = () => {
    if (this.state.likes === 0) return "Like";
    else return "Unlike";
  };

  render() {
    return (
      <div>
        <div className="likesCounter">
          <svg viewBox="0 0 22 22" width="17">
            <path
              fill="currentColor"
              d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
            />
          </svg>
          &nbsp;&nbsp;
          {this.state.likes}
        </div>

        <br />

        <div className="comLikeButton">
          <button
            className="commentButton"
            onClick={e => this.toggleComment(e)}
          >
            Comment
          </button>
          &nbsp;&nbsp;&nbsp;
          <button id="likeButton" onClick={e => this.likeClicked(e)}>
            {this.likeButtonText()}
          </button>
        </div>

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
          <div className="commentsListHeader">
            <p>Comments</p>
            <hr style={{ width: "95%", color: "darkgray" }} />
          </div>
          {this.state.comments.map((comms, index) => (
            <div style={{ color: "white" }} key={index}>
              {this.props.index === comms.pid ? (
                <div className="commentContainer">
                  <div>
                    <pre>{comms.user}</pre>
                    <p>{comms.text}</p>
                  </div>
                  <div className="commentBs">
                    <button id="comLikeButton">
                      <svg viewBox="0 0 25 25" width="30" id="comLikeSvg">
                        <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                      </svg>
                    </button>
                    <button
                      id="delButton"
                      style={{
                        marginLeft: "auto",
                        fontSize: "20px",
                        background: "none",
                        display:
                          comms.user === this.state.user ? "block" : "none"
                      }}
                      onClick={e => {
                        this.delCom(comms.uid, comms.pid, comms.text);
                      }}
                    >
                      <svg viewBox="0 0 25 25" width="30">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </button>
                  </div>
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
