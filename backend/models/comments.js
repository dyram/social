"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      text: DataTypes.TEXT
    },
    {}
  );
  Comments.associate = function(models) {
    // associations can be defined here
    Comments.belongsTo(models.posts);
    Comments.belongsTo(models.Users);
  };
  return Comments;
};
