"use strict";
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define(
    "posts",
    {
      text: DataTypes.STRING,
      image: DataTypes.TEXT,
      publicPost: DataTypes.BOOLEAN
    },
    {}
  );
  posts.associate = function(models) {
    // associations can be defined here
    posts.belongsTo(models.Users);
    posts.hasMany(models.Comments);
    posts.hasMany(models.Likes);
  };
  return posts;
};
