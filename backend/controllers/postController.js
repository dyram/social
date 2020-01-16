const model = require("../models");
const Post = model.posts;
const User = model.Users;

Posts = () => {};

Posts.addPosts = async (id, text, image) => {
  let name;
  User.findAll({
    attributes: ["name"],
    where: { id: id }
  }).then(prom => {
    name = prom[0].name;
    console.log(name);
    let promise = Post.create({ user: name, text: text, image: image });
    return promise;
  });
};

Posts.getPosts = async () => {
  let promise = await Post.findAll();
  return promise;
};

module.exports = Posts;
