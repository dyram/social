const model = require("../models");
const User = model.Users;
const Like = model.Likes;

Likes = () => {};

Likes.addLikes = (pid, uid) => {
  let promise = Like.create({ isLiked: true, UserId: uid, postId: pid });
  console.log(promise);
  return promise;
};

Likes.getLikes = async () => {
  let promise = await Like.findAll({
    attributes: ["UserId", "postId", "isLiked"]
  });
  return promise;
};

Likes.deleteLikes = (pid, uid) => {
  let promise = Like.destroy({
    where: { postId: pid, UserId: uid }
  });
};

Likes.countLikes = async pid => {
  let promise = await Like.count({
    where: { postId: pid }
  });
  return { count: promise };
};

module.exports = Likes;
