import React, { Component } from "react";
import Axios from "axios";
import "../Styles/Timeline.css";
import { withRouter } from "react-router-dom";
import { Comments } from "../Components/Comments";

export class Timeline extends Component {
  state = {
    uid: "",
    posts: [],
    postDesc: "",
    image: ""
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getDetails = async () => {
    let data = JSON.parse(localStorage.getItem("userToken"));
    await this.setState({ uid: data.id });
    this.getPosts(this.state.uid);
  };

  getPosts = id => {
    let self = this;
    Axios.post("http://localhost:3030/timeline", {
      uid: id
    }).then(res => {
      self.setState({ posts: res.data });
    });
  };

  componentDidMount() {
    this.getDetails();
  }

  toggleModal = e => {
    let modal = this.modalElement;
    if (modal.style.display === "none") modal.style.display = "block";
    else modal.style.display = "none";
  };

  addPost = e => {
    let self = this;
    Axios.post("http://localhost:3030/timelineadd", {
      uid: this.state.uid,
      text: this.state.postDesc,
      image: this.state.image
    }).then(self.getPosts(this.state.uid));
  };

  editUser = e => {};

  imageUpload = e => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      this.setState({ image: base64 });
    }, console.log(this.state));
  };

  render() {
    return (
      <div>
        <div className="loginSignupFormHeader">
          <h1>Timeline</h1>
          <button onClick={e => this.toggleModal(e)}>Add Post</button>
          <button onClick={e => this.editUser(e)}>Edit User</button>
          <button
            onClick={() => {
              localStorage.removeItem("userToken");
              this.props.history.push("/login");
            }}
          >
            Logout
          </button>
        </div>

        {/* Modal */}
        <div
          ref={modal => (this.modalElement = modal)}
          className="modal"
          id="postModal"
          style={{ display: "none" }}
        >
          <div className="popup">
            <h2>New Post</h2>
            <button
              id="closeButton"
              onClick={e => this.toggleModal(e)}
              className="close"
            >
              &times;
            </button>
            <div className="content">
              <input
                type="text"
                placeholder="Post description"
                className="inputs"
                name="postDesc"
                value={this.state.postDesc}
                onChange={e => this.change(e)}
              ></input>
              <br />
              <br />
              <label style={{ color: "black" }}>
                Upload Image ---> &nbsp;&nbsp;
              </label>
              <input
                style={{ width: "60%" }}
                type="file"
                name="image"
                onChange={e => this.imageUpload(e)}
              ></input>
              <br />
              <br />
              <button onClick={e => this.addPost(e)} id="modalPostButton">
                Post
              </button>
            </div>
          </div>
        </div>

        <div className="timelinePosts">
          {this.state.posts.map((postz, index) => (
            <div style={{ color: "white" }} key={index}>
              <img
                src={postz.image}
                alt="noImage"
                style={{ width: "20%" }}
              ></img>
              <h4>{postz.user}</h4>
              <p>{postz.text}</p>
              <Comments
                posts={this.state.posts}
                index={index + 1}
                uid={this.state.uid}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

export default withRouter(Timeline);
