"use strict";
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      isLiked: DataTypes.BOOLEAN
    },
    {}
  );
  Likes.associate = function(models) {
    // associations can be defined here
    Likes.belongsTo(models.Users);
    Likes.belongsTo(models.posts);
  };
  return Likes;
};
