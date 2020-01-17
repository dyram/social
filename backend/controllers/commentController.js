const model = require("../models");
const User = model.Users;
const Comment = model.Comments;

Comments = () => {};

Comments.addComments = (pid, uid, text) => {
  let name;
  User.findAll({
    attributes: ["name"],
    where: { id: uid }
  }).then(res => {
    name = res[0].name;
    console.log("Comments : ", pid, uid, text);
    let promise = Comment.create({
      pid: pid,
      uid: uid,
      user: name,
      text: text
    });
    return promise;
  });
};

Comments.deleteComments = (pid, uid, text) => {
  Comment.destroy({
    where: { pid: pid, uid: uid, text: text }
  });
};

Comments.getComments = async () => {
  let promise = await Comment.findAll();
  return promise;
};

module.exports = Comments;
