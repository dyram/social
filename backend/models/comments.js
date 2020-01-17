"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      pid: DataTypes.INTEGER,
      uid: DataTypes.INTEGER,
      user: DataTypes.STRING,
      text: DataTypes.TEXT
    },
    {}
  );
  Comments.associate = function(models) {
    // associations can be defined here
  };
  return Comments;
};
