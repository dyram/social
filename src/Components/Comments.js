import React, { Component } from "react";
import "../Styles/Comments.css";
import { withRouter } from "react-router-dom";
import Axios from "axios";

export class Comments extends Component {
  state = {
    comments: [],
    posts: []
  };

  toggleComment = e => {
    let commentBox = this.commentElement;
    if (commentBox.style.display === "none") commentBox.style.display = "block";
    else commentBox.style.display = "none";
  };

  addComment = e => {
    Axios.post("http://localhost:3000/commentAdd");
  };

  componentDidMount() {
    this.setState({ posts: this.props.posts }, console.log(this.state));
  }

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
      </div>
    );
  }
}

export default withRouter(Comments);
