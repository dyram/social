const model = require("../models");
const Post = model.posts;
const User = model.Users;

Posts = () => {};

Posts.addPosts = async (id, text, image) => {
  let promise = Post.create({
    text: text,
    image: image,
    publicPost: true,
    UserId: id
  });
  return promise;
};

Posts.getPosts = async () => {
  let promise = await Post.findAll({
    where: {
      publicPost: true
    },
    include: [
      {
        model: User,
        attributes: ["name"]
      }
    ]
  });
  return promise;
};

Posts.addPostsPrivate = async (uid, text, image) => {
  let promise = await Post.create({
    text: text,
    image: image,
    publicPost: false,
    UserId: uid
  });
};

Posts.getPostsPrivate = async () => {
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
