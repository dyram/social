const model = require("../models");
const User = model.Users;
const Comment = model.Comments;

Comments = () => {};

Comments.addComments = (pid, uid, text) => {
  let promise = Comment.create({
    text: text,
    postId: pid,
    UserId: uid
  });
  return promise;
};

Comments.deleteComments = (pid, uid, text) => {
  Comment.destroy({
    where: { postId: pid, UserId: uid, text: text }
  });
};

Comments.getComments = async () => {
  let promise = await Comment.findAll({
    include: [
      {
        model: User,
        attributes: ["name"]
      },
      {
        model: model.posts,
        attributes: ["id"]
      }
    ]
  });
  return promise;
};

module.exports = Comments;
