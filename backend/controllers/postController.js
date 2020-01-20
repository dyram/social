const model = require("../models");
const Post = model.posts;
const User = model.Users;

Posts = () => {};

Posts.addPosts = async (id, text, image) => {
  let promise = Post.create({ text: text, image: image, UserId: id });
  return promise;
};

Posts.getPosts = async () => {
  let promise = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ["name"]
      }
    ]
  });
  return promise;
};

module.exports = Posts;
